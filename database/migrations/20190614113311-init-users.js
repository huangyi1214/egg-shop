'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('user', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: Sequelize.STRING(50),
      phone: Sequelize.STRING(11),
      password: Sequelize.STRING(50),
      channel: Sequelize.STRING(50),
      createTime: Sequelize.DATE,
      loginTime: Sequelize.DATE,
    });
  },

  down: async queryInterface => {
    return await queryInterface.dropTable('user');
  }
};
