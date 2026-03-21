<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { Spin } from "@/components/vort";

// 包裹模式的loading状态
const loading = ref(true);
const showFullscreen = ref(false);
const delayLoading = ref(false);

const toggleLoading = () => {
    loading.value = !loading.value;
};

const showFullscreenSpin = () => {
    showFullscreen.value = true;
    setTimeout(() => {
        showFullscreen.value = false;
    }, 3000);
};

const toggleDelayLoading = () => {
    delayLoading.value = !delayLoading.value;
};

// 示例代码
const basicCode = `<template>
  <Spin />
</template>`;

const sizeCode = `<template>
  <Spin size="small" />
  <Spin />
  <Spin size="large" />
</template>`;

const indicatorCode = `<template>
  <!-- 默认：四点旋转 -->
  <Spin indicator="dots" />

  <!-- 半圆旋转 -->
  <Spin indicator="spinner" />
</template>`;

const nestedCode = `<script setup>
const loading = ref(true);
<\/script>

<template>
  <Spin :spinning="loading">
    <div class="p-6 bg-gray-50 rounded">
      这里是被包裹的内容区域
    </div>
  </Spin>
  <vort-button @click="loading = !loading">切换</vort-button>
</template>`;

const tipCode = `<template>
  <Spin :spinning="true" tip="加载中...">
    <div class="p-6 bg-gray-50 rounded">
      这里是被包裹的内容区域
    </div>
  </Spin>
</template>`;

const delayCode = `<script setup>
const loading = ref(false);
<\/script>

<template>
  <!-- 延迟 500ms 显示，防止闪烁 -->
  <Spin :spinning="loading" :delay="500">
    <div class="p-6 bg-gray-50 rounded">
      内容区域
    </div>
  </Spin>
  <vort-button @click="loading = !loading">切换</vort-button>
</template>`;

const fullscreenCode = `<script setup>
const showFullscreen = ref(false);

const showFullscreenSpin = () => {
  showFullscreen.value = true;
  setTimeout(() => {
    showFullscreen.value = false;
  }, 3000);
};
<\/script>

<template>
  <vort-button @click="showFullscreenSpin">显示全屏加载</vort-button>
  <Spin :spinning="showFullscreen" fullscreen tip="全屏加载中..." />
</template>`;

const customIndicatorCode = `<template>
  <Spin>
    <template #indicator>
      <div class="custom-indicator">🔄</div>
    </template>
  </Spin>
</template>

<style>
.custom-indicator {
  font-size: 24px;
  animation: custom-spin 1s linear infinite;
}
@keyframes custom-spin {
  to { transform: rotate(360deg); }
}
</style>`;

// Props 表格数据
const propsData = [
    {
        prop: "spinning",
        desc: "是否为加载中状态",
        type: "boolean",
        default: "true"
    },
    {
        prop: "size",
        desc: "组件大小",
        type: "'large' | 'default' | 'small'",
        default: "'default'"
    },
    {
        prop: "indicator",
        desc: "指示器样式",
        type: "'dots' | 'spinner'",
        default: "'dots'"
    },
    {
        prop: "tip",
        desc: "自定义描述文案（作为包裹元素时有效）",
        type: "string",
        default: "-"
    },
    {
        prop: "delay",
        desc: "延迟显示加载效果的时间（防止闪烁），单位毫秒",
        type: "number",
        default: "0"
    },
    {
        prop: "fullscreen",
        desc: "是否全屏显示",
        type: "boolean",
        default: "false"
    }
];

