const express = require('express');
const router = express.Router();
const groomingController = require('../controller/groomingController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, groomingController.create);
router.get('/', groomingController.getAll);
router.get('/:id', groomingController.getOne);
router.put('/:id', groomingController.update);
router.delete('/:id', groomingController.delete);

module.exports = router;
