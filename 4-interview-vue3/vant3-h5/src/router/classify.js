const routes = [
	{
		path: "/classify",
		name: "Classify",
		component: () => import("@/views/Classify.vue"),
		meta: {
			isKeepAlive: true,
		},
	},
];

export { routes };
