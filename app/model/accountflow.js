'use strict';

module.exports = app => {
  const { INTEGER, DECIMAL, STRING, DATE } = app.Sequelize;
  const obj = app.model.define('accountflow', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userid: INTEGER,
    beforechange: DECIMAL,
    changeamount: DECIMAL,
    Afterchange: DECIMAL,
    type: INTEGER,
    ordernum: STRING(20),
  }, {
      freezeTableName: true,
      tableName: 'accountflow',
      timestamps: false,
    });


  return obj;
};
