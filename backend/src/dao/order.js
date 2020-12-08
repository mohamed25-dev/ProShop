const db = require('../models');
const Order = db.order;

exports.getAllOrders = () => {
  return Order.findAll();
};

exports.getOrderById = (orderId) => {
  return Order.findByPk(orderId);
};

exports.getOrdersByUserId = (userId) => {
  return Order.findAll({
    where: {
      userId,
    },
  });
};

exports.createOrder = (order) => {
  return Order.create({
    ...order,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
