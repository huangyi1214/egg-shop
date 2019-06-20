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


    ctx.body = { code: 0, message: '获取成功', data: { user: {}, roles: ['admin'] } };
  }

  async logout() {
    const ctx = this.ctx;
    ctx.body = { code: 0, message: '获取成功', data: {} };
  }
  async getonelineusercount() {
    const ctx = this.ctx;
    try {
      const count = await this.getcount();
      ctx.body = { code: 0, message: '获取成功', data: count };
    } catch (error) {
      ctx.body = { code: -1, message: '获取失败', data: error };
    }
  }
  getcount() {
    return new Promise((resolve, reject) => {
      this.app.io.of('/').adapter.clients('', (err, clients) => {
        if (err) {
          reject(err);
        }
        else {
          console.log('#online_join', clients.length);
          resolve(clients.length);
        }
      });
    });
  }
}

module.exports = HomeController;
