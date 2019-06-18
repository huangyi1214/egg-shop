'use strict';

module.exports = app => {
  const { INTEGER, DECIMAL } = app.Sequelize;
  const Account = app.model.define('account', {
    accountid: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userid: INTEGER,
    Balance: { type: DECIMAL(10, 2), allowNull: false, defaultValue: '0.00' },
    freeze: { type: DECIMAL(10, 2), allowNull: false, defaultValue: '0.00' },
  }, {
      freezeTableName: true,
      tableName: 'account',
      timestamps: false,
    });


  return Account;
};
