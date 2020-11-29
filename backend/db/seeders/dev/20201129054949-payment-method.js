'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'payment_method',
      [
        {
          id: 1,
          name: 'paypal',
        },
        {
          id: 2,
          name: 'stripe',
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('payment_method', null, {});
  },
};
