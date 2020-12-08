const db = require('../models');
const OrderItems = db.order_items;

exports.getItemsByOrdertId = (orderId) => {
  return OrderItems.findAll({
    where: {
      order_id: orderId,
    },
  });
};

exports.createBulk = (orderItems) => {
  return OrderItems.bulkCreate(orderItems);
};

exports.createOrderItem = (item) => {
  return OrderItems.create(item);
};

exports.getProductById = (productId) => {
  return OrderItems.findByPk(productId);
};
