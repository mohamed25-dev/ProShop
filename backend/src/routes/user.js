require('express-async-errors');
const { isAuthenticated } = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/profile')
  .get(isAuthenticated, userController.getUserProfile)
  .post(isAuthenticated, userController.updateUserProfile);

router.route('/login').post(userController.loginUser);
router.route('/:id').get(userController.getUserById);

module.exports = router;
