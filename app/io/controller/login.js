'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    async login() {
      const message = this.ctx.args[0];
      const result = await this.ctx.service.login.login(message);
      this.ctx.socket.token = result.token;
      this.ctx.socket.emit('res', result);

    }
  }
  return Controller;
};
