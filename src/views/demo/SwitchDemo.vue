<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 示例数据
const basicChecked = ref(false);
const smallChecked = ref(true);
const textChecked = ref(true);

// 示例代码
const basicCode = `<script setup>
import { ref } from 'vue';
const checked = ref(false);
<\/script>

<template>
  <vort-switch v-model:checked="checked" />
</template>`;

const disabledCode = `<template>
  <vort-switch disabled />
  <vort-switch disabled :checked="true" />
</template>`;

const loadingCode = `<script setup>
import { ref } from 'vue';
const checked = ref(false);
<\/script>

<template>
  <vort-switch v-model:checked="checked" loading />
  <vort-switch v-model:checked="checked" loading :checked="true" />
</template>`;

const sizeCode = `<template>
  <vort-switch />
  <vort-switch size="small" />
</template>`;

const textCode = `<script setup>
import { ref } from 'vue';
const checked = ref(true);
<\/script>

<template>
  <vort-switch v-model:checked="checked" checked-children="开" un-checked-children="关" />
  <vort-switch v-model:checked="checked" checked-children="1" un-checked-children="0" />
  <vort-switch v-model:checked="checked">
    <template #checkedChildren>✓</template>
    <template #unCheckedChildren>✕</template>
  </vort-switch>
</template>`;

// Props 表格数据
const propsData = [
    { prop: "v-model:checked", desc: "指定当前是否选中", type: "boolean", default: "false" },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    { prop: "loading", desc: "加载中状态", type: "boolean", default: "false" },
    { prop: "size", desc: "开关大小", type: "'default' | 'small'", default: "'default'" },
    { prop: "checkedChildren", desc: "选中时的内容", type: "string", default: "-" },
    { prop: "unCheckedChildren", desc: "非选中时的内容", type: "string", default: "-" },
    { prop: "beforeChange", desc: "切换前的钩子，返回 false 阻止切换", type: "() => Promise<boolean> | boolean", default: "-" }
];

const eventsData = [
    { event: "update:checked", desc: "选中状态变化时触发（v-model）", params: "(value: SwitchValue) => void" },
    { event: "change", desc: "变化时的回调函数", params: "(value: SwitchValue, event: MouseEvent) => void" }
];

const slotsData = [
    { slot: "checkedChildren", desc: "选中时的内容（优先于 prop）" },
    { slot: "unCheckedChildren", desc: "非选中时的内容（优先于 prop）" }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Switch 开关</h1>
            <p class="demo-page-desc">开关选择器，用于在两种状态间进行切换。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>需要表示开关状态/两种状态之间的切换时。</li>
                <li>和 Checkbox 的区别是，切换 Switch 会直接触发状态改变，而 Checkbox 一般用于状态标记，需要和提交操作配合。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本使用" description="最简单的用法。" :code="basicCode">
                    <vort-switch v-model:checked="basicChecked" />
                    <p class="demo-result">当前状态: {{ basicChecked ? "开" : "关" }}</p>
                </DemoBox>

                <DemoBox title="禁用状态" description="Switch 设置 disabled 属性即可禁用。" :code="disabledCode">
                    <div class="demo-row">
                        <vort-switch disabled />
                        <vort-switch disabled :checked="true" />
                    </div>
                </DemoBox>

                <DemoBox title="加载中" description="标识开关操作仍在执行中。" :code="loadingCode">
                    <div class="demo-row">
                        <vort-switch loading />
                        <vort-switch loading :checked="true" />
                    </div>
                </DemoBox>

                <DemoBox title="两种大小" description="size='small' 表示小号开关。" :code="sizeCode">
                    <div class="demo-row">
                        <vort-switch v-model:checked="smallChecked" />
                        <vort-switch v-model:checked="smallChecked" size="small" />
                    </div>
                </DemoBox>

                <DemoBox title="文字和图标" description="带有文字或图标。使用 checkedChildren 和 uncheckedChildren 属性，或者使用同名插槽。" :code="textCode">
                    <div class="demo-col">
                        <div class="demo-row">
                            <vort-switch v-model:checked="textChecked" checked-children="开" un-checked-children="关" />
                            <vort-switch v-model:checked="textChecked" checked-children="1" un-checked-children="0" />
                        </div>
                        <div class="demo-row">
                            <vort-switch v-model:checked="textChecked">
                                <template #checkedChildren>✓</template>
                                <template #unCheckedChildren>✕</template>
                            </vort-switch>
                            <vort-switch v-model:checked="textChecked" size="small" checked-children="开" un-checked-children="关" />
                        </div>
                        <div class="demo-row">
                            <vort-switch v-model:checked="textChecked" checked-children="开启" un-checked-children="关闭" />
                            <vort-switch v-model:checked="textChecked" size="small" checked-children="开启" un-checked-children="关闭" />
                        </div>
                    </div>
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

            <h3 class="demo-api-title">Events</h3>
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
/* 特有样式：结果展示需要额外的顶部间距 */
.demo-result {
    margin-top: 12px;
}
</style>
