const Grooming = require('../../models/Grooming');
const mongoose = require('mongoose');

class GroomingService {
  async createGrooming(data) {
    return await Grooming.create(data);
  }

  async getAllGroomings() {
    return await Grooming.find();
  }

  async getGroomingById(id) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Grooming.findById(id);
  }

  async updateGrooming(id, data) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Grooming.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteGrooming(id) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Grooming.findByIdAndDelete(id);
  }
}

module.exports = new GroomingService();
