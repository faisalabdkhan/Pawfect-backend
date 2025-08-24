const mongoose = require('mongoose');

const VaccinationSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  vaccineDate: { type: Date, required: true },
  isFirstVaccine: { type: Boolean, required: true },
  contactNo: { type: String, required: true },
  location: { type: String },
  doctorName: { type: String },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vaccination', VaccinationSchema);