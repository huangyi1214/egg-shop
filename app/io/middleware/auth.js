'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { socket } = ctx;

    // console.log('abc:' + socket.token);
    await next();
    
  };
};
