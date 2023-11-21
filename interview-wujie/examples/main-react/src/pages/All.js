import React from "react";
import hostMap from "../hostMap";
import WujieReact from "wujie-react";
import { useNavigate } from "react-router-dom";

export default function React16() {
  const navigation = useNavigate();
  const degrade = window.Proxy;
  // 修正iframe的url，防止github pages csp报错
  const props = {
    jump: (name) => {
      navigation(`/${name}`);
    },
  };
  return <div style={{ height: "100%", width: "100%" }}></div>;
}
