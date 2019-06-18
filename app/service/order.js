'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  async sendOrder(order) {
    const { ctx } = this;
    let t;
    try {
      const user = await ctx.app.redis.get('usertoken').get(order.token);
      if (!user) {
        return {
          code: -1, message: '非法登录，请重新登录', msgname: 'sendOrder',
        };
      }
      t = await this.ctx.model.transaction();

      const user_obj = JSON.parse(user);
      const order_obj = {
        ordernum: 'S' + this.ctx.helper.getCurDateFormat(),
        userid: user_obj.id,
        sendnum: order.sendnum,
        Consumption: 0,
        createtime: new Date(order.createtime),
        endtime: new Date(order.endtime),
      };
      const obj = await this.ctx.model.Order.create(order_obj, t);
      let useraccount = await this.ctx.model.Account.findOne({
        where: {
          userid: user_obj.id,
        }
      });

      await this.ctx.model.Account.update({ freeze: parseFloat(useraccount.freeze) + parseFloat(order.sendnum) }, { where: { accountid: useraccount.accountid }, transaction: t });

      await t.commit();
      return {
        code: 0, message: '订单创建成功！', msgname: 'sendOrder', data: obj,
      };
    } catch (error) {
      console.log(error);
      await t.rollback();
      return {
        code: -1, message: '服务器异常，订单生成失败！', msgname: 'sendOrder',
      };
    }

  }

  async acceptOrder(order) {
    const { ctx } = this;
    let t;
    try {

      const user = await ctx.app.redis.get('usertoken').get(order.token);
      if (!user) {
        return {
          code: -1, message: '非法登录，请重新登录',
        };
      }
      t = await this.ctx.model.transaction();

      const user_obj = JSON.parse(user);
      const order_db = await this.ctx.model.Order.findOne({ where: { orderNum: order.acceptOrder }, t });
      if (new Date() < new Date(order_db.createtime) || new Date() > new Date(order_db.endtime)) {
        await t.rollback();
        return {
          code: -2, message: '不在抢单时间范围内', msgname: 'acceptOrder',
        };

      }
      let num = Math.random() * order_db.sendnum;
      if (parseFloat(order_db.sendnum) - parseFloat(order_db.Consumption) - num < 0) {
        if (parseFloat(order_db.sendnum) - parseFloat(order_db.Consumption) == 0) {
          await t.rollback();
          return {
            code: -3, message: '订单数量不足，抢单失败', msgname: 'acceptOrder',
          };
        }
        else {
          num = parseFloat(order_db.sendnum) - parseFloat(order_db.Consumption);
        }
      }
      const order_obj = {
        ordernum: 'B' + this.ctx.helper.getCurDateFormat(),
        acceptorder: order.acceptOrder,
        userid: user_obj.id,
        acceptnum: num,
        createtime: new Date(),
      };
      await this.ctx.model.Order.update({ Consumption: parseFloat(order_db.Consumption) + num }, { where: { id: order_db.id }, transaction: t });
      const obj = await this.ctx.model.OrderAccept.create(order_obj, t);
      // 修改账户余额
      const useraccount_send = await this.ctx.model.Account.findOne({
        where: {
          userid: order_db.userid,
        }, transaction: t,
      });

      await ctx.model.Account.update({
        Balance: parseFloat(useraccount_send.Balance) - parseFloat(num),
        freeze: parseFloat(useraccount_send.freeze) - parseFloat(num),
      }, {
          where: { accountid: useraccount_send.userid },
          transaction: t,
        });

      const useraccount_accept = await this.ctx.model.Account.findOne({
        where: {
          userid: user_obj.id,
        }, transaction: t,
      });

      await ctx.model.Account.update({ Balance: parseFloat(useraccount_accept.Balance) + parseFloat(num) }, { where: { accountid: useraccount_accept.userid }, transaction: t });


      await ctx.model.Accountflow.findAll({ where: { type: 1 } });
      const flow_send = {
        userid: parseInt(order_db.userid),
        beforechange: parseFloat(useraccount_send.Balance),
        changeamount: num,
        Afterchange: parseFloat(useraccount_send.Balance) - num,
        updatetime: new Date(),
        type: 1,
        ordernum: order.acceptOrder,
      };
      await ctx.model.Accountflow.create(flow_send);

      const flow_accept = {
        userid: user_obj.id,
        beforechange: parseFloat(useraccount_accept.Balance),
        changeamount: num,
        Afterchange: parseFloat(useraccount_accept.Balance) + num,
        updatetime: new Date(),
        type: 1,
        ordernum: order.acceptOrder,
      };
      await this.ctx.model.Accountflow.create(flow_accept);
      await t.commit();
      return {
        code: 0, message: '抢单成功', msgname: 'acceptOrder',
      };
    } catch (error) {
      await t.rollback();
      return {
        code: -999, message: '服务器异常', msgname: 'acceptOrder',
      };
    }
  }

  async getOrder(data) {
    const result = await this.ctx.model.Order.findAll();
    return { code: 0, data: result };
  }
  async getAcceptOrder(data) {
    const result = await this.ctx.model.OrderAccept.findAll({ where: { acceptorder: data.ordernum } });
    return { code: 0, data: result };
  }
}

module.exports = OrderService;
