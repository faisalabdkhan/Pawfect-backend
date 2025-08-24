const multer = require('multer');
const path = require('path');

// __dirname is available by default in CJS, no need to handle it
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads/pet-photos')); // Adjust path if needed
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `pet-${uniqueSuffix}${ext}`);
  },
});

// Export the upload middleware
const upload = multer({ storage });

module.exports = upload;
