import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VortResolver } from "@openvort/vort-ui/resolver";
import { searchIndexPlugin } from "./vite-plugin-search-index";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const docsRoot = fileURLToPath(new URL(".", import.meta.url));
const docsBase = process.env.VITE_DOCS_BASE ?? "/components/";

export default defineConfig(({ command }) => ({
    root: docsRoot,
    base: docsBase,
    plugins: [
        vue(),
        searchIndexPlugin(),
        Components({
            dirs: [],
            resolvers: [VortResolver()],
            // 开发时维护声明；正式构建不得改写固定源提交中的受管理文件。
            dts: command === "serve" ? resolve(docsRoot, "src/components.d.ts") : false
        })
    ],
    resolve: {
        alias: {
            "@docs": resolve(docsRoot, "src")
        },
        dedupe: ["vue"]
    },
    optimizeDeps: {
        exclude: ["@openvort/vort-ui"]
    },
    server: {
        port: 4173,
        strictPort: true,
        host: true
    },
    build: {
        outDir: resolve(packageRoot, "docs-dist"),
        emptyOutDir: true,
        sourcemap: false,
        // 文档站把组件源码集中到一个 chunk，避免按路由拆分时形成循环 barrel 依赖。
        chunkSizeWarningLimit: 700,
        rollupOptions: {
            output: {
                // 组件源码内部存在 barrel re-export；统一放入一个 chunk，避免 Demo 路由拆分后出现循环 chunk 依赖。
                manualChunks(id) {
                    return id.startsWith(resolve(packageRoot, "src")) ? "vort-ui" : undefined;
                }
            }
        }
    }
}));
