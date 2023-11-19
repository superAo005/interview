## Blob 

在 web 领域，Blob 对象表示一个只读原始数据的类文件对象
虽然是二进制原始数据但是类似文件的对象，因此可以像操作文件对象一样操作 Blob 对象
File对象其实继承自Blob对象，并提供了提供了name ， lastModifiedDate， size ，type 等基础元数据
## [为什么视频网站的视频链接地址是 blob](https://juejin.cn/post/6844903880774385671)

## ArrayBuffer

ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。
我们可以通过 new ArrayBuffer(length)来获得一片连续的内存空间，它不能直接读写，但可根据需要将其传递到 TypedArray 视图或 DataView 对象来解释原始缓冲区

***Blob 与 ArrayBuffer 的区别是，除了原始字节以外它还提供了 mime type 作为元数据，Blob 和 ArrayBuffer 之间可以进行转换。***
```js
//创建一个以二进制数据存储的html文件
const text = "<div>hello world</div>";
const blob = new Blob([text], { type: "text/html" }); // Blob {size: 22, type: "text/html"}
//以文本读取
const textReader = new FileReader();
textReader.readAsText(blob);
textReader.onload = function() {
  console.log(textReader.result); // <div>hello world</div>
};
//以ArrayBuffer形式读取
const bufReader = new FileReader();
bufReader.readAsArrayBuffer(blob);
bufReader.onload = function() {
  console.log(new Uint8Array(bufReader.result)); // Uint8Array(22) [60, 100, 105, 118, 62, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 60, 47, 100, 105, 118, 62]
};

```
### URL.createObjectURL
URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象