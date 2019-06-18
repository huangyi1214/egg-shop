'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async login(user) {
    try {
      const { ctx } = this;
      // await this.ctx.model.Order.findAll();
      user.createtime = new Date().getTime();
      user.logintime = new Date().getTime();
      const one = await this.ctx.model.Users.findOne({ where: { phone: user.phone } });
      if (one) {
        const token = ctx.helper.tomd5(one.id + one.phone + Date.now().toString());
        await this.app.redis.get('usertoken').set(token, JSON.stringify(one));
        return { code: 0, data: one, token, message: '登录成功', msgname: 'login', };
      }

      const result = await this.ctx.model.Users.create(user);
      const account = {
        userid: result.id,
        Balance: 100,
        freeze: 0,
      };
      await this.ctx.model.Account.create(account);
      const token = ctx.helper.tomd5(result.id + result.phone + Date.now().toString());
      await this.app.redis.get('usertoken').set(token, JSON.stringify(result));

      return {
        code: 0, data: result, token, message: '登录成功', msgname: 'login',
      };

    } catch (error) {
      console.log(error);
      return { error, code: -999, message: '登录异常', msgname: 'login' };
    }

  }
}

module.exports = LoginService;
