const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/google', authController.googleLogin);

// Protected routes
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;