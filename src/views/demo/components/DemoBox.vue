<script setup lang="ts">
import { ref } from "vue";
import { Code, ChevronDown } from "lucide-vue-next";
import CodeBlock from "./CodeBlock.vue";

interface Props {
    /** 示例标题 */
    title: string;
    /** 示例描述 */
    description?: string;
    /** 代码内容 */
    code: string;
}

defineProps<Props>();

const showCode = ref(false);

const toggleCode = () => {
    showCode.value = !showCode.value;
};
</script>

<template>
    <div class="demo-box">
        <div class="demo-box-preview">
            <slot />
        </div>

        <div class="demo-box-info">
            <div class="demo-box-meta">
                <h4 class="demo-box-title">{{ title }}</h4>
                <p v-if="description" class="demo-box-desc">{{ description }}</p>
            </div>

            <button class="demo-box-toggle" @click="toggleCode">
                <Code class="w-4 h-4" />
                <span>{{ showCode ? "收起代码" : "显示代码" }}</span>
                <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': showCode }" />
            </button>
        </div>

        <div v-show="showCode" class="demo-box-code">
            <CodeBlock :code="code" language="vue" />
        </div>
    </div>
</template>

<style scoped>
.demo-box {
    border: 1px solid var(--vort-border-secondary);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: var(--demo-box-margin, 24px);
}

.demo-box-preview {
    padding: 40px 24px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    background: var(--vort-bg);
}

.demo-box-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-top: 1px solid var(--vort-border-secondary);
    background: var(--vort-bg-elevated);
}

.demo-box-meta {
    flex: 1;
}

.demo-box-title {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    color: var(--vort-text);
}

.demo-box-desc {
    margin: 4px 0 0;
    font-size: 13px;
    color: var(--vort-text-secondary);
}

.demo-box-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    font-size: 13px;
    color: var(--vort-text-secondary);
    background: transparent;
    border: 1px solid var(--vort-border);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.demo-box-code {
    border-top: 1px solid var(--vort-border-secondary);
}

.demo-box-code :deep(.code-block) {
    border: none;
    border-radius: 0;
}
</style>
