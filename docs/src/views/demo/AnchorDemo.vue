<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 当前锚点
const currentAnchor = ref("");

// 示例代码
const basicCode = `<template>
    <vort-anchor @change="onChange">
        <vort-anchor-link href="#basic" title="基本用法" />
        <vort-anchor-link href="#horizontal" title="水平方向" />
        <vort-anchor-link href="#underline" title="下划线类型" />
        <vort-anchor-link href="#nested" title="嵌套链接" />
        <vort-anchor-link href="#api" title="API" />
    </vort-anchor>
</template>

<script setup>
const onChange = (href, prevHref) => {
    console.log('当前锚点:', href, '上一个:', prevHref);
};
<\/script>`;

const horizontalCode = `<template>
    <vort-anchor direction="horizontal">
        <vort-anchor-link href="#basic" title="基本用法" />
        <vort-anchor-link href="#horizontal" title="水平方向" />
        <vort-anchor-link href="#underline" title="下划线类型" />
        <vort-anchor-link href="#nested" title="嵌套链接" />
    </vort-anchor>
</template>`;

const underlineCode = `<template>
    <vort-anchor type="underline" direction="horizontal">
        <vort-anchor-link href="#basic" title="基本用法" />
        <vort-anchor-link href="#horizontal" title="水平方向" />
        <vort-anchor-link href="#underline" title="下划线类型" />
        <vort-anchor-link href="#nested" title="嵌套链接" />
    </vort-anchor>
</template>`;

const nestedCode = `<template>
    <vort-anchor>
        <vort-anchor-link href="#basic" title="代码演示">
            <template #sub-link>
                <vort-anchor-link href="#horizontal" title="水平方向" />
                <vort-anchor-link href="#underline" title="下划线类型" />
                <vort-anchor-link href="#nested" title="嵌套链接" />
            </template>
        </vort-anchor-link>
        <vort-anchor-link href="#api" title="API">
            <template #sub-link>
                <vort-anchor-link href="#anchor-props" title="Anchor Props" />
                <vort-anchor-link href="#anchorlink-props" title="AnchorLink Props" />
            </template>
        </vort-anchor-link>
    </vort-anchor>
</template>`;

const containerCode = `<template>
    <div class="demo-anchor-container-wrapper">
        <vort-anchor container=".demo-scroll-box" :offset="10">
            <vort-anchor-link href="#scroll-item-1" title="第一项" />
            <vort-anchor-link href="#scroll-item-2" title="第二项" />
            <vort-anchor-link href="#scroll-item-3" title="第三项" />
        </vort-anchor>
        <div class="demo-scroll-box">
            <div id="scroll-item-1">第一项内容</div>
            <div id="scroll-item-2">第二项内容</div>
            <div id="scroll-item-3">第三项内容</div>
        </div>
    </div>
</template>`;

const staticCode = `<template>
    <vort-anchor :marker="false">
        <vort-anchor-link href="#basic" title="基本用法" />
        <vort-anchor-link href="#horizontal" title="水平方向" />
        <vort-anchor-link href="#underline" title="下划线类型" />
    </vort-anchor>
</template>`;

// Props 表格数据
const anchorPropsData = [
    { prop: "container", desc: "滚动容器，CSS 选择器或 HTMLElement", type: "string | HTMLElement", default: "window" },
    { prop: "offset", desc: "设置锚点滚动的偏移量", type: "number", default: "0" },
    { prop: "bound", desc: "触发锚点的元素边界值", type: "number", default: "15" },
    { prop: "duration", desc: "容器滚动持续时间（毫秒）", type: "number", default: "300" },
    { prop: "marker", desc: "是否显示标记", type: "boolean", default: "true" },
    { prop: "type", desc: "锚点类型", type: "'default' | 'underline'", default: "'default'" },
    { prop: "direction", desc: "锚点方向", type: "'vertical' | 'horizontal'", default: "'vertical'" }
];

const linkPropsData = [
    { prop: "title", desc: "锚点链接标题", type: "string", default: "-" },
    { prop: "href", desc: "锚点链接地址（必填）", type: "string", default: "-" }
];

