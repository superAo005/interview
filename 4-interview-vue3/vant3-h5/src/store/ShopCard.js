import { getCard, changeGoods, delGoods } from "@/api/ShopCard";

export default defineStore("useShopCard", {
  state: () => ({}),
  getters: {},
  actions: {
    async getCard(params) {
      let url = $globalRequestUrl({
        url: getCard,
      });

      try {
        const rep = await $globalRequest(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },

    async delGoods(params) {
      let url = $globalRequestUrl({
        url: delGoods,
      });

      try {
        const rep = await $globalRequest(url, params, { method: "POST" });
        return rep;
      } catch (error) {
        return error;
      }
    },

    async changeGoods(params) {
      let url = $globalRequestUrl({
        url: changeGoods,
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
