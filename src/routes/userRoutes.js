const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const auth = require('../utils/auth');

// GET
router.get('/', controller.index);

// POST
router.post('/', controller.store);
router.post('/login', controller.authentication);

// PUT
router.put('/:id', controller.update);

//DELETE
router.delete('/:id', auth.authorize, controller.delete);

module.exports = router;