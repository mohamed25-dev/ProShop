const db = require('../models');
const OrderStatus = db.order_status;

exports.getAllStatuses = () => {
  return OrderStatus.findAll();
};
