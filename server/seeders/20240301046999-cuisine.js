'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let testCuisine = JSON.parse(fs.readFileSync('./testcuisine.json', 'utf-8'))
    testCuisine.map((item) => {
      item.createdAt = new Date()
      item.updatedAt = new Date()
    })
   await queryInterface.bulkInsert('Cuisines', testCuisine)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cuisines', null, {});
  }
};
