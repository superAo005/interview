// config/utils/helper.js
// 配置一些经常用到的常量
function getEnv() {
  return process.env.NODE_ENV || "development";
}

module.exports = {
  getEnv,
};