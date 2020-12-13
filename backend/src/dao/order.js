const db = require('../models');
const Order = db.order;
const User = db.user;
const OrderItems = db.order_items;

const includeUser = {
  model: User,
  as: 'customer',
  attributes: {
    exclude: ['password', 'id', 'roleId', 'createdAt', 'updatedAt'],
  },
};

const includeOrderItems = {
  model: OrderItems,
  as: 'items',
};

exports.getAllOrders = () => {
  return Order.findAll();
};

exports.getOrderById = (orderId) => {
  return Order.findByPk(orderId);
};

exports.getOrderDetails = async (orderId) => {
  return Order.findByPk(orderId, {
    include: [includeOrderItems, includeUser],
  });
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
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};
