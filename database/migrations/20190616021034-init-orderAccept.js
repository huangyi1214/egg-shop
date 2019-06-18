'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('orderAccept', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      ordernum: Sequelize.STRING(20),
      acceptorder: Sequelize.STRING(20),
      userid: Sequelize.STRING(50),
      acceptnum: Sequelize.DECIMAL(10.2),
      createtime: Sequelize.DATE,
    });
  },

  down: async queryInterface => {
    return await queryInterface.dropTable('orderAccept');
  }
};
