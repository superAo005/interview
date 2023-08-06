# 滴滴面试
bfc 
loder执行顺序
移动端适配 rem
### DOMContentLoaded和load
load 应该仅用于检测一个完全加载的页面 当一个资源及其依赖资源已完成加载时，将触发load事件。也就是说，页面的html、css、js、图片等资源都已经加载完之后才会触发 load 事件
DOMContentLoaded事件：当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。也就是说，DOM 树已经构建完毕就会触发 DOMContentLoaded 事件
