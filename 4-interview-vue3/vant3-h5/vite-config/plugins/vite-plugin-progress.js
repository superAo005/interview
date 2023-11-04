import progress from "vite-plugin-progress"; // 打包显示进度条插件
const Progress = (viteEnv = {}) => {
	return progress();
};

export { Progress };
