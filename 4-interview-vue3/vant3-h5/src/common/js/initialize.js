import { setGoodsNum, isObject } from "@/util/util"; // 导出工具类
import VueDompurifyHtml from "vue-dompurify-html"; // 替代v-html插件防止xss
import "virtual:windi.css"; // 导入windicss

// 进入应用查询购物车数量
const getGoodsnum = async () => {
	const res = await $globalStore.useCommon.getGoodsNum();
	if (res?.code === 20000) {
		setGoodsNum(res?.data || 0);
	}
};

// 远程国际化-会和本地国际化合并
const getLang = async () => {
	const res = await $globalStore.useCommon.getLang();
	if (res?.code === 20000) {
		if (isObject(res) && isObject(res?.data)) {
			Object.keys(res?.data).forEach((key) => {
				$globalLang.global.mergeLocaleMessage(key, res?.data[key]);
			});
		}
	}
};

const $globalReady = {
	install: (app) => {
		//初始化请求
		app.use($globalHttp());

		// 实例化pinia
		app.use(createPinia());
		app.use($globalRegisterStore);

		// 路由初始化
		app.use($globalRouter);

		// 初始化语言
		app.use($globalLang);

		// 全局挂载
		app.config.globalProperties.getGoodsnum = getGoodsnum;
		app.config.globalProperties.getLang = getLang;

		// 导入插件
		app.use(VueDompurifyHtml);
	},
};

export { $globalReady };
