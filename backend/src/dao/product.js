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

exports.getProductById = async (productId) => {
  const result = await Product.findByPk(productId);
  return Promise.resolve(result === null ? null : result.toJSON());
};

exports.updateProductInStock = async (productId, count) => {
  const product = await Product.findByPk(productId);

  await product.increment({ quantityInStock: count });

  return;
};

exports.deleteProduct = (productId) => {
  return Product.destroy({
    where: {
      id: productId,
    },
  });
};

exports.createProduct = async (product) => {
  return Product.create({
    ...product,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

exports.updateProduct = (product) => {
  return Product.update(
    {
      ...product,
      updatedAt: new Date(),
    },
    {
      where: {
        id: product.id,
      },
    }
  );
};
