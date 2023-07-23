import allRoutes from "@/routes";
import GeneralUtils, { IFlatRouteObject } from "@/utils/general";
import { App } from "antd";
import { Navigate, useLocation } from "react-router-dom";
/** 项目启动时，全局仅一次获取扁平化的路由列表 */
const flatRoutes = GeneralUtils.getFlatRoutes(allRoutes);

/** 路由守卫函数（用户认证+用户鉴权）*/
const RouterGuard = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const { message } = App.useApp();
  /** 如果跳转的是登录和注册，放行 */
  if (pathname === "/signin" || pathname === "/signup") {
    return children;
  }
  // const {message} = App.useApp();
  /** 匹配当前pathname对应的路由对象(可能多个) */
  const routeObjects: IFlatRouteObject[] = flatRoutes.filter(
    (item: IFlatRouteObject) => pathname === item.path
  );
  /** 当然路由对象 */
  let currentRoute;
  /** 当前路由是否需要用户认证 */
  let authRequire;
  /** 当前路由所需的用户角色 */
  let authRoles;
  /** 当前路由所需的用户权限 */
  let authPurviews;
  console.log(routeObjects);
  if (routeObjects && routeObjects.length > 0) {
    currentRoute = routeObjects[0];
    authRequire = currentRoute.requireAuth;
    authRoles = currentRoute.roles;
    authPurviews = currentRoute.purviews;
  }

  console.log(authRequire);
  /** 1、判断当前路由组件是否需要用户提供token令牌 */
  if (authRequire) {
    /** 用户登录后，会将token塞进浏览器缓存中*/
    let token = localStorage.getItem("token");
    /** 这里如果想继续对token进行check（check通过可以对服务器token进行续期）也可以 */
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  }

  /** 2、判断当前路由组件所需的用户角色和当前用户角色是否匹配 */
  if (authRoles && authRoles.length > 0) {
    /** 后面用户的角色会从store中对应的state上取，下面主要方便演示 */
    let role = localStorage.getItem("role");
    let matchRole = authRoles.filter((r) => role === r);
    if (!matchRole || matchRole.length === 0) {
      // message.error("你不具有访问当前路由页的权限")
      /** 跳转到403页面 */
      return <Navigate to="/403" replace />;
    }
  }
  return children;
};
export default RouterGuard;
