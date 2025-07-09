const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../routes/config');

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, error: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Check if user still exists
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ success: false, error: 'Token is not valid' });
  }
};