'use strict';

module.exports = () => {
  return async (ctx, next) => {
    ctx.socket.emit('res', 'auth!' );
    await next();
    console.log('失去连接!');
  };
};
