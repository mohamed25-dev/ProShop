require('express-async-errors');

const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const productController = require('../controllers/product');

router
  .route('/')
  .get(isAuthenticated, isAdmin, productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProductById)
  .delete(isAuthenticated, isAdmin, productController.deleteProduct);

module.exports = router;
