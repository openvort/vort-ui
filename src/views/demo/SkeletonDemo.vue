<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 加载状态
const loading = ref(false);

const toggleLoading = () => {
    loading.value = !loading.value;
};

// 按钮形状选项
const buttonActive = ref(true);

// 示例代码
const basicCode = `<template>
  <vort-skeleton />
</template>`;

const complexCode = `<template>
  <vort-skeleton avatar :paragraph="{ rows: 4 }" />
</template>`;

const activeCode = `<template>
  <vort-skeleton active />
</template>`;

const childrenCode = `<script setup>
const loading = ref(true);
<\/script>

<template>
  <vort-skeleton :loading="loading" active>
    <h4>Ant Design Vue</h4>
    <p>这是实际加载完成后显示的内容。</p>
  </vort-skeleton>
  <vort-button @click="loading = !loading" style="margin-top: 16px">
    切换加载状态
  </vort-button>
</template>`;

const avatarCode = `<template>
  <div style="display: flex; gap: 16px">
    <vort-skeleton-avatar active />
    <vort-skeleton-avatar active size="large" />
    <vort-skeleton-avatar active size="small" />
    <vort-skeleton-avatar active :size="64" />
    <vort-skeleton-avatar active shape="square" />
  </div>
</template>`;

const buttonCode = `<template>
  <div style="display: flex; gap: 16px">
    <vort-skeleton-button active />
    <vort-skeleton-button active shape="circle" />
    <vort-skeleton-button active shape="round" />
    <vort-skeleton-button active shape="square" />
  </div>
</template>`;

const buttonSizeCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <vort-skeleton-button active size="large" />
    <vort-skeleton-button active />
    <vort-skeleton-button active size="small" />
    <vort-skeleton-button active block />
  </div>
</template>`;

const inputCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <vort-skeleton-input active size="large" />
    <vort-skeleton-input active />
    <vort-skeleton-input active size="small" />
    <vort-skeleton-input active block />
  </div>
</template>`;

const imageCode = `<template>
  <vort-skeleton-image />
  <vort-skeleton-image active />
</template>`;

const nodeCode = `<template>
  <vort-skeleton-node active>
    <div style="width: 100px; height: 100px; border-radius: 8px; background: rgba(0,0,0,0.06)"></div>
  </vort-skeleton-node>
</template>`;

const titleWidthCode = `<template>
  <vort-skeleton :title="{ width: '50%' }" :paragraph="{ rows: 2 }" />
</template>`;

const paragraphWidthCode = `<template>
  <vort-skeleton
    :paragraph="{ rows: 4, width: ['100%', '80%', '60%', '40%'] }"
    :title="false"
  />
</template>`;

const roundCode = `<template>
  <vort-skeleton round active />
</template>`;

// Props 表格数据 - Skeleton
const skeletonPropsData = [
    {
        prop: "active",
        desc: "是否展示动画效果",
        type: "boolean",
        default: "false"
    },
    {
        prop: "avatar",
        desc: "是否显示头像占位图",
        type: "boolean | SkeletonAvatarProps",
        default: "false"
    },
    {
        prop: "loading",
        desc: "为 true 时显示骨架屏，为 false 时显示子组件",
        type: "boolean",
        default: "true"
    },
    {
        prop: "paragraph",
        desc: "是否显示段落占位图",
        type: "boolean | SkeletonParagraphProps",
        default: "true"
    },
    {
        prop: "round",
        desc: "是否使用圆角样式",
        type: "boolean",
        default: "false"
    },
    {
        prop: "title",
        desc: "是否显示标题占位图",
        type: "boolean | SkeletonTitleProps",
        default: "true"
    }
];

// SkeletonAvatarProps
const avatarPropsData = [
    {
        prop: "active",
        desc: "是否展示动画效果",
        type: "boolean",
        default: "false"
    },
    {
        prop: "size",
        desc: "头像大小",
        type: "'large' | 'small' | 'default' | number",
        default: "'default'"
    },
    {
        prop: "shape",
        desc: "头像形状",
        type: "'circle' | 'square'",
        default: "'circle'"
    }
];

