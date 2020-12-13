'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('order', 'shippingPrice', {
      defaultValue: 0,
      type: Sequelize.DECIMAL,
    });

    await queryInterface.addColumn('order', 'taxPrice', {
      defaultValue: 0,
      type: Sequelize.DECIMAL,
    });

    await queryInterface.removeColumn('order', 'totalPrice');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('order', 'shippingPrice');
    await queryInterface.removeColumn('order', 'taxPrice');
    await queryInterface.addColumn('order', 'totalPrice', {
      defaultValue: 0,
      type: Sequelize.DECIMAL,
    });
  },
};
