import { resolve, join, extname } from "path";
import fs from "fs";

// 加载插件模块
const loadPluginModules = async () => {
  return new Promise(async (success) => {
    const modulesPath = resolve(__dirname, "plugins");
    const fileNames = fs.readdirSync(modulesPath);
    let modulesImprot = [];
    fileNames.forEach(async (item) => {
      const filePath = join(modulesPath, item);
      if (
        fs.statSync(filePath).isFile() &&
        [".js"].includes(extname(filePath))
      ) {
        modulesImprot.push(import(`./vite-config/plugins/${item}`));
      }
    });

    const modules = await Promise.all(modulesImprot);
    success(modules);
  });
};

// 基本配置
const baseCfg = (viteEnv = {}) => {
  const { VITE_BASE_URL } = viteEnv;
  return {
    envDir: "vite-env",
    resolve: {
      alias: {
        "@": resolve("./src"),
      },
      extensions: [".js", ".mjs", ".vue", ".json", ".less", ".css"],
    },
    // server config
    server: {
      host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: 3301,
      open: false,
      cors: true,
      // https: false,
      // 代理跨域
      proxy: {
        "/app": {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/app/, ""),
        },
      },
    },
    // build configure
    build: {
      outDir: "dist",
      minify: "terser", // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
    },
  };
};

// 插件配置
const pluginCfg = async (viteEnv = {}) => {
  const modulesArr = [];
  const modules = await loadPluginModules();
  modules.forEach((item) => {
    const funcs = Object.values(item);
    funcs.forEach((it) => {
      modulesArr.push(it(viteEnv));
    });
  });
  return modulesArr;
};

export { baseCfg, pluginCfg };
