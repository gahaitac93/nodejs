'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'password', {
          type: Sequelize.STRING,
          after: "email"
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'address', {
          type: Sequelize.STRING,
          after: "password"
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'password', { transaction: t }),
        queryInterface.removeColumn('Users', 'address', { transaction: t })
      ])
    })
  }
};
