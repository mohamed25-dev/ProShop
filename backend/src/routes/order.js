require('express-async-errors');

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(isAuthenticated, isAdmin, orderController.getAllOrders)
  .post(isAuthenticated, orderController.createOrder);

router.route('/me').get(isAuthenticated, orderController.getLoggedInUserOrders);

router
  .route('/:id')
  .get(isAuthenticated, isAdmin, orderController.getOrderDetails);

router.route('/:id/pay').patch(isAuthenticated, orderController.payOrder);

module.exports = router;
