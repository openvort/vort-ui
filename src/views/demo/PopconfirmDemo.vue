<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { InfoCircleFilled } from "@/components/vort/icons";

// 受控模式
const controlledOpen = ref(false);

// 自定义容器 ref
const scrollContainer = ref<HTMLElement | null>(null);
const getScrollContainer = () => scrollContainer.value || document.body;

// 异步关闭
const asyncOpen = ref(false);
const handleAsyncConfirm = () => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            asyncOpen.value = false;
            resolve();
        }, 2000);
    });
};

// 示例代码
const basicCode = `<template>
  <vort-popconfirm
    title="确定要删除此项吗？"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <vort-button danger>删除</vort-button>
  </vort-popconfirm>
</template>

<script setup>
const handleConfirm = () => {
  console.log('确认删除');
};

const handleCancel = () => {
  console.log('取消删除');
};
<\/script>`;

const descriptionCode = `<template>
  <vort-popconfirm
    title="删除确认"
    description="此操作将永久删除该项，是否继续？"
  >
    <vort-button danger>删除</vort-button>
  </vort-popconfirm>
</template>`;

const placementCode = `<template>
  <!-- 支持 12 个方向 -->
  <vort-popconfirm
    title="topLeft"
    description="箭头应指向按钮中心偏左位置"
    placement="topLeft"
  >
    <vort-button>上左</vort-button>
  </vort-popconfirm>

  <vort-popconfirm
    title="top"
    description="箭头应指向按钮正中心"
    placement="top"
  >
    <vort-button>上</vort-button>
  </vort-popconfirm>

  <!-- 其他方向: topRight, bottom, bottomLeft, bottomRight,
       left, leftTop, leftBottom, right, rightTop, rightBottom -->
</template>`;

const customButtonCode = `<template>
  <vort-popconfirm
    title="确定要继续吗？"
    ok-text="好的"
    cancel-text="算了"
    ok-type="default"
  >
    <vort-button variant="primary">自定义按钮文字</vort-button>
  </vort-popconfirm>
</template>`;

const hideButtonCode = `<template>
  <vort-popconfirm
    title="直接确认操作"
    :show-cancel="false"
    ok-text="我知道了"
  >
    <vort-button>只显示确认按钮</vort-button>
  </vort-popconfirm>
</template>`;

const customIconCode = `<template>
  <vort-popconfirm
    title="这是一个信息确认"
    :icon="InfoCircleFilled"
  >
    <vort-button variant="primary">自定义图标</vort-button>
  </vort-popconfirm>
</template>`;

const controlledCode = `<template>
  <vort-popconfirm
    v-model:open="open"
    title="受控模式"
  >
    <vort-button variant="primary">受控模式</vort-button>
  </vort-popconfirm>

  <vort-button @click="open = true">打开</vort-button>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
<\/script>`;

const disabledCode = `<template>
  <vort-popconfirm
    title="无法打开"
    disabled
  >
    <vort-button>禁用状态</vort-button>
  </vort-popconfirm>
</template>`;

const containerCode = `<script setup>
import { ref } from 'vue';

const scrollContainer = ref(null);
const getScrollContainer = () => scrollContainer.value || document.body;
<\/script>

<template>
  <div ref="scrollContainer" class="scroll-container">
    <p>在滚动容器中使用 Popconfirm，设置 getPopupContainer 可以解决滚动定位问题</p>
    <vort-popconfirm
      title="确认删除？"
      :get-popup-container="getScrollContainer"
    >
      <vort-button danger>删除</vort-button>
    </vort-popconfirm>
  </div>
</template>

<style>
.scroll-container {
  height: 300px;
  overflow: auto;
  border: 1px solid #d9d9d9;
  padding: 20px;
  position: relative;
}
</style>`;

