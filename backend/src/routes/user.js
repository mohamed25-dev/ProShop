require('express-async-errors');

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.post('/login', userController.loginUser);

module.exports = router;
