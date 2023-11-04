import { classifyGoods, getClassify } from "@/api/Classify";

export default defineStore("useClassify", {
	state: () => ({}),
	getters: {},
	actions: {
		async classifyGoods(params) {
			let url = $globalRequestUrl({
				url: classifyGoods,
			});

			try {
				const rep = await $globalRequest(url, params, { method: "POST" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		async getClassify(params) {
			let url = $globalRequestUrl({
				url: getClassify,
			});

			try {
				const rep = await $globalRequest(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
	},
});
