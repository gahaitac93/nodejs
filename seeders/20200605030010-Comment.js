'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let comments = [];
    for(let i= 1; i<= 10; i++) {
      comments.push({
        userId: i,
        postId: i,
        comment:
            `${i}Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
      return queryInterface.bulkInsert('Comments', comments, {

      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