// Events 表格数据
const anchorEventsData = [
    { event: "change", desc: "锚点链接变化时触发", params: "(href: string, prevHref: string) => void" },
    { event: "click", desc: "点击锚点链接时触发", params: "(e: MouseEvent, href: string) => void" }
];

// Slots 表格数据
const anchorSlotsData = [{ slot: "default", desc: "锚点链接内容，通常是 AnchorLink 组件" }];

const linkSlotsData = [
    { slot: "default", desc: "自定义链接内容，默认显示 title" },
    { slot: "sub-link", desc: "子链接插槽" }
];

// Exposes 表格数据
const exposesData = [{ method: "scrollTo", desc: "手动滚动到指定锚点", params: "(href: string) => void" }];

// 处理锚点变化
const handleAnchorChange = (href: string, prevHref: string) => {
    currentAnchor.value = href;
    console.log("锚点变化:", href, "上一个:", prevHref);
};
</script>

<template>
    <div class="demo-page">
        <!-- 页面头部 -->
        <header class="demo-page-header">
            <h1 class="demo-page-title">Anchor 锚点</h1>
            <p class="demo-page-desc">用于跳转到页面指定位置的导航组件。</p>
        </header>

        <!-- 何时使用 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>需要展示当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。</li>
                <li>适用于单页应用的导航、文档目录、长页面的快速定位等场景。</li>
            </ul>
        </section>

        <!-- 代码演示 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基本用法 -->
                <DemoBox id="basic" title="基本用法" description="最简单的用法，用于页面内锚点跳转。" :code="basicCode">
                    <div class="demo-anchor-wrapper">
                        <vort-anchor @change="handleAnchorChange">
                            <vort-anchor-link href="#basic" title="基本用法" />
                            <vort-anchor-link href="#horizontal" title="水平方向" />
                            <vort-anchor-link href="#underline" title="下划线类型" />
                            <vort-anchor-link href="#nested" title="嵌套链接" />
                            <vort-anchor-link href="#api" title="API" />
                        </vort-anchor>
                        <p v-if="currentAnchor" class="demo-anchor-current">
                            当前锚点: <code>{{ currentAnchor }}</code>
                        </p>
                    </div>
                </DemoBox>

                <!-- 水平方向 -->
                <DemoBox id="horizontal" title="水平方向" description="设置 direction='horizontal' 可以使锚点导航水平排列。" :code="horizontalCode">
                    <vort-anchor direction="horizontal" @change="handleAnchorChange">
                        <vort-anchor-link href="#basic" title="基本用法" />
                        <vort-anchor-link href="#horizontal" title="水平方向" />
                        <vort-anchor-link href="#underline" title="下划线类型" />
                        <vort-anchor-link href="#nested" title="嵌套链接" />
                    </vort-anchor>
                </DemoBox>

                <!-- 下划线类型 -->
                <DemoBox id="underline" title="下划线类型" description="设置 type='underline' 可以使用下划线样式，适合作为页面标签导航。" :code="underlineCode">
                    <vort-anchor type="underline" direction="horizontal" @change="handleAnchorChange">
                        <vort-anchor-link href="#basic" title="基本用法" />
                        <vort-anchor-link href="#horizontal" title="水平方向" />
                        <vort-anchor-link href="#underline" title="下划线类型" />
                        <vort-anchor-link href="#nested" title="嵌套链接" />
                    </vort-anchor>
                </DemoBox>

                <!-- 嵌套链接 -->
                <DemoBox id="nested" title="嵌套链接" description="使用 sub-link 插槽可以嵌套子链接。" :code="nestedCode">
                    <vort-anchor @change="handleAnchorChange">
                        <vort-anchor-link href="#basic" title="代码演示">
                            <template #sub-link>
                                <vort-anchor-link href="#horizontal" title="水平方向" />
                                <vort-anchor-link href="#underline" title="下划线类型" />
                                <vort-anchor-link href="#nested" title="嵌套链接" />
                            </template>
                        </vort-anchor-link>
                        <vort-anchor-link href="#api" title="API">
                            <template #sub-link>
                                <vort-anchor-link href="#anchor-props" title="Anchor Props" />
                                <vort-anchor-link href="#anchorlink-props" title="AnchorLink Props" />
                            </template>
                        </vort-anchor-link>
                    </vort-anchor>
                </DemoBox>

                <!-- 静态锚点 -->
                <DemoBox id="static" title="静态锚点" description="设置 marker=false 可以隐藏标记线。" :code="staticCode">
                    <vort-anchor :marker="false" @change="handleAnchorChange">
                        <vort-anchor-link href="#basic" title="基本用法" />
                        <vort-anchor-link href="#horizontal" title="水平方向" />
                        <vort-anchor-link href="#underline" title="下划线类型" />
                    </vort-anchor>
                </DemoBox>

                <!-- 指定容器 -->
                <DemoBox title="指定容器" description="通过 container 属性可以指定滚动容器。" :code="containerCode">
                    <div class="demo-anchor-container-wrapper">
                        <vort-anchor container=".demo-scroll-box" :offset="10">
                            <vort-anchor-link href="#scroll-item-1" title="第一项" />
                            <vort-anchor-link href="#scroll-item-2" title="第二项" />
                            <vort-anchor-link href="#scroll-item-3" title="第三项" />
                        </vort-anchor>
                        <div class="demo-scroll-box">
                            <div id="scroll-item-1" class="demo-scroll-item">
                                <h4>第一项</h4>
                                <p>这是第一项的内容，滚动此容器可以看到锚点高亮变化。</p>
                            </div>
                            <div id="scroll-item-2" class="demo-scroll-item">
                                <h4>第二项</h4>
                                <p>这是第二项的内容，滚动此容器可以看到锚点高亮变化。</p>
                            </div>
                            <div id="scroll-item-3" class="demo-scroll-item">
                                <h4>第三项</h4>
                                <p>这是第三项的内容，滚动此容器可以看到锚点高亮变化。</p>
                            </div>
                        </div>
                    </div>
                </DemoBox>
            </div>
        </section>

        <!-- API 文档 -->
        <section id="api" class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 id="anchor-props" class="demo-api-title">Anchor Props</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>属性</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in anchorPropsData" :key="item.prop">
                        <td>
                            <code>{{ item.prop }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.type }}</code>
                        </td>
                        <td>
                            <code>{{ item.default }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 id="anchorlink-props" class="demo-api-title">AnchorLink Props</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>属性</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in linkPropsData" :key="item.prop">
                        <td>
                            <code>{{ item.prop }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.type }}</code>
                        </td>
                        <td>
                            <code>{{ item.default }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Anchor Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in anchorEventsData" :key="item.event">
                        <td>
                            <code>{{ item.event }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.params }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Anchor Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in anchorSlotsData" :key="item.slot">
                        <td>
                            <code>{{ item.slot }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">AnchorLink Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in linkSlotsData" :key="item.slot">
                        <td>
                            <code>{{ item.slot }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Anchor Exposes</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>方法名</th>
                        <th>说明</th>
                        <th>参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in exposesData" :key="item.method">
                        <td>
                            <code>{{ item.method }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.params }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* Anchor Demo 特定样式 */
.demo-anchor-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.demo-anchor-current {
    margin: 0;
    font-size: 14px;
    color: var(--vort-text-secondary);
}

.demo-anchor-current code {
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    font-family: "SF Mono", "Fira Code", "Consolas", monospace;
}

/* 指定容器示例 */
.demo-anchor-container-wrapper {
    display: flex;
    gap: 24px;
}

.demo-scroll-box {
    flex: 1;
    height: 200px;
    overflow-y: auto;
    border: 1px solid var(--vort-border-secondary);
    border-radius: 8px;
    padding: 16px;
}

.demo-scroll-item {
    padding: 24px 0;
    border-bottom: 1px solid var(--vort-border-secondary);
    min-height: 150px;
}

.demo-scroll-item:last-child {
    border-bottom: none;
}

.demo-scroll-item h4 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 500;
    color: var(--vort-text);
}

.demo-scroll-item p {
    margin: 0;
    font-size: 14px;
    color: var(--vort-text-secondary);
}
</style>
