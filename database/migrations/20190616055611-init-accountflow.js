'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('accountflow', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: Sequelize.INTEGER,
      before_change: Sequelize.DECIMAL(10, 2),
      change_amount: Sequelize.DECIMAL(10, 2),
      After_change: Sequelize.DECIMAL(10, 2),
      update_time: Sequelize.DECIMAL(10, 2),
      type: Sequelize.INTEGER(1),
      ordernum: Sequelize.STRING(20),
    });
  },

  down: async queryInterface => {
    return await queryInterface.dropTable('accountflow');
  }
};
