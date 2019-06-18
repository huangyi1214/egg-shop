'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('order', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      ordernum: Sequelize.STRING(20),
      userid: Sequelize.STRING(50),
      sendnum: Sequelize.INTEGER,
      Consumption: Sequelize.DECIMAL(10, 2),
      createTime: Sequelize.DATE,
    });
  },

  down: async queryInterface => {
    return await queryInterface.dropTable('order');
  }
};
