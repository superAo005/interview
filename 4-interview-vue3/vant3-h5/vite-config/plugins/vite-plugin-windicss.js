import windiCSS from "vite-plugin-windicss"; // 导入windicss

const WindiCSS = (viteEnv = {}) => {
	return windiCSS();
};

export { WindiCSS };
