const Vaccination = require('../../models/Vaccination');
const mongoose = require('mongoose');

class VaccinationService {
  async createVaccination(data) {
    return await Vaccination.create(data);
  }

  async getAllVaccinations() {
    return await Vaccination.find();
  }

  async getVaccinationById(id) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Vaccination.findById(id);
  }

  async updateVaccination(id, data) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Vaccination.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteVaccination(id) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Vaccination.findByIdAndDelete(id);
  }
}

module.exports = new VaccinationService(); 