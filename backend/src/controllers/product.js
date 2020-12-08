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
