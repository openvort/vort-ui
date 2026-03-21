import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { VortResolver } from "./src/components/vort/resolver";

export default defineConfig({
  plugins: [
    vue(),
    // Vort UI 组件自动导入
    Components({
      // 禁用目录扫描，只使用自定义解析器
      dirs: [],
      resolvers: [VortResolver()],
      // 生成类型声明文件
      dts: "src/components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