// SkeletonButtonProps
const buttonPropsData = [
    {
        prop: "active",
        desc: "是否展示动画效果",
        type: "boolean",
        default: "false"
    },
    {
        prop: "block",
        desc: "是否为块级元素",
        type: "boolean",
        default: "false"
    },
    {
        prop: "size",
        desc: "按钮大小",
        type: "'large' | 'small' | 'default'",
        default: "'default'"
    },
    {
        prop: "shape",
        desc: "按钮形状",
        type: "'default' | 'circle' | 'round' | 'square'",
        default: "'default'"
    }
];

// SkeletonInputProps
const inputPropsData = [
    {
        prop: "active",
        desc: "是否展示动画效果",
        type: "boolean",
        default: "false"
    },
    {
        prop: "block",
        desc: "是否为块级元素",
        type: "boolean",
        default: "false"
    },
    {
        prop: "size",
        desc: "输入框大小",
        type: "'large' | 'small' | 'default'",
        default: "'default'"
    }
];

// SkeletonImageProps
const imagePropsData = [
    {
        prop: "active",
        desc: "是否展示动画效果",
        type: "boolean",
        default: "false"
    }
];

// SkeletonNodeProps
const nodePropsData = [
    {
        prop: "active",
        desc: "是否展示动画效果",
        type: "boolean",
        default: "false"
    },
    {
        prop: "block",
        desc: "是否为块级元素",
        type: "boolean",
        default: "false"
    }
];

// SkeletonTitleProps 类型说明
const titlePropsData = [
    {
        prop: "width",
        desc: "标题宽度",
        type: "string | number",
        default: "-"
    }
];

// SkeletonParagraphProps 类型说明
const paragraphPropsData = [
    {
        prop: "rows",
        desc: "段落行数",
        type: "number",
        default: "3"
    },
    {
        prop: "width",
        desc: "每行宽度，可以是数组或单个值",
        type: "string | number | (string | number)[]",
        default: "-"
    }
];

