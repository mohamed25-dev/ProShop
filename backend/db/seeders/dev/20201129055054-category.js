'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'category',
      [
        {
          id: 1,
          name: 'tech',
        },
        {
          id: 2,
          name: 'cloth',
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('category', null, {});
  },
};
