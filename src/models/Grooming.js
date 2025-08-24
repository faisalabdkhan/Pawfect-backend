const mongoose = require('mongoose');

const GroomingSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  groomingDate: { type: Date, required: true },
  groomerName: { type: String },
  contactNo: { type: String, required: true },
  isFirstGrooming: { type: Boolean, required: true },
  location: { type: String },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Grooming', GroomingSchema);
