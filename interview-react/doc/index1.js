import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <h1 style={{ color: "red" }} onClick={() => console.log("hello")}>
    hello
  </h1>,
  document.getElementById("root")
);
