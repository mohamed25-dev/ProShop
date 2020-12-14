'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('payment', 'orderId', {
      type: Sequelize.STRING(255),
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
    });

    await queryInterface.removeColumn('order', 'paymentId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('payment', 'orderId');
    await await queryInterface.addColumn('order', 'paymentId', {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'payment',
        key: 'id',
      },
    });
  },
};
