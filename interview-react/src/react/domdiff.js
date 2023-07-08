import * as React from "react";
import * as ReactDOM from "react-dom";
let oldStyle = { border: "3px solid red", margin: "5px" };
let newStyle = { border: "3px solid green", margin: "5px" };
let root = document.getElementById("root");
let oldVDOM = (
  <ul>
    <li key="A" style={oldStyle}>
      A
    </li>
    <li key="B" style={oldStyle}>
      B
    </li>
    <li key="C" style={oldStyle}>
      C
    </li>
    <li key="D" style={oldStyle}>
      D
    </li>
    <li key="E" style={oldStyle}>
      E
    </li>
    <li key="F" style={oldStyle}>
      F
    </li>
  </ul>
);
ReactDOM.render(oldVDOM, root);
setTimeout(() => {
  let newVDOM = (
    <ul>
      <li key="A" style={newStyle}>
        A-new
      </li>
      <li key="C" style={newStyle}>
        C-new
      </li>
      <li key="E" style={newStyle}>
        E-new
      </li>
      <li key="B" style={newStyle}>
        B-new
      </li>
      <li key="G" style={newStyle}>
        G
      </li>
    </ul>
  );
  ReactDOM.render(newVDOM, root);
}, 1000);
