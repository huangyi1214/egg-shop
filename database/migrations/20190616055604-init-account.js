'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('account', {
      accountid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userid: Sequelize.INTEGER,
      Balance: Sequelize.DECIMAL(10, 2),
      freeze: Sequelize.DECIMAL(10, 2),

    });
  },

  down: async queryInterface => {
    return await queryInterface.dropTable('account');
  },
};
