//loader就是一个函数，接收一个内容，返回处理后的内容
function loader(source){
    console.log('logger-loader@@@@@@@@@@x');
    return source;
  }
  module.exports = loader;