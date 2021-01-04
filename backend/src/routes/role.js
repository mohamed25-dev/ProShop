require('express-async-errors');

const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const roleController = require('../controllers/role');

router.route('/').get(isAuthenticated, isAdmin, roleController.getAllRoles);

module.exports = router;
