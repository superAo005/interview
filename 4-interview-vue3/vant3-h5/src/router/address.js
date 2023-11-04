const routes = [
	{
		path: "/setting",
		name: "setting",
		component: () => import("@/views/common/setting.vue"),
		meta: {},
	},
	{
		path: "/addressList",
		name: "addressList",
		component: () => import("@/views/common/addressList.vue"),
		meta: {
			isKeepAlive: true,
		},
	},
	{
		path: "/addressEdit",
		name: "addressEdit",
		component: () => import("@/views/common/addressEdit.vue"),
		meta: {},
	},
];

export { routes };
