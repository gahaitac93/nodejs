'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      let users = [];
      for(let i= 1; i<= 10; i++) {
          users.push({
              name: `${i}Jane Doe`,
              email: `${i}janedoe@example.com`,
              createdAt: new Date(),
              updatedAt: new Date(),
          })
      }
      return queryInterface.bulkInsert('Users', users, {
      });

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
