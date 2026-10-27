import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const packageRoot = fileURLToPath(new URL(".", import.meta.url));
const sourceRoot = resolve(packageRoot, "src");

const externalPackages = ["vue", "@tanstack/vue-virtual", "@vee-validate/zod", "vee-validate", "zod"];

const isExternal = (id: string) => externalPackages.some((dependency) => id === dependency || id.startsWith(`${dependency}/`));

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": sourceRoot
        }
    },
    build: {
        lib: {
            entry: resolve(sourceRoot, "index.ts"),
            formats: ["es"],
            fileName: () => "vort-ui.es.js"
        },
        rollupOptions: {
            external: isExternal,
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith(".css")) return "style.css";
                    return assetInfo.name || "assets/[name].[ext]";
                }
            }
        },
        outDir: "dist",
        emptyOutDir: true,
        cssCodeSplit: false,
        sourcemap: false
    }
});
