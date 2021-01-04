const roleDao = require('../dao/role');

exports.getAllRoles = () => {
  return roleDao.getAllRoles();
};
