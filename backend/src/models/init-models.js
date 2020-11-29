var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _order = require("./order");
var _order_items = require("./order_items");
var _order_status = require("./order_status");
var _payment = require("./payment");
var _payment_method = require("./payment_method");
var _product = require("./product");
var _review = require("./review");
var _role = require("./role");
var _user = require("./user");

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

  order.belongsTo(payment, { foreignKey: "payment_id"});
  payment.hasMany(order, { foreignKey: "payment_id"});
  order.belongsTo(order_status, { foreignKey: "status_id"});
  order_status.hasMany(order, { foreignKey: "status_id"});
  order_items.belongsTo(order, { foreignKey: "order_id"});
  order.hasMany(order_items, { foreignKey: "order_id"});
  order_items.belongsTo(product, { foreignKey: "product_id"});
  product.hasMany(order_items, { foreignKey: "product_id"});
  payment.belongsTo(payment_method, { foreignKey: "payment_method_id"});
  payment_method.hasMany(payment, { foreignKey: "payment_method_id"});
  product.belongsTo(category, { foreignKey: "category_id"});
  category.hasMany(product, { foreignKey: "category_id"});
  review.belongsTo(product, { foreignKey: "product_id"});
  product.hasMany(review, { foreignKey: "product_id"});
  review.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(review, { foreignKey: "user_id"});
  user.belongsTo(role, { foreignKey: "role_id"});
  role.hasMany(user, { foreignKey: "role_id"});

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
