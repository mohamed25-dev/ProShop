const {
  NotFoundException,
  BadRequestException,
} = require('../../common/errors/exceptions');
const productService = require('../services/product');
const responseWrapper = require('../../common/response/success');

exports.getAllProducts = async (req, res) => {
  let products = await productService.getAllProducts();
  return responseWrapper.success(res, products);
};

exports.getProductById = async (req, res) => {
  let productId = req.params.id;
  let product = await productService.getProductById(productId);

  if (!product) {
    throw new NotFoundException('Product Not Found');
  }

  return responseWrapper.success(res, product);
};

exports.deleteProduct = async (req, res) => {
  let productId = req.params.id;
  await productService.deleteProduct(productId);

  return responseWrapper.success(res);
};

exports.createProduct = async (req, res) => {
  //TODO: validate request body
  let product = {
    name: req.body.name,
    price: req.body.price,
    quantityInStock: req.body.quantityInStock,
    categoryId: req.body.categoryId,
    image: req.file.path,
    description: req.body.description,
  };

  product = await productService.createProduct(product);

  return responseWrapper.success(res, product);
};

exports.updateProduct = async (req, res) => {
  let productId = req.params.id;
  product = await productService.updateProduct(productId, req.body);

  return responseWrapper.success(res, product);
};
