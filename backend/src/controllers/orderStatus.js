const orderStatus = require('../services/orderStatus');
const responseWrapper = require('../../common/response/success');

exports.getAllStatuses = async (req, res) => {
  let statuses = await orderStatus.getAllStatues();
  return responseWrapper.success(res, statuses);
};
