const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

// OTP-based login flow
router.post('/send-otp', (req, res) => UserController.sendOtp(req, res));
router.post('/verify-otp-and-login', (req, res) => UserController.verifyOtpAndLogin(req, res));

// Legacy login (without OTP)
router.post('/login', (req, res) => UserController.loginWithMobile(req, res));

module.exports = router;







