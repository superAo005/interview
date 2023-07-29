/**
 * 前端运行node脚本执行上传资源命令到七牛云，如上传前端打包好的dist包到服务器；
 * 省去一些人工操作以及减少服务端的流量。上传的对象为七牛云的对象存储。
 */
const qiniu = require("qiniu"); //需要安装我们的七牛云 nodejs 的sdk
const fs = require("fs"); // 操作文件
const path = require("path"); // 读取路径// 定义工作目录
const PUBLIC_PATH = path.join(__dirname, "/");
// 开始配置用户凭证
let accessKey = "your accessKey";
let secretKey = "your secretKey";
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let options = { scope: "paintingstudio" }; //对象存储名;
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken = putPolicy.uploadToken(mac);
let config = new qiniu.conf.Config(); // 空间对应的机房
config.zone = qiniu.zone.Zone_z2; // 是否使用https域名
config.useHttpsDomain = true; // 上传是否使用cdn加速
config.useCdnDomain = true;
/** *
 * 遍历文件夹递归上传
 * * @param {path} src 本地路径
 * * @param {string} dist oos文件夹名
 * * @param {boolean} isDir 是否为文件夹下文件
 * */

async function addFileToOSSSync(src, dist, isDir) {
  let docs = fs.readdirSync(src);
  docs.forEach(function (doc) {
    let _src = src + "/" + doc,
      _dist = dist + "/" + doc;
    let st = fs.statSync(_src);
    // 判断是否为文件
    if (st.isFile() && dist !== "LICENSES`") {
      putOSS(_src, !isDir ? doc : `img/${doc}`);
      //如果是文件夹下文件，文件名为 img/文件名
    }
    // 如果是目录则递归调用自身
    else if (st.isDirectory()) {
      addFileToOSSSync(_src, _dist, true);
    }
  });
}
/** *单个文件上传至oss */
async function putOSS(src, dist) {
  try {
    let localFile = src;
    let formUploader = new qiniu.form_up.FormUploader(config);
    let putExtra = new qiniu.form_up.PutExtra();
    let key = dist; // 文件上传
    await formUploader.putFile(
      uploadToken,
      key,
      localFile,
      putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode === 200) {
          console.log(key + "上传oss成功");
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      }
    );
  } catch (e) {
    console.log("上传失败".e);
  }
}
/** *上传文件启动 */
async function upFile() {
  try {
    let src = PUBLIC_PATH + ".nuxt/dist/client"; //需要上传的路径
    let docs = fs.readdirSync(src);
    await addFileToOSSSync(src, docs);
  } catch (err) {
    console.log("上传oss失败", err);
  }
}
upFile(); //开始上传
