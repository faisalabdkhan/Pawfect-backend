const UserService = require('../services/mongo/UserService');
const smsController = require('./smsController');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '';

class UserController{
  // Send OTP for login
  async sendOtp(req, res) {
    try {
      const { mobileNumber } = req.body;
      if (!mobileNumber) {
        return res.status(400).json({ error: 'Mobile number is required' });
      }

      // Send OTP using SMS service
      await smsController.sendOtp(req, res);
    } catch (error) {
      console.error('SendOTP Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Verify OTP and login/create user
  async verifyOtpAndLogin(req, res) {
    try {
      const { mobileNumber, code } = req.body;
      
      if (!mobileNumber || !code) {
        return res.status(400).json({ error: 'Mobile number and OTP code are required' });
      }

      console.log('Attempting to verify OTP for:', mobileNumber);

      // Verify OTP using SMS service
      const verificationResult = await smsController.verifyOtp(mobileNumber, code);
      console.log('Verification successful');
      
      let user = await UserService.getOneUser({ mobileNumber });
      let isNewUser = false;

      if (!user) {
        // This shouldn't happen if sendOtp works correctly, but let's handle it
        console.log('User not found during login, creating new user');
        user = await UserService.createUser({ 
          mobileNumber,
          isVerified: true 
        });
        isNewUser = true;
      }

      const token = jwt.sign({ mobileNumber, userId: user._id }, JWT_SECRET, { expiresIn: '30d' });

      const updatedUser = await UserService.updateUser(user._id, { token }); 

      res.status(200).json({
        "success": true,
        message: 'Login successful',
        user: {
          _id: updatedUser._id,
          mobileNumber: updatedUser.mobileNumber,
          hasPets: updatedUser.hasPets || false,
          isVerified: updatedUser.isVerified
        },
        isNewUser,
        token,
      });
    } catch (error) {
      console.error('VerifyOtpAndLogin Error:', error);
      res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new UserController();