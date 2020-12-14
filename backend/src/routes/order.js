require('express-async-errors');

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.route('/').post(isAuthenticated, orderController.createOrder);
router.route('/:id').get(isAuthenticated, orderController.getOrderDetails);
router.route('/:id/pay').patch(isAuthenticated, orderController.payOrder);

module.exports = router;
