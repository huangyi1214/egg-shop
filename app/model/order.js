'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DECIMAL } = app.Sequelize;
  const Order = app.model.define('order', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    ordernum: STRING(20),
    userid: STRING(50),
    sendnum: INTEGER,
    Consumption: DECIMAL(10, 2),
    createtime: DATE,
    endtime: DATE,
  }, {
      freezeTableName: true,
      tableName: 'order',
      timestamps: false,
    });


  return Order;
};
