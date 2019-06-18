'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.home.login);
  router.post('/sendOrder', controller.order.sendOrder);
  router.post('/acceptOrder', controller.order.acceptOrder);
  router.get('/getUserInfo', controller.home.getUserInfo);
  router.post('/getOrder', controller.order.getOrder);
  router.post('/getAcceptOrder', controller.order.getAcceptOrder);
  app.io.of('/').route('login', io.controller.login.login);
  app.io.of('/').route('sendOrder', io.controller.order.sendOrder);
  app.io.of('/').route('acceptOrder', io.controller.order.acceptOrder);

};
