import { useRoutes } from "react-router-dom";

/**
 * 路由元信息（业务所需要的属性信息）
 * 认证方面：是否需要用户登录才能访问路由，requireAuth = true
 * 鉴权方面：用户是否具有某一角色或者权限才可以访问当前路由页面
 */
export class RouteMeta {
  /** 路由标题 */
  title?: string = "";
  /** 访问当然路由页面是否需要用户登录，默认true需要，false说明不登录也可以直接访问 */
  requireAuth?: boolean = false;
  /** 当前路由匹配的用户角色列表 */
  authRoles?: string[] = [];
  /** 当前路由匹配的用户权限列表 */
  authPurviews?: number[] = [];
  constructor(
    title: string,
    requireAuth: boolean = false,
    authRoles: string[] = [],
    authPurviews: number[] = []
  ) {
    this.title = title;
    this.requireAuth = requireAuth;
    this.authRoles = authRoles;
    this.authPurviews = authPurviews;
  }
}

//自定义路由业务属性
export interface IRouteObject {
  /** 是否区分大小写诶 */
  caseSensitive?: boolean;
  /** 子路由 */
  children?: IRouteObject[];
  /** 路由组件 */
  element?: React.ReactNode;
  /** 路由地址 */
  path?: string;
  /** ----------上面是react-router-dom 必带的-------------- */
  /** ----------下面是我们业务系统需要的一些路由额外元信息-------------- */
  meta?: RouteMeta;
}

/** 动态创建路由（<Routes>和<Route>） */
export const Router = ({ routes }: { routes: any }) => useRoutes(routes);
