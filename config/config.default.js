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
    database: 'dd',
    logging: false,
    port: 3306,
    password: 'fys@4495',
    timezone: '+08:00',
    replication: {
      read: [
        { host: 'rr-wz9jl4stepk86s8z1so.mysql.rds.aliyuncs.com', username: 'shop', password: 'fys@4495' },
        { host: 'rr-wz99h9624tioin3b68o.mysql.rds.aliyuncs.com', username: 'shop', password: 'fys@4495' },
      ],
      write: { host: 'rm-wz92hz04oxb41q024lo.mysql.rds.aliyuncs.com', username: 'shop', password: 'fys@4495' },
    },
    pool: { // 如果需要重写链接池，请在 pool 选项中修改

      maxConnections: 20,
      maxIdleTime: 30000,

    },
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
      host: 'rm-wz92hz04oxb41q024lo.mysql.rds.aliyuncs.com',
      // 端口号
      port: '3306',
      // 用户名
      user: 'shop',
      // 密码
      password: 'fys@4495',
      // 数据库名
      database: 'dd',
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
      userinfo: {                 // instanceName. See below
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '',
        db: 3,
      },
      order: {                 // instanceName. See below
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '',
        db: 2,
      },
      socket: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 1,
      },
    }
  };
  config.alinode = {
    appid: 80334,
    secret: 'ff21d48befa19a006d424f49bb6a73c18be09b2d',
  }
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
