const db = require('../models');
const Order = db.order;
const User = db.user;
const OrderItems = db.order_items;
const OrderStatus = db.order_status;
const ShippingAddress = db.shipping_address;
const Payment = db.payment;
const PaymentMethod = db.payment_method;

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

const includeOrderStatus = {
  model: OrderStatus,
  as: 'status',
};

const includePayment = {
  model: Payment,
  as: 'payment',
  include: [
    {
      model: PaymentMethod,
      as: 'paymentMethod',
    },
  ],
};

const includeShippingAddress = {
  model: ShippingAddress,
  as: 'shippingAddress',
};

exports.getAllOrders = () => {
  return Order.findAll();
};

exports.getOrderById = (orderId) => {
  return Order.findByPk(orderId);
};

exports.getOrderDetails = async (orderId) => {
  return Order.findByPk(orderId, {
    include: [
      includeOrderItems,
      includeUser,
      includeOrderStatus,
      includeShippingAddress,
      includePayment,
    ],
  });
};

exports.getOrdersByUserId = (userId) => {
  return Order.findAll({
    where: {
      userId,
    },
    include: [
      includeOrderItems,
      includeUser,
      includeOrderStatus,
      includeShippingAddress,
      includePayment,
    ],
  });
};

exports.createOrder = (order) => {
  return Order.create({
    ...order,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

exports.setPaid = (orderId) => {
  return Order.update(
    { statusId: 2 },
    {
      where: {
        id: orderId,
      },
    }
  );
};

exports.setShipped = (orderId) => {
  return Order.update(
    { statusId: 3 },
    {
      where: {
        id: orderId,
      },
    }
  );
};

exports.setDelivered = (orderId) => {
  return Order.update(
    { statusId: 4 },
    {
      where: {
        id: orderId,
      },
    }
  );
};
