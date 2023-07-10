// 计算两个时间差 dateBegin 开始时间
function timeFn(dateBegin) {
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  let dateEnd = new Date(); //获取当前时间
  let dateDiff = dateEnd.getTime() - Date.parse(new Date(dateBegin)); //时间差的毫秒数
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  let leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);

  let leave4 = leave3 % (60 * 1000); //计算分钟数后剩余的毫秒数
  let minseconds = Math.round(leave4 / 1000);
  let timeFn = `耗时：${dayDiff}天${hours}小时${minutes}分钟${seconds}秒${minseconds}毫秒`;
  return timeFn;
}
let testVal = timeFn("2021-3-11");
console.log(testVal);
