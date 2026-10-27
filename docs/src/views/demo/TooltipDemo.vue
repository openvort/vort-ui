<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 受控模式
const controlledOpen = ref(false);

// 示例代码
const basicCode = `<template>
  <vort-tooltip title="这是提示文字">
    <span>鼠标移上来</span>
  </vort-tooltip>
</template>`;

const placementCode = `<template>
  <!-- 支持 12 个方向 -->
  <vort-tooltip title="topLeft" placement="topLeft">
    <vort-button>上左</vort-button>
  </vort-tooltip>

  <vort-tooltip title="top" placement="top">
    <vort-button>上</vort-button>
  </vort-tooltip>

  <!-- 其他方向: topRight, bottom, bottomLeft, bottomRight,
       left, leftTop, leftBottom, right, rightTop, rightBottom -->
</template>`;

const triggerCode = `<template>
  <!-- hover 触发（默认） -->
  <vort-tooltip title="鼠标悬停触发">
    <vort-button>Hover</vort-button>
  </vort-tooltip>

  <!-- click 触发 -->
  <vort-tooltip title="点击触发" trigger="click">
    <vort-button>Click</vort-button>
  </vort-tooltip>

  <!-- focus 触发 -->
  <vort-tooltip title="聚焦触发" trigger="focus">
    <vort-input placeholder="Focus me" style="width: 120px" />
  </vort-tooltip>
</template>`;

const noArrowCode = `<template>
  <vort-tooltip
    title="没有箭头的提示"
    :arrow="false"
  >
    <vort-button>无箭头</vort-button>
  </vort-tooltip>
</template>`;

const darkCode = `<template>
  <!-- 默认白色背景 -->
  <vort-tooltip title="白色背景提示">
    <vort-button>默认</vort-button>
  </vort-tooltip>

  <!-- 暗色背景 -->
  <vort-tooltip title="暗色背景提示" dark>
    <vort-button>暗色</vort-button>
  </vort-tooltip>
</template>`;

const colorCode = `<template>
  <vort-tooltip title="自定义颜色" color="#1456f0">
    <vort-button>蓝色</vort-button>
  </vort-tooltip>

  <vort-tooltip title="自定义颜色" color="#52c41a">
    <vort-button>绿色</vort-button>
  </vort-tooltip>

  <vort-tooltip title="自定义颜色" color="#722ed1">
    <vort-button>紫色</vort-button>
  </vort-tooltip>
</template>`;

const controlledCode = `<template>
  <vort-tooltip
    v-model:open="open"
    title="受控模式"
    trigger="click"
  >
    <vort-button variant="primary">受控模式</vort-button>
  </vort-tooltip>

  <vort-button @click="open = true">打开</vort-button>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
<\/script>`;

const disabledCode = `<template>
  <vort-tooltip title="无法显示" disabled>
    <vort-button>禁用状态</vort-button>
  </vort-tooltip>
</template>`;

