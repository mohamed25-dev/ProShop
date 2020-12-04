require('express-async-errors');
const { isAuthenticated } = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getAllUsers);

router.get('/profile', isAuthenticated, userController.getUserProfile);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.post('/login', userController.loginUser);

module.exports = router;
