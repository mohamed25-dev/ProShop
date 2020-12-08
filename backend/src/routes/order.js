require('express-async-errors');

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.route('/').post(isAuthenticated, orderController.createOrder);

module.exports = router;
