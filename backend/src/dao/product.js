const db = require('../models');
const Product = db.product;

exports.getAllProducts = () => {
  return Product.findAll();
};

exports.getProductsByIds = (ids) => {
  return Product.findAll({
    where: {
      id: ids,
    },
  });
};

exports.getProductById = (productId) => {
  return Product.findByPk(productId);
};
