import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const distRoot = fileURLToPath(new URL("../dist", import.meta.url));

async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
        const filePath = join(directory, entry.name);
        if (entry.isDirectory()) {
            await walk(filePath);
            continue;
        }
        if (!entry.name.endsWith(".d.ts")) continue;

        const source = await readFile(filePath, "utf8");
        // vue-tsc 在带事件载荷的 emits 重载中可能生成重复的参数名，
        // 例如 `(event: "input", event: Event)`，严格消费者会将其判为非法声明。
        const cleaned = source
            .replace(/^\s*import\s+["'][^"']+\.css["'];?\s*$/gm, "")
            .replace(/\(event:\s*("[^"]+"|'[^']+'|[^,()]+),\s*event:/g, "(event: $1, payload:");
        if (cleaned !== source) {
            await writeFile(filePath, cleaned);
        }
    }
}

await walk(distRoot);
