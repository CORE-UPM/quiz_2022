'use strict';

var crypt = require('../helpers/crypt');


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: crypt.encryptPassword('1234', 'aaaa'),
        salt: 'aaaa',
        isAdmin: true,
        accountTypeId: 0,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        username: 'pepe',
        password: crypt.encryptPassword('5678', 'bbbb'),
        salt: 'bbbb',
        accountTypeId: 0,
        createdAt: new Date(), updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
