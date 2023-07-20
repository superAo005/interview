// config/utils/constants.js
const path = require("path");
const { getEnv } = require("./helper");

// 构建目录
const DIST_PATH = path.resolve(__dirname, "../../", "dist");
// src目录
const SRC_PATH = path.resolve(__dirname, "../../", "src");
//public 目录
const PUBLIC_PATH = path.resolve(__dirname, "../../", "public");
//根节点目录
const ROOT_PATH = path.resolve(__dirname, "../../");

const NODE_ENV = getEnv();
//是否是生产环境
const IS_PRODUCTION = NODE_ENV === "production";
const IS_DEVELOPMENT = NODE_ENV === "development";
//是否是开发环境

module.exports = {
  DIST_PATH,
  SRC_PATH,
  PUBLIC_PATH,
  ROOT_PATH,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
};
