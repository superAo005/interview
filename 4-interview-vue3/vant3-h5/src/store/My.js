
import { getAddersslist, getAddressedit } from "@/api/My";

export default defineStore('useMy', {
	state: () => ({}),
	getters: {},
	actions: {
		async getAddersslist(params) {
			let url = $globalRequestUrl({
				url: getAddersslist,
			});

			try {
				const rep = await $globalRequest(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		async getAddressedit(params) {
			let url = $globalRequestUrl({
				url: getAddressedit,
			});

			try {
				const rep = await $globalRequest(url, params, { method: "POST" });
				return rep;
			} catch (error) {
				return error;
			}
		},
	},
});
