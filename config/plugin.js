'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // mysql: {
  //   enable: true,
  //   package: 'egg-mysql',
  // },
  // sequelize: {
  //   enable: true,
  //   package: 'egg-sequelize',
  // },
  validateJoi: {
    enable: true,
    package: 'egg-validate-joi',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
  alinode: {
    enable: true,
    package: 'egg-alinode',
  },  
};
