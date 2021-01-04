const db = require('../models');
const Role = db.role;

exports.getAllRoles = () => {
  return Role.findAll();
};