// Props 表格数据
const propsData = [
    {
        prop: "title",
        desc: "确认框标题",
        type: "string",
        default: "-"
    },
    {
        prop: "description",
        desc: "确认框描述内容",
        type: "string",
        default: "-"
    },
    {
        prop: "okText",
        desc: "确认按钮文字",
        type: "string",
        default: "'确定'"
    },
    {
        prop: "cancelText",
        desc: "取消按钮文字",
        type: "string",
        default: "'取消'"
    },
    {
        prop: "okType",
        desc: "确认按钮类型",
        type: "'primary' | 'default' | 'dashed' | 'text' | 'link'",
        default: "'primary'"
    },
    {
        prop: "icon",
        desc: "自定义图标组件",
        type: "Component",
        default: "ExclamationCircleFilled"
    },
    {
        prop: "showCancel",
        desc: "是否显示取消按钮",
        type: "boolean",
        default: "true"
    },
    {
        prop: "disabled",
        desc: "点击触发元素是否弹出确认框",
        type: "boolean",
        default: "false"
    },
    {
        prop: "placement",
        desc: "气泡框位置",
        type: "'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'",
        default: "'top'"
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
        prop: "getPopupContainer",
        desc: "菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题,试试修改为滚动的区域,并相对其定位。注意:自定义容器需要设置 position: relative",
        type: "() => HTMLElement",
        default: "() => document.body"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "confirm",
        desc: "点击确认按钮时触发",
        params: "(e: MouseEvent) => void"
    },
    {
        event: "cancel",
        desc: "点击取消按钮时触发",
        params: "(e: MouseEvent) => void"
    },
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
        desc: "触发确认框显示的元素"
    },
    {
        slot: "title",
        desc: "自定义标题内容"
    },
    {
        slot: "description",
        desc: "自定义描述内容"
    },
    {
        slot: "icon",
        desc: "自定义图标"
    },
    {
        slot: "okText",
        desc: "自定义确认按钮内容"
    },
    {
        slot: "cancelText",
        desc: "自定义取消按钮内容"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Popconfirm 气泡确认框</h1>
            <p class="demo-page-desc">点击元素，弹出气泡式的确认框。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示。</li>
                <li>和 Dialog 相比，交互形式更轻量，操作确认后立即完成。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本用法" description="最简单的用法，点击触发元素弹出确认框。" :code="basicCode">
                    <vort-popconfirm title="确定要删除此项吗？" @confirm="() => console.log('确认删除')" @cancel="() => console.log('取消删除')">
                        <vort-button danger>删除</vort-button>
                    </vort-popconfirm>
                </DemoBox>

                <DemoBox title="带描述" description="使用 description 属性添加描述信息。" :code="descriptionCode">
                    <vort-popconfirm title="删除确认" description="此操作将永久删除该项，是否继续？">
                        <vort-button danger>删除</vort-button>
                    </vort-popconfirm>
                </DemoBox>

                <DemoBox title="位置" description="通过 placement 属性设置气泡框的位置。共有 12 个方向。" :code="placementCode">
                    <div class="placement-demo">
                        <div class="placement-row top-row">
                            <vort-popconfirm title="topLeft" description="箭头应指向按钮中心偏左位置" placement="topLeft">
                                <vort-button>上左</vort-button>
                            </vort-popconfirm>
                            <vort-popconfirm title="top" description="箭头应指向按钮正中心" placement="top">
                                <vort-button>上</vort-button>
                            </vort-popconfirm>
                            <vort-popconfirm title="topRight" description="箭头应指向按钮中心偏右位置" placement="topRight">
                                <vort-button>上右</vort-button>
                            </vort-popconfirm>
                        </div>

                        <div class="placement-middle">
                            <div class="placement-col left-col">
                                <vort-popconfirm title="leftTop" description="箭头应指向按钮中心偏上位置" placement="leftTop">
                                    <vort-button>左上</vort-button>
                                </vort-popconfirm>
                                <vort-popconfirm title="left" description="箭头应指向按钮正中心" placement="left">
                                    <vort-button>左</vort-button>
                                </vort-popconfirm>
                                <vort-popconfirm title="leftBottom" description="箭头应指向按钮中心偏下位置" placement="leftBottom">
                                    <vort-button>左下</vort-button>
                                </vort-popconfirm>
                            </div>

                            <div class="placement-col right-col">
                                <vort-popconfirm title="rightTop" description="箭头应指向按钮中心偏上位置" placement="rightTop">
                                    <vort-button>右上</vort-button>
                                </vort-popconfirm>
                                <vort-popconfirm title="right" description="箭头应指向按钮正中心" placement="right">
                                    <vort-button>右</vort-button>
                                </vort-popconfirm>
                                <vort-popconfirm title="rightBottom" description="箭头应指向按钮中心偏下位置" placement="rightBottom">
                                    <vort-button>右下</vort-button>
                                </vort-popconfirm>
                            </div>
                        </div>

                        <div class="placement-row bottom-row">
                            <vort-popconfirm title="bottomLeft" description="箭头应指向按钮中心偏左位置" placement="bottomLeft">
                                <vort-button>下左</vort-button>
                            </vort-popconfirm>
                            <vort-popconfirm title="bottom" description="箭头应指向按钮正中心" placement="bottom">
                                <vort-button>下</vort-button>
                            </vort-popconfirm>
                            <vort-popconfirm title="bottomRight" description="箭头应指向按钮中心偏右位置" placement="bottomRight">
                                <vort-button>下右</vort-button>
                            </vort-popconfirm>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="自定义按钮文字" description="使用 okText 和 cancelText 自定义按钮文字，okType 设置确认按钮类型。" :code="customButtonCode">
                    <vort-popconfirm title="确定要继续吗？" ok-text="好的" cancel-text="算了" ok-type="default">
                        <vort-button variant="primary">自定义按钮文字</vort-button>
                    </vort-popconfirm>
                </DemoBox>

                <DemoBox title="隐藏取消按钮" description="设置 :show-cancel='false' 可以隐藏取消按钮。" :code="hideButtonCode">
                    <vort-popconfirm title="直接确认操作" :show-cancel="false" ok-text="我知道了">
                        <vort-button>只显示确认按钮</vort-button>
                    </vort-popconfirm>
                </DemoBox>

                <DemoBox title="自定义图标" description="使用 icon 属性自定义图标。" :code="customIconCode">
                    <vort-popconfirm title="这是一个信息确认" :icon="InfoCircleFilled">
                        <vort-button variant="primary">自定义图标</vort-button>
                    </vort-popconfirm>
                </DemoBox>

                <DemoBox title="受控模式" description="使用 v-model:open 控制浮层的显示状态。" :code="controlledCode">
                    <div class="demo-btn-row">
                        <vort-popconfirm v-model:open="controlledOpen" title="受控模式">
                            <vort-button variant="primary">受控模式</vort-button>
                        </vort-popconfirm>
                        <vort-button @click="controlledOpen = true">打开</vort-button>
                        <span class="state-text">当前状态: {{ controlledOpen ? "打开" : "关闭" }}</span>
                    </div>
                </DemoBox>

                <DemoBox title="禁用状态" description="设置 disabled 属性禁止弹出确认框。" :code="disabledCode">
                    <vort-popconfirm title="无法打开" disabled>
                        <vort-button>禁用状态</vort-button>
                    </vort-popconfirm>
                </DemoBox>

                <DemoBox title="自定义挂载容器" description="通过 getPopupContainer 自定义浮层的挂载容器，解决滚动定位问题。" :code="containerCode">
                    <div ref="scrollContainer" class="scroll-demo-container">
                        <div class="scroll-demo-content">
                            <p class="mb-4 text-sm text-gray-600">
                                在滚动容器中使用 Popconfirm，设置 getPopupContainer 可以解决滚动定位问题。
                                <br />
                                尝试滚动此容器，气泡框会跟随按钮移动。
                            </p>
                            <vort-popconfirm
                                title="确认删除？"
                                description="设置 getPopupContainer 后，浮层会渲染在滚动容器内"
                                :get-popup-container="getScrollContainer"
                            >
                                <vort-button danger>删除</vort-button>
                            </vort-popconfirm>
                            <div class="mt-4 text-xs text-gray-400">滚动查看效果...</div>
                            <div style="height: 400px"></div>
                        </div>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Popconfirm Props</h3>
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

            <h3 class="demo-api-title">Popconfirm Events</h3>
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

            <h3 class="demo-api-title">Popconfirm Slots</h3>
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

/* 滚动容器示例 */
.scroll-demo-container {
    height: 300px;
    overflow: auto;
    border: 1px solid var(--vort-border);
    border-radius: 4px;
    padding: 20px;
    position: relative;
}

.scroll-demo-content {
    min-height: 100%;
}
</style>
