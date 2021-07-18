'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  // },

    await queryInterface.bulkInsert('users', [{
        name: 'John Doe',
        email: 'johnDoe@gmail.com',
        uuid: '643b6b9d-0118-4dc3-8307-bd6727262f10',
        role: 'admin',
        createdAt: '2021-07-14 16:23:30',
        updatedAt: '2021-07-14 16:23:30'
    }, {
      name: 'Jane Doe',
      email: 'Jane@gmail.com',
      uuid: '793b6b9d-5070-4az3-1279-bd6727262f10',
      role: 'admin',
      createdAt: '2021-07-14 16:23:30',
      updatedAt: '2021-07-14 16:23:30'
    }], {});
},
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
