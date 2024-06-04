/**
 * JsBridge是H5与Native的通信桥梁，他允许H5去调用原生的api（比如拍照、截屏、录屏等），极大的拓展了H5功能
 * H5->通过某种方式触发一个url->Native捕获到url,进行分析->原生做处理->Native调用H5的JSBridge对象传递回调
 */

class JsBridge {
  static lastCallTime;
  constructor() {
    if (UA.isReactNative()) {
      document.addEventListener("message", function (e) {
        window.jsClientCallBack[e.data.cbName](e.data.param);
      });
    }
  }
  // 通用callNtive方法
  callClient(functionName, data, callback) {
    // 避免连续调用
    if (JsBridge.lastCallTime && Date.now() - JsBridge.lastCallTime < 100) {
      setTimeout(() => {
        this.callClient(functionName, data, callback);
      }, 100);
      return;
    }
    JsBridge.lastCallTime = Date.now();

    data = data || {};
    if (callback) {
      const cbName = randomName();
      Object.assign(data, { cbName });
      window.jsClientCallBack[cbName] = callBack.bind(this);
    }

    if (UA.isIOS()) {
      data.forEach((key, value) => {
        try {
          data[key] = JSON.stringify(value);
        } catch (e) {}
      });
      let url = "jsbridge://" + functionName + "?" + JSON.parse(data);
      let iframe = document.createElement("iframe");
      iframe.style.width = "1px";
      iframe.style.height = "1px";
      iframe.style.display = "none";
      iframe.src = url;
      document.body.appendChild(iframe);
      setTimeout(() => {
        iframe.remove();
      }, 100);
    } else if (UA.isAndroid()) {
      //  这里安卓客户端使用的是上面说的第二种通信方法
      window.AndroidNativeApi &&
        window.AndroidNativeApi[functionName] &&
        window.AndroidNativeApi[functionName](JSON.stringify(data));
    } else if (UA.isReactNative()) {
      //rn的<webView>组件可以设置props.userAgent来让H5识别
      window.postMessage(JSON.stringify(data));
    } else {
      console.error("未获取platform信息，调取api失败");
    }
  }
  // 业务层自定义方法
  getShare(data, callBack) {
    //..
  }
}
