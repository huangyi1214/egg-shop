'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(50),
    phone: STRING(11),
    password: STRING(50),
    createtime: DATE,
    logintime: DATE,
  }, {
      freezeTableName: true,
      tableName: 'user',
      timestamps: false,
    });


  return User;
};
