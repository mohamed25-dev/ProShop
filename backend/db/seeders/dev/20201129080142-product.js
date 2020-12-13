'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'product',
      [
        {
          id: '11124',
          name: 'Dell XPS 13',
          price: 799,
          quantityInStock: 15,
          categoryId: 1,
          image: '/images/product.jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '11123',
          name: 'Dell XPS 15',
          price: 1000,
          quantityInStock: 15,
          categoryId: 1,
          image: '/images/product.jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('product', null, {});
  },
};
