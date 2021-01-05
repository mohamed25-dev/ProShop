require('express-async-errors');

const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const categoryController = require('../controllers/category');

router
  .route('/')
  .get(isAuthenticated, isAdmin, categoryController.getAllCategories);

module.exports = router;
