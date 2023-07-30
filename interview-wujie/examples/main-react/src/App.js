import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import WujieReact from "wujie-react";
import React, { useState } from "react";
import Home from "./pages/Home";
import All from "./pages/All.js";
import Button from "antd/es/button";
import { UnorderedListOutlined, CaretUpOutlined } from "@ant-design/icons";

const { bus } = WujieReact;

const subMap = {};

function Nav() {
  const location = useLocation();
  const navigation = useNavigate();

  const degrade = window.Proxy;

  // 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
  bus.$on("sub-route-change", (name, path) => {
    const mainName = `${name}-sub`;
    const mainPath = `/${name}-sub${path}`;
    const currentPath = window.location.hash.replace("#", "");
    if (currentPath.includes(mainName) && currentPath !== mainPath) {
      navigation(mainPath);
    }
  });

  const handleFlag = (name) => {
    switch (name) {
      default:
        break;
    }
  };

  return (
    <nav>
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        介绍
      </NavLink>
      <NavLink
        to="/all"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        all
      </NavLink>
      <Button
        type="primary"
        className="menu-icon"
        icon={<UnorderedListOutlined />}
      ></Button>
    </nav>
  );
}

class App extends React.PureComponent {
  state = {
    active: false,
  };
  changeActive = (val) => {
    this.setState({ active: val });
  };
  render() {
    return (
      <div className="app">
        <Router>
          <div className={this.state.active ? "nav active" : "nav"}>
            <Nav />
          </div>
          <div className="content" onClick={() => this.changeActive(false)}>
            <Routes>
              <Route
                exact
                path="/home"
                element={<Home changeActive={this.changeActive} />}
              />
              <Route exact path="/all" element={<All />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
