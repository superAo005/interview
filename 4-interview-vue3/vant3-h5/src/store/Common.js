
import { getLang, getGoodsNum, getGoodsdetal } from "@/api/common";

export default defineStore('useCommon', {
	state: () => ({
		subMsgKey: "", // 定义通知(由于路由不再支持parmas传参丢失)
		goods_card_num: 0,
		is_reload_card: false,
	}),
	getters: {},
	actions: {
		// 设置缓存页面通知事件标识
		SET_SUB_MSG_KEY(data) {
			this.subMsgKey = data;
		},
		// 设置购物车数量
		SET_GOODS_NUM(data) {
			this.goods_card_num = data;
		},
		// 是否重新加载购物车
		SET_RELAOD_SHOP(data) {
			this.is_reload_card = data;
		},
		// 获取多语言数据
		async getLang(params) {
			let url = $globalRequestUrl({
				url: getLang,
			});

			try {
				const rep = await $globalRequest(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		// 获取购物车数量
		async getGoodsNum(params) {
			let url = $globalRequestUrl({
				url: getGoodsNum,
			});

			try {
				const rep = await $globalRequest(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		// 获取商品详情
		async getGoodsdetal(params) {
			let url = $globalRequestUrl({
				url: getGoodsdetal,
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
