import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const packageRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    build: {
        lib: {
            entry: resolve(packageRoot, "src/resolver.ts"),
            formats: ["es"],
            fileName: () => "resolver.js"
        },
        outDir: "dist",
        emptyOutDir: false,
        sourcemap: false
    }
});
