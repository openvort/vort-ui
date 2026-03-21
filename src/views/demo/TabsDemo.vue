<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { Button } from "@/components/vort";

// 基础示例
const activeKey = ref("1");

// 禁用示例
const disabledKey = ref("1");

// 位置示例
const positionKey = ref("1");
const tabPosition = ref<"top" | "right" | "bottom" | "left">("top");

// 尺寸示例
const sizeKey = ref("1");

// 居中示例
const centeredKey = ref("1");

// Card 类型
const cardKey = ref("1");

// 可编辑卡片
const editableKey = ref("1");
const editablePanes = ref([
    { key: "1", label: "Tab 1", content: "Content of Tab 1" },
    { key: "2", label: "Tab 2", content: "Content of Tab 2" },
    { key: "3", label: "Tab 3", content: "Content of Tab 3" }
]);
let newTabIndex = 3;

const handleEdit = (targetKey: string | MouseEvent, action: "add" | "remove") => {
    if (action === "add") {
        newTabIndex++;
        editablePanes.value.push({
            key: `${newTabIndex}`,
            label: `New Tab ${newTabIndex}`,
            content: `Content of new Tab ${newTabIndex}`
        });
        editableKey.value = `${newTabIndex}`;
    } else if (action === "remove" && typeof targetKey === "string") {
        const targetIndex = editablePanes.value.findIndex((pane) => pane.key === targetKey);
        if (targetIndex !== -1) {
            editablePanes.value.splice(targetIndex, 1);
            if (editableKey.value === targetKey && editablePanes.value.length > 0) {
                editableKey.value = editablePanes.value[Math.max(0, targetIndex - 1)]!.key;
            }
        }
    }
};

// items 配置
const itemsKey = ref("1");
const tabItems = [
    { key: "1", label: "Tab 1" },
    { key: "2", label: "Tab 2" },
    { key: "3", label: "Tab 3" }
];

// 附加内容
const extraKey = ref("1");

// 自定义标签内容
const customTabKey = ref("1");
const badgeCount = ref(5);

// 示例代码
const basicCode = `<script setup>
import { ref } from 'vue';
const activeKey = ref('1');
<\/script>

<template>
  <vort-tabs v-model:active-key="activeKey">
    <vort-tab-pane tab-key="1" tab="Tab 1">
      Content of Tab Pane 1
    </vort-tab-pane>
    <vort-tab-pane tab-key="2" tab="Tab 2">
      Content of Tab Pane 2
    </vort-tab-pane>
    <vort-tab-pane tab-key="3" tab="Tab 3">
      Content of Tab Pane 3
    </vort-tab-pane>
  </vort-tabs>
</template>`;

const disabledCode = `<template>
  <vort-tabs v-model:active-key="activeKey">
    <vort-tab-pane tab-key="1" tab="Tab 1">
      Content of Tab Pane 1
    </vort-tab-pane>
    <vort-tab-pane tab-key="2" tab="Tab 2" disabled>
      Content of Tab Pane 2
    </vort-tab-pane>
    <vort-tab-pane tab-key="3" tab="Tab 3">
      Content of Tab Pane 3
    </vort-tab-pane>
  </vort-tabs>
</template>`;

const positionCode = `<script setup>
import { ref } from 'vue';
const activeKey = ref('1');
const tabPosition = ref('top');
<\/script>

<template>
  <vort-radio-group v-model="tabPosition" button-style="solid">
    <vort-radio-button value="top">top</vort-radio-button>
    <vort-radio-button value="right">right</vort-radio-button>
    <vort-radio-button value="bottom">bottom</vort-radio-button>
    <vort-radio-button value="left">left</vort-radio-button>
  </vort-radio-group>

  <vort-tabs v-model:active-key="activeKey" :tab-position="tabPosition">
    <vort-tab-pane tab-key="1" tab="Tab 1">Content of Tab 1</vort-tab-pane>
    <vort-tab-pane tab-key="2" tab="Tab 2">Content of Tab 2</vort-tab-pane>
    <vort-tab-pane tab-key="3" tab="Tab 3">Content of Tab 3</vort-tab-pane>
  </vort-tabs>
</template>`;

