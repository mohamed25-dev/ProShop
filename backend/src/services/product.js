const productDao = require('../dao/product');
const orderItemsDao = require('../dao/orderItems');
const {
  NotFoundException,
  BadRequestException,
  UnauthenticatedException,
} = require('../../common/errors/exceptions');

exports.getAllProducts = () => {
  return productDao.getAllProducts();
};

exports.getProductById = (productId) => {
  return productDao.getProductById(productId);
};

exports.deleteProduct = async (productId) => {
  const product = await productDao.getProductById(productId);
  if (!product) {
    throw new NotFoundException('Product not found');
  }

  const items = await orderItemsDao.getItemstByProductId(productId);
  if (items.length > 0) {
    throw new BadRequestException("Product has orders and can't be deleted");
  }

  return productDao.deleteProduct(productId);
};
