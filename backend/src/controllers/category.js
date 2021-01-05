const categoryService = require('../services/category');
const responseWrapper = require('../../common/response/success');

exports.getAllCategories = async (req, res) => {
  let categories = await categoryService.getAllCategories();
  return responseWrapper.success(res, categories);
};
