const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
   companyName: { type: String, required: true },
   activationDate: { type: Date, required: true },
   validityDate: { type: Date, required: true },
   agentName: { type: String },
   agentContactNo: { type: String, required: true },
   isPremiumCoverage: { type: Boolean, required: true },
   document: {type: String, default: null},
   petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }
 }, { timestamps: true });
 
 module.exports = mongoose.model('Insurance', InsuranceSchema);