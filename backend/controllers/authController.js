const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const config = require("../routes/config");

const client = new OAuth2Client(config.google.clientId);

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

// exports.googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.status(400).json({ success: false, error: 'Token is required' });
//     }

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: config.google.clientId,
//     });

//     const payload = ticket.getPayload();
//     const { sub: googleId, email, name, picture } = payload;

//     // Find or create user
//     let user = await User.findOne({ where: { googleId } });

//     if (!user) {
//       user = await User.create({
//         googleId,
//         email,
//         name,
//         profilePicture: picture,
//       });
//     }

//     const jwtToken = generateToken(user);

//     res.json({
//       success: true,
//       token: jwtToken,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         profilePicture: user.profilePicture,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error('Google login error:', error);
//     res.status(500).json({ success: false, error: 'Authentication failed' });
//   }
// };
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, error: "Token is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ where: { googleId } });

    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        profilePicture: picture,
        // Don't include createdAt/updatedAt - let Sequelize handle them
      });
    }

    const jwtToken = generateToken(user);

    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Authentication failed",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "profilePicture", "role"],
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
