<script setup lang="ts">
import { ref, computed } from "vue";
import { Copy, Check } from "lucide-vue-next";

interface Props {
    /** 代码内容 */
    code: string;
    /** 代码语言 */
    language?: string;
}

const props = withDefaults(defineProps<Props>(), {
    language: "vue"
});

const copied = ref(false);

const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    let ok = false;
    try {
        ok = document.execCommand("copy");
    } finally {
        document.body.removeChild(textarea);
    }
    return ok;
};

const copyText = async (text: string) => {
    // Clipboard API 在某些浏览器/权限/非安全上下文下会失败，这里做兜底
    if (navigator.clipboard?.writeText && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // ignore, fallback below
        }
    }
    return fallbackCopy(text);
};

const copyCode = async () => {
    try {
        const ok = await copyText(formattedCode.value ?? "");
        if (!ok) {
            throw new Error("copy failed");
        }
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error("复制失败:", err);
    }
};

const formattedCode = computed(() => {
    return props.code?.trim() ?? "";
});
</script>

<template>
    <div class="code-block">
        <div class="code-block-header">
            <span class="code-block-lang">{{ language }}</span>
            <button class="code-block-copy" @click="copyCode" :title="copied ? '已复制' : '复制代码'">
                <Check v-if="copied" class="w-4 h-4 text-[var(--vort-success)]" />
                <Copy v-else class="w-4 h-4" />
            </button>
        </div>
        <pre class="code-block-content"><code>{{ formattedCode }}</code></pre>
    </div>
</template>

<style scoped>
.code-block {
    border: 1px solid var(--vort-border-secondary);
    border-radius: 8px;
    overflow: hidden;
    background: #fafafa;
}

.code-block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background: var(--vort-border-secondary);
    border-bottom: 1px solid var(--vort-border-secondary);
}

.code-block-lang {
    font-size: 12px;
    color: var(--vort-text-tertiary);
    text-transform: uppercase;
}

.code-block-copy {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--vort-text-tertiary);
    transition: all 0.2s;
}

.code-block-copy:hover {
    background: rgba(0, 0, 0, 0.06);
    color: var(--vort-text);
}

.code-block-content {
    margin: 0;
    padding: 16px;
    overflow-x: auto;
    font-family: "SF Mono", "Fira Code", "Consolas", monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #383a42;
}

.code-block-content code {
    font-family: inherit;
}
</style>
