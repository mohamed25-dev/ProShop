const { getId } = require('../../common/idGenerator');
const orderDao = require('../dao/order');
const orderItemsDao = require('../dao/orderItems');

exports.getAllOrders = () => {
  return orderDao.getAllOrders();
};

exports.getOrderById = (orderId) => {
  return orderDao.getOrderById(orderId);
};

exports.getOrdersByUserId = (userId) => {
  return orderDao.getOrdersByUserId(userId);
};

exports.createOrder = async (userId, orderItems) => {
  let id = getId();

  let order = {
    id,
    userId,
    statusId: 1,
  };

  let totalPrice = orderItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  order.totalPrice = totalPrice;
  order = await orderDao.createOrder(order);

  orderItems.forEach((item) => (item.orderId = id));
  await orderItemsDao.createBulk(orderItems);

  return order;
};
