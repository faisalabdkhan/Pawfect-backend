const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true }, // e.g., Dog, Cat, Bird, Fish
  breed: { type: String },
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  height: { type: String },
  weight: { type: String },
  photoUrl: { type: String },
  photo: {type: String, default: null},
  birthdayOrAdoption: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);