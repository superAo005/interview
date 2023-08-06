function sendData(data) {
  console.log("我才不要每次都触发呢", data);
  // 在这里，你可以使用AJAX、Fetch或其他方法将数据发送到服务器
  // 例如：
  // fetch('/api/track', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
}
// 获取资源性能数据
let resourceData = performance.getEntriesByType("resource");

// 遍历资源数据
resourceData.forEach(function (resource) {
  // 获取资源的相关信息，例如名称、类型、大小等
  let name = resource.name;
  let type = resource.initiatorType;
  let size = resource.transferSize;

  // 可计算的资源时间
  console.log(`== 资源 [${i}] - ${resource.name}`);
  // 重定向时间
  let t = resource.redirectEnd - resource.redirectStart;
  console.log(`… 重定向时间 = ${t}`);

  // DNS时间
  t = resource.domainLookupEnd - resource.domainLookupStart;
  console.log(`… DNS查询时间 = ${t}`);

  // TCP握手时间
  t = resource.connectEnd - resource.connectStart;
  console.log(`… TCP握手时间 = ${t}`);

  // 响应时间
  t = resource.responseEnd - resource.responseStart;
  console.log(`… 响应时间 = ${t}`);

  // 获取直到响应结束
  t =
    resource.fetchStart > 0 ? resource.responseEnd - resource.fetchStart : "0";
  console.log(`… 获取直到响应结束时间 = ${t}`);

  // 请求开始直到响应结束
  t =
    resource.requestStart > 0
      ? resource.responseEnd - resource.requestStart
      : "0";
  console.log(`… 请求开始直到响应结束时间 = ${t}`);

  // 开始直到响应结束
  t = resource.startTime > 0 ? resource.responseEnd - resource.startTime : "0";
  console.log(`… 开始直到响应结束时间 = ${t}`);
});
// 构造要发送的资源数据
let resData = {
  type: "resource",
  name: name,
  resourceType: type,
  size: size,
  // 其它你想要收集的信息
};

// 发送资源数据
sendData(resData);