// Slots 表格数据
const slotsData = [
    {
        slot: "default",
        desc: "被包裹的内容"
    },
    {
        slot: "tip",
        desc: "自定义提示文案"
    },
    {
        slot: "indicator",
        desc: "自定义加载指示器"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Spin 加载中</h1>
            <p class="demo-page-desc">用于页面和区块的加载中状态。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <p class="demo-section-desc">页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。</p>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本用法" description="一个简单的 loading 状态。" :code="basicCode">
                    <Spin />
                </DemoBox>

                <DemoBox title="各种大小" description="小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。" :code="sizeCode">
                    <div class="flex items-center gap-8">
                        <Spin size="small" />
                        <Spin />
                        <Spin size="large" />
                    </div>
                </DemoBox>

                <DemoBox title="指示器样式" description="支持两种指示器样式：dots（四点旋转，默认阿里风格）和 spinner（半圆旋转）。" :code="indicatorCode">
                    <div class="flex items-center gap-12">
                        <div class="text-center">
                            <Spin indicator="dots" />
                            <p class="mt-3 text-sm text-gray-500">四点旋转（默认）</p>
                        </div>
                        <div class="text-center">
                            <Spin indicator="spinner" />
                            <p class="mt-3 text-sm text-gray-500">半圆旋转</p>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="各种尺寸的指示器" description="两种指示器样式在不同尺寸下的表现。" :code="indicatorCode">
                    <div class="flex flex-col gap-8">
                        <div>
                            <p class="mb-3 text-sm font-medium text-gray-600">四点旋转（Dots）</p>
                            <div class="flex items-center gap-8">
                                <Spin size="small" indicator="dots" />
                                <Spin indicator="dots" />
                                <Spin size="large" indicator="dots" />
                            </div>
                        </div>
                        <div>
                            <p class="mb-3 text-sm font-medium text-gray-600">半圆旋转（Spinner）</p>
                            <div class="flex items-center gap-8">
                                <Spin size="small" indicator="spinner" />
                                <Spin indicator="spinner" />
                                <Spin size="large" indicator="spinner" />
                            </div>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="卡片加载中" description="可以直接把内容内嵌到 Spin 中，将现有容器变为加载状态。" :code="nestedCode">
                    <div class="space-y-4">
                        <Spin :spinning="loading" indicator="dots">
                            <div class="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 class="text-base font-medium mb-2">卡片标题</h3>
                                <p class="text-gray-500 text-sm">这里是卡片内容，可以包含任意元素。当 spinning 为 true 时，会显示加载遮罩。</p>
                            </div>
                        </Spin>
                        <vort-button @click="toggleLoading">
                            {{ loading ? "停止加载" : "开始加载" }}
                        </vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="自定义描述文案" description="在包裹模式下，可以自定义描述文案。" :code="tipCode">
                    <Spin :spinning="true" tip="数据加载中，请稍候...">
                        <div class="p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 class="text-base font-medium mb-2">数据列表</h3>
                            <p class="text-gray-500 text-sm">这里是数据列表内容。</p>
                        </div>
                    </Spin>
                </DemoBox>

                <DemoBox
                    title="延迟显示"
                    description="延迟显示 loading 效果。当 spinning 状态在 delay 时间内结束，则不显示 loading 状态。可用于防止页面闪烁。"
                    :code="delayCode"
                >
                    <div class="space-y-4">
                        <Spin :spinning="delayLoading" :delay="500" tip="延迟500ms后显示...">
                            <div class="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <p class="text-gray-500 text-sm">延迟 500ms 显示加载状态，防止闪烁。</p>
                            </div>
                        </Spin>
                        <vort-button @click="toggleDelayLoading">
                            {{ delayLoading ? "停止加载" : "开始加载（延迟500ms显示）" }}
                        </vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="全屏加载" description="全屏模式下的加载效果，常用于页面初始化或重要操作。" :code="fullscreenCode">
                    <vort-button variant="primary" @click="showFullscreenSpin"> 显示全屏加载（3秒后自动关闭） </vort-button>
                    <Spin :spinning="showFullscreen" fullscreen tip="全屏加载中..." size="large" />
                </DemoBox>

                <DemoBox title="自定义指示器" description="通过 indicator 插槽自定义加载指示器。" :code="customIndicatorCode">
                    <Spin>
                        <template #indicator>
                            <div class="custom-emoji-indicator">🔄</div>
                        </template>
                    </Spin>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Props</h3>
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
                    <tr v-for="item in propsData" :key="item.prop">
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

            <h3 class="demo-api-title">Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in slotsData" :key="item.slot">
                        <td>
                            <code>{{ item.slot }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* 自定义 emoji 指示器动画 - 特有样式 */
.custom-emoji-indicator {
    font-size: 24px;
    animation: custom-emoji-spin 1s linear infinite;
}

@keyframes custom-emoji-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
