const categoryDao = require('../dao/category');

exports.getAllCategories = () => {
  return categoryDao.getAllCategories();
};
