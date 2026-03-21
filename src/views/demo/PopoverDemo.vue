<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 受控模式
const controlledOpen = ref(false);

// 示例代码
const basicCode = `<template>
  <vort-popover title="标题" content="这是一段内容">
    <vort-button variant="primary">悬停显示</vort-button>
  </vort-popover>
</template>`;

const triggerCode = `<template>
  <!-- hover 触发（默认） -->
  <vort-popover title="鼠标悬停触发" content="移出后自动关闭">
    <vort-button>Hover</vort-button>
  </vort-popover>

  <!-- click 触发 -->
  <vort-popover title="点击触发" content="点击外部关闭" trigger="click">
    <vort-button>Click</vort-button>
  </vort-popover>

  <!-- focus 触发 -->
  <vort-popover title="聚焦触发" content="失焦后关闭" trigger="focus">
    <vort-input placeholder="Focus me" style="width: 120px" />
  </vort-popover>
</template>`;

const placementCode = `<template>
  <!-- 支持 12 个方向 -->
  <vort-popover title="topLeft" placement="topLeft">
    <vort-button>上左</vort-button>
  </vort-popover>

  <vort-popover title="top" placement="top">
    <vort-button>上</vort-button>
  </vort-popover>

  <!-- 其他方向: topRight, bottom, bottomLeft, bottomRight,
       left, leftTop, leftBottom, right, rightTop, rightBottom -->
</template>`;

const contentSlotCode = `<template>
  <vort-popover title="用户信息">
    <template #content>
      <div class="user-card">
        <img src="..." alt="avatar" />
        <div class="user-info">
          <div class="user-name">张三</div>
          <div class="user-email">zhangsan@example.com</div>
        </div>
      </div>
    </template>
    <vort-button variant="primary">查看用户</vort-button>
  </vort-popover>
</template>`;

const noArrowCode = `<template>
  <vort-popover
    title="无箭头"
    content="设置 :arrow=&quot;false&quot; 隐藏箭头"
    :arrow="false"
  >
    <vort-button>无箭头</vort-button>
  </vort-popover>
</template>`;

const controlledCode = `<template>
  <vort-popover
    v-model:open="open"
    title="受控模式"
    content="使用 v-model:open 控制显示状态"
    trigger="click"
  >
    <vort-button variant="primary">受控模式</vort-button>
  </vort-popover>

  <vort-button @click="open = true">打开</vort-button>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
<\/script>`;

