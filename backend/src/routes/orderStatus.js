require('express-async-errors');

const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const orderStatusController = require('../controllers/orderStatus');

router
  .route('/')
  .get(isAuthenticated, isAdmin, orderStatusController.getAllStatuses);

module.exports = router;
