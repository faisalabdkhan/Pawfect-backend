const express = require('express');
const router = express.Router();
const vaccinationController = require('../controller/vaccinationController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, vaccinationController.create);
router.get('/', vaccinationController.getAll);
router.get('/:id', vaccinationController.getOne);
router.put('/:id', vaccinationController.update);
router.delete('/:id', vaccinationController.delete);

module.exports = router;