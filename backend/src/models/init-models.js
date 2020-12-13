var DataTypes = require('sequelize').DataTypes;
var _category = require('./category');
var _order = require('./order');
var _order_items = require('./order_items');
var _order_status = require('./order_status');
var _payment = require('./payment');
var _payment_method = require('./payment_method');
var _product = require('./product');
var _review = require('./review');
var _role = require('./role');
var _user = require('./user');

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var order_status = _order_status(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var payment_method = _payment_method(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  order.belongsTo(user, { foreignKey: 'userId' });
  payment.hasMany(order, { foreignKey: 'paymentId' });
  order.belongsTo(order_status, { foreignKey: 'statusId' });
  order_status.hasMany(order, { foreignKey: 'statusId' });
  order_items.belongsTo(order, { foreignKey: 'orderId' });
  order.hasMany(order_items, { foreignKey: 'orderId' });
  order_items.belongsTo(product, { foreignKey: 'productId' });
  product.hasMany(order_items, { foreignKey: 'productId' });
  payment.belongsTo(payment_method, { foreignKey: 'paymentMethodId' });
  payment_method.hasMany(payment, { foreignKey: 'paymentMethodId' });
  product.belongsTo(category, { foreignKey: 'categoryId' });
  category.hasMany(product, { foreignKey: 'categoryId' });
  review.belongsTo(product, { foreignKey: 'productId' });
  product.hasMany(review, { foreignKey: 'productId' });
  review.belongsTo(user, { foreignKey: 'userId' });
  user.hasMany(review, { foreignKey: 'userId' });
  order.belongsTo(payment, { foreignKey: 'paymentId' });
  user.hasMany(order, { foreignKey: 'userId' });
  user.belongsTo(role, { foreignKey: 'roleId' });
  role.hasMany(user, { foreignKey: 'roleId' });

  return {
    category,
    order,
    order_items,
    order_status,
    payment,
    payment_method,
    product,
    review,
    role,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
