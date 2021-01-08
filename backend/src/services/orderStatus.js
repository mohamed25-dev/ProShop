const orderStatus = require('../dao/orderStatus');

exports.getAllStatues = () => {
  return orderStatus.getAllStatuses();
};
