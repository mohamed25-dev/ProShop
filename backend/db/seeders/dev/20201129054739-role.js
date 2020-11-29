'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'role',
      [
        {
          id: 1,
          name: 'admin',
        },
        {
          id: 2,
          name: 'customer',
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('role', null, {});
  },
};
