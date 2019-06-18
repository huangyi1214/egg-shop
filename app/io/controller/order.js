'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    async sendOrder() {
      const message = this.ctx.args[0];
      const result = await this.ctx.service.order.sendOrder(message);
      this.ctx.socket.emit('res', result);
    }
    async acceptOrder() {
      const message = this.ctx.args[0];
      console.log('token:' + this.ctx.socket.token);
      message.token = this.ctx.socket.token;
      const result = await this.ctx.service.order.acceptOrder(message);
      this.ctx.socket.emit('res', result);
    }

  }
  return Controller;
};
