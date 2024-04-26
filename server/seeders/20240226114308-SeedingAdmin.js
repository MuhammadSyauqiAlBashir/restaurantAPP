'use strict';

const bcryptPass = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Users', [{
      email : "tes1@mail.com",
      password : bcryptPass.hashPassword("tes1"),
      role : "Admin",
      phoneNumber : "tes1",
      address : "test1",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      email : "tes2@mail.com",
      password : bcryptPass.hashPassword("tes2"),
      role : "Admin",
      phoneNumber : "tes1",
      address : "test1",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      email : "tes3@mail.com",
      password : bcryptPass.hashPassword("tes3"),
      role : "Staff",
      phoneNumber : "tes3",
      address : "test3",
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
