'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      let posts = [];
      for(let i= 1; i<= 10; i++) {
        posts.push({
          userId: i,
          title: `${i}hispotan de nu`,
          content:
              `${i}Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.`,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      return queryInterface.bulkInsert('Posts', posts, {

      });

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Posts', null, {});
  }
};
