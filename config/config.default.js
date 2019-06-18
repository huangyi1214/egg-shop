/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560498667263_3518';

  // add your middleware config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    }
  }
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'db',
    username: 'huangyi',
    host: 'rm-wz96f97v9in1b1z08wo.mysql.rds.aliyuncs.com',
    port: 3306,
    password: 'fys@4495',
    timezone: '+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      }
    }
  };
  config.validateJoi = {
    options: {
      abortEarly: false,
    },
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'rm-wz96f97v9in1b1z08wo.mysql.rds.aliyuncs.com',
      // 端口号
      port: '3306',
      // 用户名
      user: 'huangyi',
      // 密码
      password: 'fys@4495',
      // 数据库名
      database: 'db',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.redis = {
    clients: {
      usertoken: {                 // instanceName. See below
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '',
        db: 0,
      },
      socket: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 1,
      },
    }
  };
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: ['filter'],
      },
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      auth_pass: '',
      db: 2,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
