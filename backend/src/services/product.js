const productDao = require('../dao/product');

exports.getAllProducst = () => {
  return productDao.getAllProducst();
};

exports.getProductById = (productId) => {
  return productDao.getProductById(productId);
};
