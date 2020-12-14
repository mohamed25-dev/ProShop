const {
  NotFoundException,
  BadRequestException,
} = require('../../common/errors/exceptions');
const orderService = require('../services/order');
const responseWrapper = require('../../common/response/success');

exports.getAllOrders = async (req, res) => {
  let orders = await orderService.getAllOrders();
  return responseWrapper.success(res, orders);
};

exports.getOrderByOrderId = async (req, res) => {
  let orderId = req.params.id;
  let order = await orderService.getOrderById(orderId);

  if (!order) {
    throw new NotFoundException('Order Not Found');
  }

  return responseWrapper.success(res, order);
};

exports.getOrderDetails = async (req, res) => {
  let orderId = req.params.id;
  let order = await orderService.getOrderDetails(orderId);

  if (!order) {
    throw new NotFoundException('Order Not Found');
  }

  return responseWrapper.success(res, order);
};

exports.getOrdersByUserId = async (req, res) => {
  let userId = req.params.id;
  let orders = await orderService.getOrderById(userId);

  return responseWrapper.success(res, orders);
};

exports.createOrder = async (req, res) => {
  let userId = req.user.id;
  let orderItems = req.body;

  let orders = await orderService.createOrder(userId, orderItems);

  return responseWrapper.success(res, orders);
};

exports.payOrder = async (req, res) => {
  let paymentData = {
    userId: req.user.id,
    orderId: req.params.id,
    amount: req.body.amount,
    paymentMethodId: req.body.paymentMethodId,
  };

  let orders = await orderService.payOrder(paymentData);

  return responseWrapper.success(res, orders);
};
