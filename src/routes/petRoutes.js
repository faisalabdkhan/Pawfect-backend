const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const PetController = require('../controller/petController');
const upload = require('../multerConfig/multerConfig')
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

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

router.post('/', auth, upload.single('photo'), (req, res) => PetController.addPet(req, res));
router.get('/', (req, res) => PetController.getAll(req, res));
router.get('/:id', (req, res) => PetController.getOne(req, res));
router.put('/:id', upload.single('photo'), (req, res) => PetController.update(req, res));
router.delete('/:id', (req, res) => PetController.delete(req, res));

module.exports = router;
