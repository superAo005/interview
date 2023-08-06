// 引入其他模块
import "./resource.js";
import "./error.js";
import "./event.js";

// 定义一个缓存数组
let cache = [];

// 定义一个发送数据的函数
async function sendCache() {
  // 判断缓存数组是否为空
  if (cache.length > 0) {
    // 在这里，可以使用AJAX、Fetch或其他方法将数据发送到服务器
    // 例如：
    // fetch('/api/track', {
    //   method: 'POST',
    //   body: JSON.stringify(cache),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    const res = await send("http://localhost:3000?test=123");
    if (res) {
      // 清空缓存数组
      cache = [];
    }
  }
}
function send(data) {
  const img = new Image();
  const params = new URLSearchParams(data).toString();
  img.src = `http://localhost:3000/track.gif?${params}`;
}

// 启动定时器，每隔一段时间执行一次sendCache函数
setInterval(sendCache, 10000); // 每隔10秒执行一次

// 监听页面加载事件
window.addEventListener("load", function () {
  // 获取性能数据
  const [performanceData] = performance.getEntriesByType("navigation");
  // 即将废弃 推荐上面的PerformanceNavigationTiming写法
  // let performanceData = window.performance.timing;
  // 计算页面加载时间
  console.log("performanceData", performanceData);
  let pageLoadTime =
    performanceData.domContentLoadedEventEnd - performanceData.navigationStart;
  // 计算请求响应时间
  const requestResponseTime =
    performanceData.responseEnd - performanceData.requestStart;

  // 计算DNS查询时间
  let dnsLookupTime =
    performanceData.domainLookupEnd - performanceData.domainLookupStart;

  // 计算TCP连接时间
  let tcpConnectTime =
    performanceData.connectEnd - performanceData.connectStart;

  // 计算白屏时间
  let whiteScreenTime =
    performanceData.responseStart - performanceData.navigationStart;
  // 获取 FCP 时间
  let fcpTime = 0;
  const [fcpEntry] = performance.getEntriesByName("first-contentful-paint");
  if (fcpEntry) {
    fcpTime = fcpEntry.startTime;
  }

  // 获取 LCP 时间
  let lcpTime = 0;
  const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
  if (lcpEntries.length > 0) {
    lcpTime =
      lcpEntries[lcpEntries.length - 1].renderTime ||
      lcpEntries[lcpEntries.length - 1].loadTime;
  }
  // 构造要发送的性能数据
  let perfData = {
    type: "performance",
    pageLoadTime: pageLoadTime,
    dnsLookupTime: dnsLookupTime,
    tcpConnectTime: tcpConnectTime,
    whiteScreenTime: whiteScreenTime,
    requestResponseTime: requestResponseTime,
    // 其它你想要收集的信息
  };

  // 发送性能数据
  sendData(perfData);
});
// 对外暴露函数
export { sendData };
