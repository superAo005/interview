const routes = [
	{
		path: "/shop",
		name: "Shop",
		component: () => import("@/views/Shop.vue"),
		meta: {
			isKeepAlive: true,
		},
	},
];

export { routes };