const slotCode = `<template>
  <vort-tooltip>
    <template #title>
      <span>多行提示文字<br />第二行内容</span>
    </template>
    <vort-button>多行提示</vort-button>
  </vort-tooltip>
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "title",
        desc: "提示文字",
        type: "string",
        default: "-"
    },
    {
        prop: "placement",
        desc: "气泡框位置",
        type: "'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'",
        default: "'top'"
    },
    {
        prop: "trigger",
        desc: "触发方式",
        type: "'click' | 'hover' | 'focus' | 'contextMenu'",
        default: "'hover'"
    },
    {
        prop: "arrow",
        desc: "是否显示箭头",
        type: "boolean",
        default: "true"
    },
    {
        prop: "dark",
        desc: "是否使用暗色主题",
        type: "boolean",
        default: "false"
    },
    {
        prop: "color",
        desc: "自定义背景颜色",
        type: "string",
        default: "-"
    },
    {
        prop: "v-model:open",
        desc: "控制浮层显示（受控模式）",
        type: "boolean",
        default: "-"
    },
    {
        prop: "disabled",
        desc: "是否禁用",
        type: "boolean",
        default: "false"
    },
    {
        prop: "mouseEnterDelay",
        desc: '鼠标移入后延时多少才显示 (ms)，trigger="hover" 时有效',
        type: "number",
        default: "100"
    },
    {
        prop: "mouseLeaveDelay",
        desc: '鼠标移出后延时多少才隐藏 (ms)，trigger="hover" 时有效',
        type: "number",
        default: "100"
    },
    {
        prop: "overlayClass",
        desc: "浮层额外类名",
        type: "string",
        default: "-"
    },
    {
        prop: "overlayStyle",
        desc: "浮层额外样式",
        type: "object",
        default: "-"
    },
    {
        prop: "getPopupContainer",
        desc: "菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位",
        type: "() => HTMLElement",
        default: "() => document.body"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "openChange",
        desc: "显示/隐藏状态变化时触发",
        params: "(open: boolean) => void"
    }
];

// Slots 表格数据
const slotsData = [
    {
        slot: "default",
        desc: "触发 Tooltip 显示的元素"
    },
    {
        slot: "title",
        desc: "自定义提示内容"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Tooltip 文字提示</h1>
            <p class="demo-page-desc">简单的文字提示气泡框。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。</li>
                <li>可用来代替系统默认的 title 提示，提供一个按钮/文字/操作的文案解释。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本用法" description="最简单的用法，鼠标悬停触发。" :code="basicCode">
                    <vort-tooltip title="这是提示文字">
                        <span class="demo-link">鼠标移上来</span>
                    </vort-tooltip>
                </DemoBox>

                <DemoBox title="位置" description="通过 placement 属性设置气泡框的位置。共有 12 个方向。" :code="placementCode">
                    <div class="placement-demo">
                        <div class="placement-row top-row">
                            <vort-tooltip title="topLeft 提示文字" placement="topLeft">
                                <vort-button>上左</vort-button>
                            </vort-tooltip>
                            <vort-tooltip title="top 提示文字" placement="top">
                                <vort-button>上</vort-button>
                            </vort-tooltip>
                            <vort-tooltip title="topRight 提示文字" placement="topRight">
                                <vort-button>上右</vort-button>
                            </vort-tooltip>
                        </div>

                        <div class="placement-middle">
                            <div class="placement-col left-col">
                                <vort-tooltip title="leftTop 提示文字" placement="leftTop">
                                    <vort-button>左上</vort-button>
                                </vort-tooltip>
                                <vort-tooltip title="left 提示文字" placement="left">
                                    <vort-button>左</vort-button>
                                </vort-tooltip>
                                <vort-tooltip title="leftBottom 提示文字" placement="leftBottom">
                                    <vort-button>左下</vort-button>
                                </vort-tooltip>
                            </div>

                            <div class="placement-col right-col">
                                <vort-tooltip title="rightTop 提示文字" placement="rightTop">
                                    <vort-button>右上</vort-button>
                                </vort-tooltip>
                                <vort-tooltip title="right 提示文字" placement="right">
                                    <vort-button>右</vort-button>
                                </vort-tooltip>
                                <vort-tooltip title="rightBottom 提示文字" placement="rightBottom">
                                    <vort-button>右下</vort-button>
                                </vort-tooltip>
                            </div>
                        </div>

                        <div class="placement-row bottom-row">
                            <vort-tooltip title="bottomLeft 提示文字" placement="bottomLeft">
                                <vort-button>下左</vort-button>
                            </vort-tooltip>
                            <vort-tooltip title="bottom 提示文字" placement="bottom">
                                <vort-button>下</vort-button>
                            </vort-tooltip>
                            <vort-tooltip title="bottomRight 提示文字" placement="bottomRight">
                                <vort-button>下右</vort-button>
                            </vort-tooltip>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="触发方式" description="支持 hover、click、focus 三种触发方式。" :code="triggerCode">
                    <div class="demo-btn-row">
                        <vort-tooltip title="鼠标悬停触发">
                            <vort-button>Hover</vort-button>
                        </vort-tooltip>
                        <vort-tooltip title="点击触发" trigger="click">
                            <vort-button>Click</vort-button>
                        </vort-tooltip>
                        <vort-tooltip title="聚焦触发" trigger="focus">
                            <vort-input placeholder="Focus me" style="width: 120px" />
                        </vort-tooltip>
                    </div>
                </DemoBox>

                <DemoBox title="暗色主题" description="设置 dark 属性使用暗色背景。" :code="darkCode">
                    <div class="demo-btn-row">
                        <vort-tooltip title="白色背景提示（默认）">
                            <vort-button>默认</vort-button>
                        </vort-tooltip>
                        <vort-tooltip title="暗色背景提示" dark>
                            <vort-button>暗色</vort-button>
                        </vort-tooltip>
                    </div>
                </DemoBox>

                <DemoBox title="自定义颜色" description="通过 color 属性设置自定义背景颜色。" :code="colorCode">
                    <div class="demo-btn-row">
                        <vort-tooltip title="蓝色提示" color="#1456f0">
                            <vort-button>蓝色</vort-button>
                        </vort-tooltip>
                        <vort-tooltip title="绿色提示" color="#52c41a">
                            <vort-button>绿色</vort-button>
                        </vort-tooltip>
                        <vort-tooltip title="紫色提示" color="#722ed1">
                            <vort-button>紫色</vort-button>
                        </vort-tooltip>
                        <vort-tooltip title="红色提示" color="#f5222d">
                            <vort-button>红色</vort-button>
                        </vort-tooltip>
                        <vort-tooltip title="橙色提示" color="#fa8c16">
                            <vort-button>橙色</vort-button>
                        </vort-tooltip>
                    </div>
                </DemoBox>

                <DemoBox title="无箭头" description="设置 :arrow='false' 隐藏箭头。" :code="noArrowCode">
                    <vort-tooltip title="没有箭头的提示" :arrow="false">
                        <vort-button>无箭头</vort-button>
                    </vort-tooltip>
                </DemoBox>

                <DemoBox title="多行文字" description="使用 title 插槽自定义提示内容，支持多行。" :code="slotCode">
                    <vort-tooltip>
                        <template #title>
                            <span>多行提示文字<br />第二行内容<br />第三行内容</span>
                        </template>
                        <vort-button>多行提示</vort-button>
                    </vort-tooltip>
                </DemoBox>

                <DemoBox title="受控模式" description="使用 v-model:open 控制浮层的显示状态。" :code="controlledCode">
                    <div class="demo-btn-row">
                        <vort-tooltip v-model:open="controlledOpen" title="受控模式提示" trigger="click">
                            <vort-button variant="primary">受控模式</vort-button>
                        </vort-tooltip>
                        <vort-button @click="controlledOpen = true">打开</vort-button>
                        <vort-button @click="controlledOpen = false">关闭</vort-button>
                        <span class="state-text">当前状态: {{ controlledOpen ? "打开" : "关闭" }}</span>
                    </div>
                </DemoBox>

                <DemoBox title="禁用状态" description="设置 disabled 属性禁止显示提示。" :code="disabledCode">
                    <vort-tooltip title="无法显示" disabled>
                        <vort-button>禁用状态</vort-button>
                    </vort-tooltip>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Tooltip Props</h3>
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

            <h3 class="demo-api-title">Tooltip Events</h3>
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

            <h3 class="demo-api-title">Tooltip Slots</h3>
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
/* Demo 布局 */
.demo-btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
}

.state-text {
    font-size: 14px;
    color: var(--vort-text-secondary);
}

.demo-link {
    color: var(--vort-primary);
    cursor: pointer;
}

.demo-link:hover {
    text-decoration: underline;
}

/* 位置演示 */
.placement-demo {
    width: 100%;
}

.placement-row {
    display: flex;
    justify-content: center;
    gap: 8px;
}

.placement-row button {
    width: 80px;
}

.placement-middle {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
}

.placement-col {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.placement-col button {
    width: 80px;
}
</style>
