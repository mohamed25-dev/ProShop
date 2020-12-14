const db = require('../models');
const Payment = db.payment;

exports.payOrder = (data) => {
  let paymentData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return Payment.create(paymentData);
};
