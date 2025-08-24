const Insurance = require('../../models/Insurance');
const mongoose = require('mongoose');

class InsuranceService {
  async createInsurance(data) {
    console.log("data", data);
    return await Insurance.create(data);
  }

  async getAllInsurances() {
    return await Insurance.find();
  }

  async getInsuranceById(id) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Insurance.findById(id);
  }

  async updateInsurance(id, data) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Insurance.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteInsurance(id) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Insurance.findByIdAndDelete(id);
  }
}

module.exports = new InsuranceService();