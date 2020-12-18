const productDao = require('../dao/product');
const orderItemsDao = require('../dao/orderItems');
const { getId } = require('../../common/idGenerator');

const {
  NotFoundException,
  BadRequestException,
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

exports.createProduct = async (product) => {
  let id = getId();

  product.id = id;
  await productDao.createProduct(product);

  return product;
};

exports.updateProduct = async (productId, updatedProduct) => {
  let product = await productDao.getProductById(productId);
  if (!product) {
    throw new NotFoundException('Product Not Found');
  }

  product.name = updatedProduct.name || product.name;
  product.price = updatedProduct.price || product.price;
  product.image = updatedProduct.image || product.image;
  product.categoryId = updatedProduct.categoryId || product.categoryId;
  product.description = updatedProduct.description || product.description;
  product.quantityInStock =
    updatedProduct.quantityInStock || product.quantityInStock;

  await productDao.updateProduct(product);

  product = await productDao.getProductById(productId);
  return product;
};
