import setupExtend from "vite-plugin-vue-setup-extend"; //组件命名插件
const vueSetupExtend = (viteEnv = {}) => {
	return setupExtend();
};

export { vueSetupExtend };
