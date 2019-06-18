'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async login() {
    const ctx = this.ctx;
    let result = await ctx.service.login.login(ctx.request.body);
    result.ctx = ctx;

    ctx.helper.success(result);
  }
  async getUserInfo() {
    const ctx = this.ctx;


    ctx.body= { code: 0, message: '获取成功', data: { user: {}, roles: ['admin'] } };
  }

  async logout() {
    const ctx = this.ctx;
    ctx.body = { code: 0, message: '获取成功', data: {} };
  }
}

module.exports = HomeController;