const sizeCode = `<template>
  <vort-tabs size="large">
    <vort-tab-pane tab-key="1" tab="Tab 1">Large</vort-tab-pane>
    <vort-tab-pane tab-key="2" tab="Tab 2">Large</vort-tab-pane>
  </vort-tabs>

  <vort-tabs size="middle">
    <vort-tab-pane tab-key="1" tab="Tab 1">Middle (Default)</vort-tab-pane>
    <vort-tab-pane tab-key="2" tab="Tab 2">Middle</vort-tab-pane>
  </vort-tabs>

  <vort-tabs size="small">
    <vort-tab-pane tab-key="1" tab="Tab 1">Small</vort-tab-pane>
    <vort-tab-pane tab-key="2" tab="Tab 2">Small</vort-tab-pane>
  </vort-tabs>
</template>`;

const centeredCode = `<template>
  <vort-tabs centered>
    <vort-tab-pane tab-key="1" tab="Tab 1">Content of Tab 1</vort-tab-pane>
    <vort-tab-pane tab-key="2" tab="Tab 2">Content of Tab 2</vort-tab-pane>
    <vort-tab-pane tab-key="3" tab="Tab 3">Content of Tab 3</vort-tab-pane>
  </vort-tabs>
</template>`;

const cardCode = `<template>
  <vort-tabs type="card">
    <vort-tab-pane tab-key="1" tab="Tab 1">Content of Tab 1</vort-tab-pane>
    <vort-tab-pane tab-key="2" tab="Tab 2">Content of Tab 2</vort-tab-pane>
    <vort-tab-pane tab-key="3" tab="Tab 3">Content of Tab 3</vort-tab-pane>
  </vort-tabs>
</template>`;

const editableCardCode = `<script setup>
import { ref } from 'vue';

const activeKey = ref('1');
const panes = ref([
  { key: '1', label: 'Tab 1', content: 'Content of Tab 1' },
  { key: '2', label: 'Tab 2', content: 'Content of Tab 2' },
]);
let newTabIndex = 2;

const handleEdit = (targetKey, action) => {
  if (action === 'add') {
    newTabIndex++;
    panes.value.push({
      key: \`\${newTabIndex}\`,
      label: \`New Tab \${newTabIndex}\`,
      content: \`Content of new Tab \${newTabIndex}\`
    });
    activeKey.value = \`\${newTabIndex}\`;
  } else if (action === 'remove') {
    const targetIndex = panes.value.findIndex(p => p.key === targetKey);
    if (targetIndex !== -1) {
      panes.value.splice(targetIndex, 1);
      if (activeKey.value === targetKey && panes.value.length > 0) {
        activeKey.value = panes.value[Math.max(0, targetIndex - 1)].key;
      }
    }
  }
};
<\/script>

<template>
  <vort-tabs
    v-model:active-key="activeKey"
    type="editable-card"
    @edit="handleEdit"
  >
    <vort-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :tab-key="pane.key"
      :tab="pane.label"
    >
      {{ pane.content }}
    </vort-tab-pane>
  </vort-tabs>
</template>`;

const itemsCode = `<script setup>
import { ref } from 'vue';
const activeKey = ref('1');
const items = [
  { key: '1', label: 'Tab 1' },
  { key: '2', label: 'Tab 2' },
  { key: '3', label: 'Tab 3' },
];
<\/script>

<template>
  <vort-tabs v-model:active-key="activeKey" :items="items">
    <template #1>Content of Tab 1</template>
    <template #2>Content of Tab 2</template>
    <template #3>Content of Tab 3</template>
  </vort-tabs>
</template>`;

const extraCode = `<template>
  <vort-tabs>
    <template #tabBarExtraContent>
      <vort-button size="small">Extra Action</vort-button>
    </template>
    <vort-tab-pane tab-key="1" tab="Tab 1">Content of Tab 1</vort-tab-pane>
    <vort-tab-pane tab-key="2" tab="Tab 2">Content of Tab 2</vort-tab-pane>
  </vort-tabs>
</template>`;

