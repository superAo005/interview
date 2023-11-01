import LazyLoad from "@/components/router-wrapper/LazyLoad";
import NoPermissions from "@/pages/error/403";
import NotFound from "@/pages/error/404";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { IRouteObject, RouteMeta } from "../renderRouter";

const HomeRoutes = [
  {
    /** 为了后面最路由鉴权判断，这里建议path的/一定要带上，不要交给route v6给我默认带 */
    path: "/",
    element: LazyLoad(lazy(() => import("@/layout"))),
    children: [
      {
        path: "/",
        // 重定向子路由home
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: LazyLoad(lazy(() => import("@/pages/home"))),
        meta: new RouteMeta("主页", false),
      },
      {
        path: "/403",
        element: <NoPermissions />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
];

export default HomeRoutes;
