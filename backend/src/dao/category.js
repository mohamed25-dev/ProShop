const db = require('../models');
const Category = db.category;

exports.getAllCategories = () => {
  return Category.findAll();
};
