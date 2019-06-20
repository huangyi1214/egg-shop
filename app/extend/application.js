'use strict';
const Redlock = require('redlock');
let lock;
exports.getlock = app => {
  if (!lock) {
    lock = new Redlock(
      [app.redis.get('order')],
      {
        driftFactor: 0.01, // time in ms
        retryCount: 10,
        retryDelay: 200, // time in ms
        retryJitter: 200, // time in ms
      });
  }
  return lock;
}
