'use strict';
// const moment = require('moment');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
// 格式化时间
// export function formatTime(time) { return moment(time).format('YYYY-MM-DD HH:mm:ss'); }

exports.getAgent = ctx => {
  const deviceAgent = ctx.request.header['user-agent'].toLowerCase();
  const isiOS = deviceAgent.indexOf('mac os x') > -1 || deviceAgent.indexOf('ios') > -1 || deviceAgent.indexOf('iphone') > -1 //ios终端
  const isAndroid = deviceAgent.indexOf('android') > -1 || deviceAgent.indexOf('linux') > -1 || deviceAgent.indexOf('Android') > -1 || deviceAgent.indexOf('Linux') > -1
  if (isAndroid) {
    return 'Android';
  } else if (isiOS) {
    return 'IOS';
  } else {
    return 'PC';
  }

}

exports.success = ({ ctx, data = null, token = null, code = 0, message, status = 200 ,msgname}) => {
  ctx.body = {
    code,
    message,
    msgname,
  };
  if (token) ctx.body.token = token;
  if (data) ctx.body.data = data;
  ctx.status = status;
}


exports.fail = (ctx, code, msg = '请求失败', status = 200) => {
  ctx.body = {
    code,
    msg,
  };
  ctx.status = status;
}
exports.tomd5 = str => {
  const md5 = crypto.createHash('md5');
  return md5.update(str).digest('hex');
}

exports.getCurDateFormat = () => {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let date = now.getDate();
  date = date < 10 ? '0' + date : date;
  let hours = now.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  let min = now.getMinutes();
  min = min < 10 ? '0' + min : min;
  let sec = now.getSeconds();
  sec = sec < 10 ? '0' + sec : sec;
  return '' + year + month + date + hours + min + sec + Math.random().toString().substr(2, 3);
}