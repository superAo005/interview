import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
	{
		path: "/",
		redirect: "/home",
		name: "App",
	},
	{
		path: "/:pathMatch(.*)*",
		name: "404",
		component: () => import("@/views/404"),
	},
];

routes = $globalRouterModules(routes); // 加载模块路由

const $globalRouter = createRouter({
	history: createWebHashHistory(),
	routes,
});

$globalExpandRouter($globalRouter, routes); // 添加路由扩展

export { $globalRouter };
