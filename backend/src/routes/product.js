require('express-async-errors');

const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const { uploadMiddleware } = require('../middleware/uploadFiles');
const productController = require('../controllers/product');

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    isAuthenticated,
    isAdmin,
    uploadMiddleware,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProductById)
  .delete(isAuthenticated, isAdmin, productController.deleteProduct)
  .patch(isAuthenticated, isAdmin, productController.updateProduct);

module.exports = router;
