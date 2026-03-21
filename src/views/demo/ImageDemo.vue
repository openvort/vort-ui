<script setup lang="ts">
import DemoBox from "./components/DemoBox.vue";

// 示例图片
const sampleImages = {
    landscape: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    portrait: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
    square: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop",
    broken: "https://invalid-url.example.com/image.png"
};

// 示例代码
const basicCode = `<template>
  <vort-image
    src="https://example.com/image.jpg"
    alt="示例图片"
    :width="200"
    :height="200"
  />
</template>`;

const previewCode = `<template>
  <!-- 默认支持预览 -->
  <vort-image
    src="https://example.com/image.jpg"
    alt="点击预览"
    :width="200"
    :height="150"
  />

  <!-- 禁用预览 -->
  <vort-image
    src="https://example.com/image.jpg"
    alt="不可预览"
    :width="200"
    :height="150"
    :preview="false"
  />
</template>`;

const fallbackCode = `<template>
  <vort-image
    src="https://invalid-url.com/broken.jpg"
    fallback="https://via.placeholder.com/200x150?text=Error"
    alt="加载失败"
    :width="200"
    :height="150"
  />
</template>`;

const multipleCode = `<template>
  <!-- 使用 ImagePreviewGroup 包裹，支持预览时左右切换 -->
  <vort-image-preview-group>
    <div class="image-gallery">
      <vort-image
        v-for="img in images"
        :key="img.src"
        :src="img.src"
        :alt="img.alt"
        :width="150"
        :height="150"
      />
    </div>
  </vort-image-preview-group>
</template>

<script setup>
const images = [
  { src: '...', alt: '图片1' },
  { src: '...', alt: '图片2' },
  { src: '...', alt: '图片3' },
];
<\/script>`;

// Props 表格数据
const propsData = [
    {
        prop: "src",
        desc: "图片地址",
        type: "string",
        default: "-"
    },
    {
        prop: "alt",
        desc: "替代文本",
        type: "string",
        default: "-"
    },
    {
        prop: "width",
        desc: "图片宽度",
        type: "number | string",
        default: "-"
    },
    {
        prop: "height",
        desc: "图片高度",
        type: "number | string",
        default: "-"
    },
    {
        prop: "preview",
        desc: "是否支持预览",
        type: "boolean | PreviewConfig",
        default: "true"
    },
    {
        prop: "fallback",
        desc: "加载失败时显示的图片",
        type: "string",
        default: "-"
    },
    {
        prop: "placeholder",
        desc: "是否显示加载占位",
        type: "boolean",
        default: "true"
    },
    {
        prop: "maskClosable",
        desc: "点击遮罩是否可关闭预览",
        type: "boolean",
        default: "true"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "load",
        desc: "图片加载完成时触发",
        params: "(event: Event) => void"
    },
    {
        event: "error",
        desc: "图片加载失败时触发",
        params: "(event: Event) => void"
    },
    {
        event: "previewVisibleChange",
        desc: "预览弹层显示/隐藏时触发",
        params: "(visible: boolean) => void"
    }
];

// 预览操作说明
const operationsData = [
    { icon: "⬅️", desc: "上一张 (或按 ←)" },
    { icon: "➡️", desc: "下一张 (或按 →)" },
    { icon: "🔍+", desc: "放大" },
    { icon: "🔍-", desc: "缩小" },
    { icon: "⤵️", desc: "旋转" },
    { icon: "⬜", desc: "重置为 1:1" },
    { icon: "⬇️", desc: "下载" },
    { icon: "✕", desc: "关闭 (或按 ESC)" }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Image 图片</h1>
            <p class="demo-page-desc">
                可预览的图片组件。
                <strong>特色：从点击位置缩放展开/收起的动画效果，支持放大、缩小、旋转、拖拽等操作。</strong>
            </p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>需要展示图片时。</li>
                <li>需要图片预览功能时。</li>
                <li>需要图片加载失败兜底时。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本用法" description="最简单的用法。点击图片可预览大图。" :code="basicCode">
                    <div class="demo-image-row">
                        <vort-image :src="sampleImages.landscape" alt="风景图片" :width="200" :height="150" />
                    </div>
                </DemoBox>

                <DemoBox
                    title="图片预览"
                    description="默认支持图片预览。点击图片会以动画效果打开预览弹层。在预览弹层中可以：滚轮缩放、拖拽移动、旋转、下载等。点击遮罩或按 ESC 可关闭。"
                    :code="previewCode"
                >
                    <div class="demo-image-row">
                        <div class="demo-image-item">
                            <p class="demo-image-label">点击预览（默认）</p>
                            <vort-image :src="sampleImages.portrait" alt="人像图片" :width="150" :height="200" />
                        </div>
                        <div class="demo-image-item">
                            <p class="demo-image-label">禁用预览</p>
                            <vort-image :src="sampleImages.square" alt="方形图片" :width="150" :height="150" :preview="false" />
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="加载失败" description="图片加载失败时显示错误占位图。可通过 fallback 属性设置备用图片。" :code="fallbackCode">
                    <div class="demo-image-row">
                        <div class="demo-image-item">
                            <p class="demo-image-label">加载失败（错误占位）</p>
                            <vort-image :src="sampleImages.broken" alt="加载失败" :width="150" :height="150" />
                        </div>
                    </div>
                </DemoBox>

                <DemoBox
                    title="多图预览组"
                    description="使用 ImagePreviewGroup 包裹多张图片，支持预览时左右切换。可使用键盘左右箭头切换图片。"
                    :code="multipleCode"
                >
                    <vort-image-preview-group>
                        <div class="demo-image-gallery">
                            <vort-image :src="sampleImages.landscape" alt="风景图片" :width="150" :height="100" />
                            <vort-image :src="sampleImages.portrait" alt="人像图片" :width="100" :height="150" />
                            <vort-image :src="sampleImages.square" alt="方形图片" :width="120" :height="120" />
                        </div>
                    </vort-image-preview-group>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">预览操作</h2>
            <p class="demo-section-desc">图片预览时支持以下操作：</p>
            <div class="demo-operations-list">
                <div v-for="op in operationsData" :key="op.desc" class="demo-operation-item">
                    <span class="demo-operation-icon">{{ op.icon }}</span>
                    <span class="demo-operation-desc">{{ op.desc }}</span>
                </div>
            </div>
            <p class="demo-section-note">💡 提示：在预览弹层中可以使用鼠标滚轮缩放图片，拖拽移动图片位置。</p>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Image Props</h3>
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

            <h3 class="demo-api-title">Image Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in eventsData" :key="item.event">
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

            <h3 class="demo-api-title">ImagePreviewGroup Props</h3>
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
                    <tr>
                        <td><code>maskClosable</code></td>
                        <td>点击遮罩是否可关闭预览</td>
                        <td><code>boolean</code></td>
                        <td><code>true</code></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* 特有样式 */
.demo-section-note {
    margin: 16px 0 0;
    padding: 12px 16px;
    font-size: 14px;
    color: var(--vort-text-secondary);
    background: rgba(0, 0, 0, 0.02);
    border-radius: 6px;
}

/* Demo 布局 */
.demo-image-row {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    align-items: flex-start;
}

.demo-image-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.demo-image-label {
    margin: 0;
    font-size: 14px;
    color: var(--vort-text-secondary);
}

.demo-image-gallery {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: center;
}

/* 操作说明列表 */
.demo-operations-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.demo-operation-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.02);
    border-radius: 6px;
    font-size: 14px;
}

.demo-operation-icon {
    font-size: 16px;
}

.demo-operation-desc {
    color: var(--vort-text-secondary);
}
</style>
