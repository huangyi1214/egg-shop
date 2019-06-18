'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DECIMAL } = app.Sequelize;
  const OrderAccept = app.model.define('orderAccept', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    ordernum: STRING(20),
    acceptorder: STRING(20),
    userid: STRING(50),
    acceptnum: DECIMAL(10.2),
    createtime: DATE,
  }, {
    freezeTableName: true,
    tableName: 'orderAccept',
    timestamps: false,
  });


  return OrderAccept;
};
