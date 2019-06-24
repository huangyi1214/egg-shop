'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async sendOrder() {
    const ctx = this.ctx;

    try {
      if (ctx.request.headers['x-token']) {
        ctx.request.body.token = ctx.request.headers['x-token'];
      }
      let result = await ctx.service.order.sendOrder(ctx.request.body);
      // let result = await ctx.proxy.protoService.sendOrder(ctx.request.body);
      console.log(JSON.stringify(result));
      result.ctx = ctx;
      ctx.app.io.emit('res', { code: 0, msgname: 'sendOrder', data: result.data, date: new Date() });
      ctx.helper.success(result);
    } catch (error) {
      ctx.helper.success({ code: -999, msgname: 'sendOrder', message: '服务器异常' });
    }

  }

  async getOrder() {
    const ctx = this.ctx;
    if (ctx.request.headers['x-token']) {
      ctx.request.body.token = ctx.request.headers['x-token'];
    }
    let result = await ctx.service.order.getOrder(ctx.request.body);
    result.ctx = ctx;
    ctx.helper.success(result);
  }
  async acceptOrder() {
    const ctx = this.ctx;
    if (ctx.request.headers['x-token']) {
      ctx.request.body.token = ctx.request.headers['x-token'];
    }
    let result = await ctx.service.order.acceptOrder(ctx.request.body);
    result.ctx = ctx;
    ctx.helper.success(result);
  }

  async getAcceptOrder() {
    const ctx = this.ctx;
    if (ctx.request.headers['x-token']) {
      ctx.request.body.token = ctx.request.headers['x-token'];
    }
    let result = await ctx.service.order.getAcceptOrder(ctx.request.body);
    result.ctx = ctx;
    ctx.helper.success(result);

  }
}

module.exports = OrderController;
