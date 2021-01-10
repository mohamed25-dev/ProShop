const { getId } = require('../../common/idGenerator');
const orderDao = require('../dao/order');
const orderItemsDao = require('../dao/orderItems');
const paymentDao = require('../dao/payment');
const productDao = require('../dao/product');

exports.getAllOrders = () => {
  return orderDao.getAllOrders();
};

exports.getOrderById = (orderId) => {
  return orderDao.getOrderById(orderId);
};

exports.getOrderDetails = (orderId) => {
  return orderDao.getOrderDetails(orderId);
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

  for (let item of orderItems) {
    await productDao.updateProductInStock(item.productId, -item.quantity);
  }

  let totalPrice = orderItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  totalPrice > 100 ? (order.shippingPrice = 100) : (order.shippingPrice = 0);
  order.taxPrice = totalPrice * 0.2;

  order = await orderDao.createOrder(order);

  orderItems.forEach((item) => (item.orderId = id));
  await orderItemsDao.createBulk(orderItems);

  return order;
};

exports.payOrder = async (paymentData) => {
  await orderDao.setPaid(paymentData.orderId);
  return paymentDao.payOrder(paymentData);
};

exports.shipOrder = async (orderId) => {
  return orderDao.setShipped(orderId);
};

exports.deliverOrder = async (orderId) => {
  return orderDao.setDelivered(orderId);
};
