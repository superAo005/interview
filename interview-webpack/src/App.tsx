import { lazy, Suspense, useState } from "react";
import { ConfigProvider,Button } from "antd";
// 引入语言包
import zhCN from "antd/locale/zh_CN";
import smallImg from "./assets/imgs/5kb.png";
import bigImg from "./assets/imgs/22kb.png";
import Class from "./components/Class";
import CreatePortal from "./components/CreatePortal";
import "./app.less";
// prefetch
const PreFetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreFetchDemo" */
      /*webpackPrefetch: true*/
      "@/components/PreFetchDemo"
    )
);
// preload
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreloadDemo" */
      /*webpackPreload: true*/
      "@/components/PreloadDemo"
    )
);

function App() {
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(!show);
  };
  return (
    <>
      <ConfigProvider
        // 传入主题色配置
        theme={{
          token: {
            colorPrimary: "#00b96b",
          },
        }}
        // 传入语言包
        locale={zhCN}
      >
        <Button onClick={onClick}>展示</Button>
        <CreatePortal></CreatePortal>
        <Class />
        {/* show为true时加载组件 */}
        {show && (
          <>
            <img src={smallImg} alt="小于10kb的图片" />
            <img src={bigImg} alt="大于于10kb的图片" />
            <div className="smallImg"></div> {/* 小图片背景容器 */}
            <div className="bigImg"></div> {/* 大图片背景容器 */}
            <Suspense fallback={null}>
              <PreloadDemo />
            </Suspense>
            <Suspense fallback={null}>
              <PreFetchDemo />
            </Suspense>
          </>
        )}
      </ConfigProvider>
    </>
  );
}
export default App;
