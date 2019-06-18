'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    async index() {
      const message = this.ctx.args[0];
      console.log('chat :', JSON.stringify(message) + ' : ' + process.pid);
      
      this.ctx.socket.emit('res', 'say');
    }
  }
  return Controller;
};
