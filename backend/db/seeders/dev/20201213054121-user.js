'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'user',
      [
        {
          id: '123',
          name: 'Mohamed',
          email: 'mohamed@email.com',
          password: process.env.ADMIN_PASSWORD,
          roleId: 1,
          mobileNumber: '+249915465454',
          profileImage: '/images/product.jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '124',
          name: 'Ahmed',
          email: 'ahmed@email.com',
          password: process.env.CUSTOMER_PASSWORD,
          roleId: 2,
          mobileNumber: '+249113060999',
          profileImage: '/images/product.jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  },
};
