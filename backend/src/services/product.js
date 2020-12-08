const productDao = require('../dao/product');

exports.getAllProducts = () => {
  return productDao.getAllProducts();
};

exports.getProductById = (productId) => {
  return productDao.getProductById(productId);
};
