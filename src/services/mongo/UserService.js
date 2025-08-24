const User = require('../../models/User');
const mongoose = require('mongoose');

class UserService {
  async createUser(data) {
    return await User.create(data);
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await User.findById(id);
  }

  async getOneUser(data) {
    return await User.findOne(data);
  }

  async updateUser(id, data) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id) {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserService();