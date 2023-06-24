const babel = require("@babel/core");
const sourceCode = `<h1 id="title">hello</h1>`;
const result = babel.transform(sourceCode, {
  plugins: [["@babel/plugin-transform-react-jsx", { runtime: "classic" }]],
});
console.log(result.code);
/**
 这种代码需要当前的上下文中有一个React的变量
React.createElement("h1", {
  id: "title"
}, "hello");

//不需要引入React这个变量
import { jsx as _jsx } from "react/jsx-runtime";

_jsx("h1", {
    id: "title",
    children: "hello"
  });
 */
