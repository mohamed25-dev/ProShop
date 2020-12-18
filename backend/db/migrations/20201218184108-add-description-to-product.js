'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('product', 'description', {
      type: Sequelize.STRING(255),
      defaultValue: 'Description is not available for this product',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('product', 'description');
  },
};
