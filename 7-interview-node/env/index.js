const fs = require("fs");
const path = require("path");

const parse = function parse(src) {
  const obj = {};
  // 用换行符 分割
  // 比如
  /**
   * NAME=superAo
   * AGE=18
   * MP_WEIXIN=superAo
   * BLOG=https://lxchuan12.gitee.io
   */
  src
    .toString()
    .split("\n")
    .forEach(function (line, index) {
      // 用等号分割
      const keyValueArr = line.split("=");
      // NAME
      key = keyValueArr[0];
      // superAo
      val = keyValueArr[1] || "";
      obj[key] = val;
    });
  // { NAME: 'superAo', ... }
  return obj;
};
function resolveHome(envPath) {
  return envPath[0] === "~"
    ? path.join(os.homedir(), envPath.slice(1))
    : envPath;
}

const config = (options) => {
  // 读取 node 执行的当前路径下的 .env 文件
  let dotenvPath = path.resolve(process.cwd(), ".env");
  // utf8
  let encoding = "utf8";
  // debug 模式，输出提示等信息
  let debug = false;
  // 对象
  if (options) {
    if (options.path != null) {
      // 解析路径
      dotenvPath = resolveHome(options.path);
    }
    // 使用配置的编码方式
    if (options.encoding != null) {
      encoding = options.encoding;
    }
    // 有配置就设置为 true
    if (options.debug != null) {
      debug = true;
    }
  }
  try {
    // 按 utf-8 解析文件，得到对象
    // { NAME: '若川', ... }
    // debug 传递给 parse 函数 便于
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug });

    // 键值对形式赋值到 process.env 变量上，原先存在的不赋值
    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key];
      } else if (debug) {
        console.log(
          `"${key}" is already defined in \`process.env\` and will not be overwritten`
        );
      }
    });

    // 返回对象
    return parsed;
  } catch (e) {
    return { error: e };
  }
};

console.log(config());
console.log(process.env);

// 导出 config parse 函数
module.exports.config = config;
module.exports.parse = parse;
