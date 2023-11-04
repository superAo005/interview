
import { getCarousel, boutiqueGoods, recommendGoods } from "@/api/Home";

export default defineStore('useHome', {
	state: () => ({}),
	getters: {},
	actions: {
		async getCarousel(params) {
			let url = $globalRequestUrl({
				url: getCarousel,
			});

			try {
				const rep = await $globalRequest(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		async boutiqueGoods(params) {
			let url = $globalRequestUrl({
				url: boutiqueGoods,
			});

			try {
				const rep = await $globalRequest(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		async recommendGoods(params) {
			let url = $globalRequestUrl({
				url: recommendGoods,
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