const disabledCode = `<template>
  <vort-popover
    title="无法打开"
    content="disabled 状态"
    disabled
  >
    <vort-button>禁用状态</vort-button>
  </vort-popover>
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "title",
        desc: "卡片标题",
        type: "string",
        default: "-"
    },
    {
        prop: "content",
        desc: "卡片内容",
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
        desc: "触发气泡卡片显示的元素"
    },
    {
        slot: "title",
        desc: "自定义标题内容"
    },
    {
        slot: "content",
        desc: "自定义卡片内容"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Popover 气泡卡片</h1>
            <p class="demo-page-desc">点击/鼠标移入元素，弹出气泡式的卡片浮层。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</li>
                <li>和 Tooltip 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本用法" description="最简单的用法，鼠标悬停触发。" :code="basicCode">
                    <vort-popover title="标题" content="这是一段内容，气泡卡片可以承载更丰富的信息。">
                        <vort-button variant="primary">悬停显示</vort-button>
                    </vort-popover>
                </DemoBox>

                <DemoBox title="触发方式" description="支持 hover、click、focus 三种触发方式。" :code="triggerCode">
                    <div class="demo-btn-row">
                        <vort-popover title="鼠标悬停触发" content="移出后自动关闭">
                            <vort-button>Hover</vort-button>
                        </vort-popover>
                        <vort-popover title="点击触发" content="点击外部区域关闭" trigger="click">
                            <vort-button>Click</vort-button>
                        </vort-popover>
                        <vort-popover title="聚焦触发" content="失焦后自动关闭" trigger="focus">
                            <vort-input placeholder="Focus me" style="width: 120px" />
                        </vort-popover>
                    </div>
                </DemoBox>

                <DemoBox title="位置" description="通过 placement 属性设置气泡框的位置。共有 12 个方向。" :code="placementCode">
                    <div class="placement-demo">
                        <div class="placement-row top-row">
                            <vort-popover title="topLeft" content="气泡卡片内容" placement="topLeft">
                                <vort-button>上左</vort-button>
                            </vort-popover>
                            <vort-popover title="top" content="气泡卡片内容" placement="top">
                                <vort-button>上</vort-button>
                            </vort-popover>
                            <vort-popover title="topRight" content="气泡卡片内容" placement="topRight">
                                <vort-button>上右</vort-button>
                            </vort-popover>
                        </div>

                        <div class="placement-middle">
                            <div class="placement-col left-col">
                                <vort-popover title="leftTop" content="气泡卡片内容" placement="leftTop">
                                    <vort-button>左上</vort-button>
                                </vort-popover>
                                <vort-popover title="left" content="气泡卡片内容" placement="left">
                                    <vort-button>左</vort-button>
                                </vort-popover>
                                <vort-popover title="leftBottom" content="气泡卡片内容" placement="leftBottom">
                                    <vort-button>左下</vort-button>
                                </vort-popover>
                            </div>

                            <div class="placement-col right-col">
                                <vort-popover title="rightTop" content="气泡卡片内容" placement="rightTop">
                                    <vort-button>右上</vort-button>
                                </vort-popover>
                                <vort-popover title="right" content="气泡卡片内容" placement="right">
                                    <vort-button>右</vort-button>
                                </vort-popover>
                                <vort-popover title="rightBottom" content="气泡卡片内容" placement="rightBottom">
                                    <vort-button>右下</vort-button>
                                </vort-popover>
                            </div>
                        </div>

                        <div class="placement-row bottom-row">
                            <vort-popover title="bottomLeft" content="气泡卡片内容" placement="bottomLeft">
                                <vort-button>下左</vort-button>
                            </vort-popover>
                            <vort-popover title="bottom" content="气泡卡片内容" placement="bottom">
                                <vort-button>下</vort-button>
                            </vort-popover>
                            <vort-popover title="bottomRight" content="气泡卡片内容" placement="bottomRight">
                                <vort-button>下右</vort-button>
                            </vort-popover>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="自定义内容" description="使用 content 插槽自定义卡片内容。" :code="contentSlotCode">
                    <vort-popover title="用户信息">
                        <template #content>
                            <div class="user-card">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" class="user-avatar" />
                                <div class="user-info">
                                    <div class="user-name">张三</div>
                                    <div class="user-email">zhangsan@example.com</div>
                                    <vort-button size="small" variant="primary" style="margin-top: 8px"> 查看详情 </vort-button>
                                </div>
                            </div>
                        </template>
                        <vort-button variant="primary">查看用户</vort-button>
                    </vort-popover>
                </DemoBox>

                <DemoBox title="无箭头" description='设置 :arrow="false" 隐藏箭头。' :code="noArrowCode">
                    <vort-popover title="无箭头模式" content="这个气泡卡片没有箭头指示" :arrow="false">
                        <vort-button>无箭头</vort-button>
                    </vort-popover>
                </DemoBox>

                <DemoBox title="受控模式" description="使用 v-model:open 控制浮层的显示状态。" :code="controlledCode">
                    <div class="demo-btn-row">
                        <vort-popover v-model:open="controlledOpen" title="受控模式" content="使用 v-model:open 控制显示状态" trigger="click">
                            <vort-button variant="primary">受控模式</vort-button>
                        </vort-popover>
                        <vort-button @click="controlledOpen = true">打开</vort-button>
                        <vort-button @click="controlledOpen = false">关闭</vort-button>
                        <span class="state-text">当前状态: {{ controlledOpen ? "打开" : "关闭" }}</span>
                    </div>
                </DemoBox>

                <DemoBox title="禁用状态" description="设置 disabled 属性禁止弹出气泡卡片。" :code="disabledCode">
                    <vort-popover title="无法打开" content="disabled 状态" disabled>
                        <vort-button>禁用状态</vort-button>
                    </vort-popover>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Popover Props</h3>
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

            <h3 class="demo-api-title">Popover Events</h3>
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

            <h3 class="demo-api-title">Popover Slots</h3>
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
/* 公共样式已在 demo.css 中定义 */

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

/* 用户卡片示例 */
.user-card {
    display: flex;
    gap: 12px;
    align-items: flex-start;
}

.user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #f0f0f0;
}

.user-info {
    flex: 1;
}

.user-name {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.88);
}

.user-email {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 4px;
}
</style>
