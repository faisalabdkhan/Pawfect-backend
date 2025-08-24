const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  mobileNumber: { type: String, unique: true, required: true },
  token: String,
  hasPets: { type: Boolean, default: false },  // Default to false
  isVerified: { type: Boolean, default: false },
  verificationId: String,
  verificationExpiry: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
