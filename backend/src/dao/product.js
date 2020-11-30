const db = require('../models');
const Product = db.product;

exports.getAllProducst = () => {
  return Product.findAll();
};

exports.getProductById = (productId) => {
  return Product.findByPk(productId);
};