// Slots 表格数据
const slotsData = [
    {
        slot: "default",
        desc: "loading 为 false 时显示的实际内容"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Skeleton 骨架屏</h1>
            <p class="demo-page-desc">在需要等待加载内容的位置提供一个占位图形组合。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>网络较慢，需要长时间等待加载处理的情况下。</li>
                <li>图文信息内容较多的列表/卡片中。</li>
                <li>只在第一次加载数据的时候使用。</li>
                <li>可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本用法" description="最简单的占位效果。" :code="basicCode">
                    <vort-skeleton />
                </DemoBox>

                <DemoBox title="复杂的组合" description="更复杂的组合，带有头像和更多段落。" :code="complexCode">
                    <vort-skeleton avatar :paragraph="{ rows: 4 }" />
                </DemoBox>

                <DemoBox title="动画效果" description="显示动画效果，提供更好的视觉体验。" :code="activeCode">
                    <vort-skeleton active />
                </DemoBox>

                <DemoBox title="圆角模式" description="使用圆角样式的骨架屏。" :code="roundCode">
                    <vort-skeleton round active />
                </DemoBox>

                <DemoBox title="包含子组件" description="加载完成后显示实际内容，通过 loading 属性控制。" :code="childrenCode">
                    <div>
                        <vort-skeleton :loading="loading" active avatar>
                            <div class="skeleton-demo-content">
                                <div class="skeleton-demo-avatar">U</div>
                                <div class="skeleton-demo-info">
                                    <h4 class="skeleton-demo-title">Ant Design Vue</h4>
                                    <p class="skeleton-demo-desc">Ant Design Vue 提供了开箱即用的高质量 Vue 组件，可以帮助你快速搭建应用。</p>
                                </div>
                            </div>
                        </vort-skeleton>
                        <vort-button style="margin-top: 16px" @click="toggleLoading">
                            {{ loading ? "显示内容" : "显示骨架屏" }}
                        </vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="自定义标题宽度" description="通过 title 属性配置标题宽度。" :code="titleWidthCode">
                    <vort-skeleton :title="{ width: '50%' }" :paragraph="{ rows: 2 }" active />
                </DemoBox>

                <DemoBox title="自定义段落宽度" description="通过 paragraph 属性配置段落行数和每行宽度。" :code="paragraphWidthCode">
                    <vort-skeleton :paragraph="{ rows: 4, width: ['100%', '80%', '60%', '40%'] }" :title="false" active />
                </DemoBox>

                <DemoBox title="头像占位 SkeletonAvatar" description="头像占位组件，支持不同尺寸和形状。" :code="avatarCode">
                    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
                        <vort-skeleton-avatar active />
                        <vort-skeleton-avatar active size="large" />
                        <vort-skeleton-avatar active size="small" />
                        <vort-skeleton-avatar active :size="64" />
                        <vort-skeleton-avatar active shape="square" />
                    </div>
                </DemoBox>

                <DemoBox title="按钮占位 SkeletonButton" description="按钮占位组件，支持不同形状。" :code="buttonCode">
                    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
                        <vort-skeleton-button :active="buttonActive" />
                        <vort-skeleton-button :active="buttonActive" shape="circle" />
                        <vort-skeleton-button :active="buttonActive" shape="round" />
                        <vort-skeleton-button :active="buttonActive" shape="square" />
                    </div>
                </DemoBox>

                <DemoBox title="按钮占位 - 尺寸" description="按钮占位组件的不同尺寸和块级模式。" :code="buttonSizeCode">
                    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
                        <vort-skeleton-button active size="large" />
                        <vort-skeleton-button active />
                        <vort-skeleton-button active size="small" />
                        <vort-skeleton-button active block />
                    </div>
                </DemoBox>

                <DemoBox title="输入框占位 SkeletonInput" description="输入框占位组件，支持不同尺寸。" :code="inputCode">
                    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
                        <vort-skeleton-input active size="large" />
                        <vort-skeleton-input active />
                        <vort-skeleton-input active size="small" />
                        <vort-skeleton-input active block />
                    </div>
                </DemoBox>

                <DemoBox title="图片占位 SkeletonImage" description="图片占位组件。" :code="imageCode">
                    <div style="display: flex; gap: 16px">
                        <vort-skeleton-image />
                        <vort-skeleton-image active />
                    </div>
                </DemoBox>

                <DemoBox title="自定义节点 SkeletonNode" description="通过 SkeletonNode 组件自定义占位节点。" :code="nodeCode">
                    <div style="display: flex; gap: 16px">
                        <vort-skeleton-node active>
                            <div class="custom-node-content" />
                        </vort-skeleton-node>
                        <vort-skeleton-node active />
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Skeleton Props</h3>
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
                    <tr v-for="item in skeletonPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">SkeletonTitleProps</h3>
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
                    <tr v-for="item in titlePropsData" :key="item.prop">
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

            <h3 class="demo-api-title">SkeletonParagraphProps</h3>
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
                    <tr v-for="item in paragraphPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">SkeletonAvatar Props</h3>
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
                    <tr v-for="item in avatarPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">SkeletonButton Props</h3>
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
                    <tr v-for="item in buttonPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">SkeletonInput Props</h3>
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
                    <tr v-for="item in inputPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">SkeletonImage Props</h3>
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
                    <tr v-for="item in imagePropsData" :key="item.prop">
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

            <h3 class="demo-api-title">SkeletonNode Props</h3>
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
                    <tr v-for="item in nodePropsData" :key="item.prop">
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
/* Skeleton Demo 特定样式 */
.skeleton-demo-content {
    display: flex;
    gap: 16px;
}

.skeleton-demo-avatar {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #1890ff;
    color: #fff;
    border-radius: 50%;
    font-weight: 500;
}

.skeleton-demo-info {
    flex: 1;
}

.skeleton-demo-title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 500;
    color: var(--vort-text);
}

.skeleton-demo-desc {
    margin: 0;
    font-size: 14px;
    color: var(--vort-text-secondary);
    line-height: 1.6;
}

.custom-node-content {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.06);
}
</style>
