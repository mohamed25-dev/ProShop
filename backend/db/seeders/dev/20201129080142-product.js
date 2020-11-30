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
          quantity_in_stock: 15,
          category_id: 1,
          image: '/images/product.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '11123',
          name: 'Dell XPS 15',
          price: 1000,
          quantity_in_stock: 15,
          category_id: 1,
          image: '/images/product.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('product', null, {});
  },
};
