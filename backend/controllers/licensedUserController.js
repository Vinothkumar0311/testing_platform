const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { LicensedUser, License } = require('../models');
const nodemailer = require('nodemailer');

const uploadLicensedUsers = async (req, res) => {
  const { planTitle, startDate, endDate } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: "CSV file missing" });

  try {
    // 1. Create license
    const license = await License.create({
      id: uuidv4(),
      plan_title: planTitle,
      start_date: startDate,
      end_date: endDate
    });

    const users = [];

    // 2. Read CSV
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', async (row) => {
        const { name, email, mobile } = row;

        if (!name || !email || !mobile) return;

        const emailPrefix = email.split('@')[0];
        const passwordPlain = emailPrefix + mobile.slice(-4);
        // const hashedPassword = await bcrypt.hash(passwordPlain, 10);

        users.push({
          id: uuidv4(),
          name,
          email,
          mobile,
          password: passwordPlain,
          activated: false,
          license_id: license.id
        });
      })
      .on('end', async () => {
        const createdUsers = await LicensedUser.bulkCreate(users);

        // 3. Send Activation Email
        for (const user of createdUsers) {
          await sendActivationEmail(user);
        }

        fs.unlinkSync(file.path); // clean temp file
        res.status(200).json({
          message: `Successfully created ${createdUsers.length} users under license "${planTitle}".`,
          licenseId: license.id
        });
      });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// 📧 Email activation
const sendActivationEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS
    }
  });

  const activationLink = `http://localhost:3000/activate/${user.email}`;

  await transporter.sendMail({
    from: `"License Portal" <${process.env.EMAIL_ID}>`,
    to: user.email,
    subject: 'Activate Your Account',
    html: `
      <p>Hello <strong>${user.name}</strong>,</p>
      <p>Click the link below to activate your account:</p>
      <a href="${activationLink}">Activate Account</a>
    `
  });
};

module.exports = { uploadLicensedUsers };
