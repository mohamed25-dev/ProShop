const { getId } = require('../../common/idGenerator');
const orderDao = require('../dao/order');
const productDao = require('../dao/product');
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
    user_id: userId,
    status_id: 1,
  };

  let totalPrice = orderItems.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );

  order.total_price = totalPrice;
  order = await orderDao.createOrder(order);

  orderItems.forEach((item) => (item.order_id = id));
  await orderItemsDao.createBulk(orderItems);

  return order;
};