const customTabCode = `<script setup>
import { ref } from 'vue';
const activeKey = ref('1');
const badgeCount = ref(5);
<\/script>

<template>
  <vort-tabs v-model:active-key="activeKey">
    <vort-tab-pane tab-key="1" tab="普通标签">
      Content of Tab 1
    </vort-tab-pane>
    <vort-tab-pane tab-key="2">
      <template #tab>
        <vort-badge :count="badgeCount" color="red">待审核</vort-badge>
      </template>
      Content of Tab 2
    </vort-tab-pane>
    <vort-tab-pane tab-key="3">
      <template #tab>
        <span style="display: flex; align-items: center; gap: 4px;">
          <vort-badge status="processing" />
          <span>处理中</span>
        </span>
      </template>
      Content of Tab 3
    </vort-tab-pane>
  </vort-tabs>
</template>`;

// Props 表格数据
const tabsPropsData = [
    { prop: "activeKey / v-model:activeKey", desc: "当前激活 tab 面板的 key", type: "string", default: "-" },
    { prop: "defaultActiveKey", desc: "初始化选中面板的 key", type: "string", default: "第一个面板" },
    { prop: "type", desc: "页签的基本样式", type: "'line' | 'card' | 'editable-card'", default: "'line'" },
    { prop: "tabPosition", desc: "页签位置", type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'" },
    { prop: "size", desc: "大小", type: "'large' | 'middle' | 'small'", default: "'middle'" },
    { prop: "centered", desc: "标签居中展示", type: "boolean", default: "false" },
    { prop: "tabBarGutter", desc: "tabs 之间的间隙", type: "number", default: "-" },
    { prop: "animated", desc: "是否使用动画切换 Tabs", type: "boolean", default: "true" },
    { prop: "destroyInactiveTabPane", desc: "被隐藏时是否销毁 DOM 结构", type: "boolean", default: "false" },
    { prop: "hideAdd", desc: '是否隐藏添加按钮（type="editable-card" 时有效）', type: "boolean", default: "false" },
    { prop: "hideContent", desc: "隐藏内容区域，仅显示标签栏（用于只需要 tab 导航条的场景）", type: "boolean", default: "false" },
    { prop: "items", desc: "配置式标签项", type: "TabItem[]", default: "-" }
];

const tabPanePropsData = [
    { prop: "tabKey", desc: "对应 activeKey，用于标签页的唯一标识", type: "string", default: "-" },
    { prop: "tab", desc: "选项卡头显示文字", type: "string", default: "-" },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    { prop: "closable", desc: "是否可关闭（editable-card 类型时可用）", type: "boolean", default: "true" },
    { prop: "forceRender", desc: "强制渲染，即使未激活也渲染 DOM", type: "boolean", default: "false" }
];

const tabPaneSlotsData = [
    { slot: "default", desc: "标签面板内容" },
    { slot: "tab", desc: "自定义标签内容，优先级高于 tab 属性，可用于渲染 Badge、Icon 等" }
];

const tabsEventsData = [
    { event: "update:activeKey", desc: "切换面板时触发（v-model）", params: "(key: string) => void" },
    { event: "change", desc: "切换面板的回调", params: "(key: string) => void" },
    { event: "tabClick", desc: "tab 被点击时的回调", params: "(key: string, event: MouseEvent) => void" },
    { event: "edit", desc: '新增和删除页签的回调（type="editable-card" 时有效）', params: "(targetKey: string | MouseEvent, action: 'add' | 'remove') => void" }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Tabs 标签页</h1>
            <p class="demo-page-desc">选项卡切换组件。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>提供平级的区域将大块内容进行收纳和展现，保持界面整洁。</li>
                <li>Ant Design 依次提供了三级选项卡，分别用于不同的场景。</li>
                <li>卡片式的页签，提供可关闭的样式，常用于容器顶部。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本使用" description="默认选中第一项，使用 v-model:active-key 双向绑定。" :code="basicCode">
                    <vort-tabs v-model:active-key="activeKey">
                        <vort-tab-pane tab-key="1" tab="Tab 1"> Content of Tab Pane 1 </vort-tab-pane>
                        <vort-tab-pane tab-key="2" tab="Tab 2"> Content of Tab Pane 2 </vort-tab-pane>
                        <vort-tab-pane tab-key="3" tab="Tab 3"> Content of Tab Pane 3 </vort-tab-pane>
                    </vort-tabs>
                    <p class="demo-result">当前选中: {{ activeKey }}</p>
                </DemoBox>

                <DemoBox title="禁用" description="禁用某一项。" :code="disabledCode">
                    <vort-tabs v-model:active-key="disabledKey">
                        <vort-tab-pane tab-key="1" tab="Tab 1"> Content of Tab Pane 1 </vort-tab-pane>
                        <vort-tab-pane tab-key="2" tab="Tab 2" disabled> Content of Tab Pane 2 </vort-tab-pane>
                        <vort-tab-pane tab-key="3" tab="Tab 3"> Content of Tab Pane 3 </vort-tab-pane>
                    </vort-tabs>
                </DemoBox>

                <DemoBox title="位置" description="有四个位置，tabPosition='top' | 'right' | 'bottom' | 'left'。" :code="positionCode">
                    <div class="demo-col">
                        <vort-radio-group v-model="tabPosition" button-style="solid">
                            <vort-radio-button value="top">top</vort-radio-button>
                            <vort-radio-button value="right">right</vort-radio-button>
                            <vort-radio-button value="bottom">bottom</vort-radio-button>
                            <vort-radio-button value="left">left</vort-radio-button>
                        </vort-radio-group>

                        <div class="demo-tabs-position">
                            <vort-tabs v-model:active-key="positionKey" :tab-position="tabPosition">
                                <vort-tab-pane tab-key="1" tab="Tab 1">Content of Tab 1</vort-tab-pane>
                                <vort-tab-pane tab-key="2" tab="Tab 2">Content of Tab 2</vort-tab-pane>
                                <vort-tab-pane tab-key="3" tab="Tab 3">Content of Tab 3</vort-tab-pane>
                            </vort-tabs>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="尺寸" description="大中小三种尺寸，默认为 middle。" :code="sizeCode">
                    <div class="demo-col">
                        <vort-tabs v-model:active-key="sizeKey" size="large">
                            <vort-tab-pane tab-key="1" tab="Tab 1">Large size tabs</vort-tab-pane>
                            <vort-tab-pane tab-key="2" tab="Tab 2">Large size tabs</vort-tab-pane>
                        </vort-tabs>

                        <vort-tabs v-model:active-key="sizeKey" size="middle">
                            <vort-tab-pane tab-key="1" tab="Tab 1">Middle size tabs (default)</vort-tab-pane>
                            <vort-tab-pane tab-key="2" tab="Tab 2">Middle size tabs</vort-tab-pane>
                        </vort-tabs>

                        <vort-tabs v-model:active-key="sizeKey" size="small">
                            <vort-tab-pane tab-key="1" tab="Tab 1">Small size tabs</vort-tab-pane>
                            <vort-tab-pane tab-key="2" tab="Tab 2">Small size tabs</vort-tab-pane>
                        </vort-tabs>
                    </div>
                </DemoBox>

                <DemoBox title="居中" description="标签居中展示。" :code="centeredCode">
                    <vort-tabs v-model:active-key="centeredKey" centered>
                        <vort-tab-pane tab-key="1" tab="Tab 1">Content of Tab 1</vort-tab-pane>
                        <vort-tab-pane tab-key="2" tab="Tab 2">Content of Tab 2</vort-tab-pane>
                        <vort-tab-pane tab-key="3" tab="Tab 3">Content of Tab 3</vort-tab-pane>
                    </vort-tabs>
                </DemoBox>

                <DemoBox title="卡片式页签" description="另一种样式的页签，常用于容器顶部。" :code="cardCode">
                    <vort-tabs v-model:active-key="cardKey" type="card">
                        <vort-tab-pane tab-key="1" tab="Tab 1">Content of Tab 1</vort-tab-pane>
                        <vort-tab-pane tab-key="2" tab="Tab 2">Content of Tab 2</vort-tab-pane>
                        <vort-tab-pane tab-key="3" tab="Tab 3">Content of Tab 3</vort-tab-pane>
                    </vort-tabs>
                </DemoBox>

                <DemoBox
                    title="新增和关闭页签"
                    description="只有卡片样式的页签支持新增和关闭选项。使用 type='editable-card' 并监听 edit 事件实现。"
                    :code="editableCardCode"
                >
                    <vort-tabs v-model:active-key="editableKey" type="editable-card" @edit="handleEdit">
                        <vort-tab-pane v-for="pane in editablePanes" :key="pane.key" :tab-key="pane.key" :tab="pane.label">
                            {{ pane.content }}
                        </vort-tab-pane>
                    </vort-tabs>
                </DemoBox>

                <DemoBox title="配置式标签" description="通过 items 属性配置标签页，使用具名插槽渲染内容。" :code="itemsCode">
                    <vort-tabs v-model:active-key="itemsKey" :items="tabItems">
                        <template #1>Content of Tab 1 (items mode)</template>
                        <template #2>Content of Tab 2 (items mode)</template>
                        <template #3>Content of Tab 3 (items mode)</template>
                    </vort-tabs>
                </DemoBox>

                <DemoBox title="附加内容" description="可以在页签右边添加附加操作。" :code="extraCode">
                    <vort-tabs v-model:active-key="extraKey">
                        <template #tabBarExtraContent>
                            <Button size="small">Extra Action</Button>
                        </template>
                        <vort-tab-pane tab-key="1" tab="Tab 1">Content of Tab 1</vort-tab-pane>
                        <vort-tab-pane tab-key="2" tab="Tab 2">Content of Tab 2</vort-tab-pane>
                    </vort-tabs>
                </DemoBox>

                <DemoBox title="自定义标签内容" description="使用 #tab 插槽自定义标签内容，可以添加 Badge、Icon 等元素。" :code="customTabCode">
                    <div class="demo-col">
                        <div class="demo-row">
                            <span>Badge 数量：</span>
                            <vort-input-number v-model="badgeCount" :min="0" :max="99" style="width: 100px" />
                        </div>
                        <vort-tabs v-model:active-key="customTabKey">
                            <vort-tab-pane tab-key="1" tab="普通标签"> Content of Tab 1 </vort-tab-pane>
                            <vort-tab-pane tab-key="2">
                                <template #tab>
                                    <vort-badge :count="badgeCount" color="red">待审核</vort-badge>
                                </template>
                                Content of Tab 2 - 使用 #tab 插槽配合 Badge 组件
                            </vort-tab-pane>
                            <vort-tab-pane tab-key="3">
                                <template #tab>
                                    <span style="display: flex; align-items: center; gap: 4px">
                                        <vort-badge status="processing" />
                                        <span>处理中</span>
                                    </span>
                                </template>
                                Content of Tab 3 - 使用状态徽标
                            </vort-tab-pane>
                        </vort-tabs>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Tabs Props</h3>
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
                    <tr v-for="item in tabsPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">TabPane Props</h3>
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
                    <tr v-for="item in tabPanePropsData" :key="item.prop">
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

            <h3 class="demo-api-title">TabPane Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tabPaneSlotsData" :key="item.slot">
                        <td>
                            <code>{{ item.slot }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Tabs Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tabsEventsData" :key="item.event">
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
        </section>
    </div>
</template>

<style scoped>
/* 特有样式 */
.demo-tabs-position {
    min-height: 200px;
    padding: 16px;
    border: 1px solid var(--vort-border-secondary);
    border-radius: 8px;
}
</style>
