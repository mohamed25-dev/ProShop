const roleService = require('../services/role');
const responseWrapper = require('../../common/response/success');

exports.getAllRoles = async (req, res) => {
  let roles = await roleService.getAllRoles();
  return responseWrapper.success(res, roles);
};
