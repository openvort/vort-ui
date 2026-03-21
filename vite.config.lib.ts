import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const externalPackages = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]);

const isExternal = (id: string) => {
  return [...externalPackages].some((dep) => id === dep || id.startsWith(`${dep}/`));
};

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["src/components/vort/**/*.ts", "src/components/vort/**/*.vue"],
      exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
      outDir: "dist",
      rollupTypes: true,
    }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "src/components/vort/index.ts"),
      formats: ["es"],
      fileName: (format) => `vort-ui.${format}.js`,
    },

    rollupOptions: {
      // 仅打包组件库自身代码，第三方依赖交给使用方安装与解析
      external: isExternal,
      output: {
        assetFileNames: (assetInfo) => {
          // 将 CSS 文件统一命名为 style.css
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "style.css";
          }
          return assetInfo.name || "assets/[name].[ext]";
        },
      },
    },

    outDir: "dist",
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
