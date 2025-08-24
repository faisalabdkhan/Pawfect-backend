const express = require("express");
const router = express.Router();
const insuranceController = require('../controller/insuranceController')
const auth = require('../middlewares/authMiddleware');



const path = require('path');
const fs = require('fs');
const multer = require('multer');
const PetController = require('../controller/petController');
const upload = require('../multerConfig/multerConfig')


// Ensure upload folder exists
const uploadPath = path.join(__dirname, '..', 'uploads', 'pet-photos');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage config for saving to disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  }
});

router.post('/', auth, upload.single('document'), insuranceController.create);
router.get('/', insuranceController.getAll);
router.get('/:id', insuranceController.getOne);
router.put('/:id', insuranceController.update);
router.delete('/:id', insuranceController.delete);

module.exports = router;