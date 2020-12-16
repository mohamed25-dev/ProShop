require('express-async-errors');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router
  .route('/')
  .get(isAuthenticated, isAdmin, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/profile')
  .get(isAuthenticated, userController.getUserProfile)
  .patch(isAuthenticated, userController.updateUserProfile);

router.route('/login').post(userController.loginUser);

router
  .route('/:id')
  .get(isAuthenticated, isAdmin, userController.getUserById)
  .delete(isAuthenticated, isAdmin, userController.deleteUser);

module.exports = router;
