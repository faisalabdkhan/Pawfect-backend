const path = require("path");
const fs = require("fs");
const Pet = require("../models/Pet");
const UserService = require("../services/mongo/UserService");

class PetController {
  // Add pet for a user
  async addPet(req, res) {
    try {
      console.log("user", req.user);
      const { mobileNumber, category, breed, name, gender, height, weight, birthdayOrAdoption } = req.body;
      const uploadedFile = req.file;

      // Validate required fields
      const requiredFields = [
        "mobileNumber",
        "category",
        // "breed",
        "name",
        "gender",
        "birthdayOrAdoption",
        // "weight",
        // "height",
      ];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        // Clean up uploaded file if validation fails
        if (uploadedFile) this._removeFile(uploadedFile.path);
        return res.status(400).json({
          message: "Missing required fields",
          missingFields,
        });
      }

      // Find user
      const user = await UserService.getOneUser({ mobileNumber });
      if (!user) {
        if (uploadedFile) this._removeFile(uploadedFile.path);
        return res.status(404).json({ message: "User not found" });
      }

      // Prepare pet data
      const newPetPayload = {
        user: user._id,
        category,
        breed,
        name,
        gender,
        height,
        weight,
        birthdayOrAdoption,
      };

      // Handle file upload
      if (uploadedFile) {
        newPetPayload.photo = `/public/uploads/pet-photos/${uploadedFile.filename}`;
      }

      // Create pet
      const pet = await Pet.create(newPetPayload);

      // Update user's hasPets status
      if (!user.hasPets) {
        await UserService.updateUser(user._id, { hasPets: true });
      }

      // Prepare response
      const responseData = {
        ...pet.toObject(),
        photoUrl: pet.photo
          ? `${req.protocol}://${req.get("host")}${pet.photo}`
          : null,
      };

      res.status(201).json({
        success: true,
        message: "Pet added successfully",
        data: responseData,
      });
    } catch (error) {
      // Clean up on error
      if (req.file) this._removeFile(req.file.path);

      console.error("Error adding pet:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add pet",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }

  // Update pet (with optional photo)
  async update(req, res) {
    try {
      const { id } = req.params;
      const uploadedFile = req.file;
      const updateData = { ...req.body };

      // Validate pet exists
      const existingPet = await Pet.findById(id);
      if (!existingPet) {
        if (uploadedFile) this._removeFile(uploadedFile.path);
        return res.status(404).json({ message: "Pet not found" });
      }

      // Handle file upload
      if (uploadedFile) {
        // Remove old photo if exists
        if (existingPet.photo) {
          this._removeFile(path.join(__dirname, "../../", existingPet.photo));
        }
        updateData.photo = `/uploads/pet-photos/${uploadedFile.filename}`;
      }

      // Update pet
      const updatedPet = await Pet.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        message: "Pet updated successfully",
        data: updatedPet,
      });
    } catch (error) {
      // Clean up on error
      if (req.file) this._removeFile(req.file.path);

      console.error("Error updating pet:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update pet",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }

  // Helper method to safely remove files
  _removeFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error("Error removing file:", err);
    }
  }
}

module.exports = new PetController();
