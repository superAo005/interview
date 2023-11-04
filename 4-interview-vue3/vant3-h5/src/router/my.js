const routes = [
	{
		path: "/my",
		name: "My",
		component: () => import("@/views/My.vue"),
		meta: {
			isKeepAlive: true,
		},
	},
];

export { routes };
