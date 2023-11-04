import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { baseCfg, pluginCfg } from "./vite-config";
export default async ({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, process.cwd());
  return defineConfig({
    ...baseCfg({ VITE_BASE_URL }),
    plugins: [vue(), ...(await pluginCfg({ VITE_BASE_URL }))],
  });
};
