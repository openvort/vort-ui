<script setup lang="ts">
import { ref, h } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { List, LayoutGrid, Table2 } from "lucide-vue-next";

// ==================== 演示数据 ====================

// 基本用法
const basicValue = ref("Daily");

// 尺寸演示
const sizeValue = ref("middle");

// Block 模式
const blockValue = ref("Map");

// 圆角形状
const roundValue = ref("Daily");

// 禁用状态
const disabledValue = ref("Daily");
const partialDisabledValue = ref("Daily");

// 受控模式
const controlledValue = ref("Daily");

// 带图标
const iconValue = ref("list");
const iconOnlyValue = ref("list");

// 动态加载
const dynamicValue = ref("Daily");
const moreLoaded = ref(false);
const dynamicOptions = ref(["Daily", "Weekly", "Monthly"]);
const loadMoreOptions = () => {
    moreLoaded.value = true;
    dynamicOptions.value = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"];
};

// 自定义渲染
const customValue = ref("spring");

// ==================== 代码示例 ====================

const basicCode = `<script setup>
const value = ref('Daily');
<\/script>

<template>
    <vort-segmented v-model="value" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" />
</template>`;

const sizeCode = `<template>
    <vort-segmented size="large" :options="['Daily', 'Weekly', 'Monthly']" />
    <vort-segmented size="middle" :options="['Daily', 'Weekly', 'Monthly']" />
    <vort-segmented size="small" :options="['Daily', 'Weekly', 'Monthly']" />
</template>`;

const blockCode = `<template>
    <vort-segmented block :options="['Map', 'Transit', 'Satellite']" />
</template>`;

const roundCode = `<template>
    <vort-segmented shape="round" :options="['Daily', 'Weekly', 'Monthly']" />
</template>`;

const disabledCode = `<template>
    <!-- 全部禁用 -->
    <vort-segmented disabled :options="['Daily', 'Weekly', 'Monthly']" />

    <!-- 部分禁用 -->
    <vort-segmented
        :options="[
            { label: 'Daily', value: 'Daily' },
            { label: 'Weekly', value: 'Weekly', disabled: true },
            { label: 'Monthly', value: 'Monthly' }
        ]"
    />
</template>`;

const controlledCode = `<script setup>
const value = ref('Daily');
<\/script>

<template>
    <vort-segmented v-model="value" :options="['Daily', 'Weekly', 'Monthly']" @change="onValueChange" />
    <p>当前值：{{ value }}</p>
</template>`;

const iconCode = `<script setup>
import { List, LayoutGrid } from "lucide-vue-next";

const iconOptions = [
    { label: '列表', value: 'list', icon: List },
    { label: '看板', value: 'kanban', icon: LayoutGrid },
];
<\/script>

<template>
    <vort-segmented v-model="value" :options="iconOptions" />
</template>`;

const iconOnlyCode = `<template>
    <vort-segmented
        v-model="value"
        :options="[
            { value: 'list', icon: List },
            { value: 'kanban', icon: LayoutGrid },
            { value: 'table', icon: Table2 },
        ]"
    />
</template>`;

const dynamicCode = `<script setup>
const options = ref(['Daily', 'Weekly', 'Monthly']);
const loadMore = () => {
    options.value = [...options.value, 'Quarterly', 'Yearly'];
};
<\/script>

<template>
    <vort-segmented :options="options" />
    <vort-button @click="loadMore">加载更多</vort-button>
</template>`;

const customCode = `<script setup>
const customOptions = [
    { value: 'spring', label: 'Spring', description: 'Jan-Mar' },
    { value: 'summer', label: 'Summer', description: 'Apr-Jun' },
];
<\/script>

<template>
    <vort-segmented :options="customOptions">
        <template #label="{ option }">
            <div class="text-center">
                <div>{{ option.label }}</div>
                <div class="text-xs text-gray-400">{{ option.description }}</div>
            </div>
        </template>
    </vort-segmented>
</template>`;

// ==================== API 数据 ====================

const propsData = [
    { prop: "v-model / modelValue", desc: "当前选中的值", type: "string | number", default: "-" },
    { prop: "defaultValue", desc: "默认选中的值", type: "string | number", default: "-" },
    { prop: "options", desc: "选项数据", type: "(string | number | SegmentedOption)[]", default: "[]" },
    { prop: "disabled", desc: "是否禁用所有选项", type: "boolean", default: "false" },
    { prop: "size", desc: "尺寸", type: "'large' | 'middle' | 'small'", default: "'middle'" },
    { prop: "block", desc: "是否填充父容器宽度", type: "boolean", default: "false" },
    { prop: "shape", desc: "形状", type: "'default' | 'round'", default: "'default'" },
    { prop: "name", desc: "input[type='radio'] 的 name 属性", type: "string", default: "-" }
];

const optionData = [
    { prop: "value", desc: "选项值", type: "string | number", default: "-" },
    { prop: "label", desc: "显示文本", type: "string", default: "-" },
    { prop: "icon", desc: "图标组件", type: "Component", default: "-" },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    { prop: "className", desc: "额外的类名", type: "string", default: "-" }
];

const eventsData = [
    { event: "update:modelValue", desc: "选中值改变时触发（用于 v-model）", params: "(value: string | number) => void" },
    { event: "change", desc: "选中值改变时触发", params: "(value: string | number) => void" }
];

const slotsData = [
    { slot: "icon", desc: "自定义图标，作用域：{ option, selected }" },
    { slot: "label", desc: "自定义标签内容，作用域：{ option, selected }" }
];

// 带图标的选项
const iconOptions = [
    { label: "列表", value: "list", icon: List },
    { label: "看板", value: "kanban", icon: LayoutGrid }
];

const iconOnlyOptions = [
    { value: "list", icon: List },
    { value: "kanban", icon: LayoutGrid },
    { value: "table", icon: Table2 }
];

// 自定义渲染选项
const customOptions = [
    { value: "spring", label: "Spring", description: "Jan-Mar" },
    { value: "summer", label: "Summer", description: "Apr-Jun" },
    { value: "autumn", label: "Autumn", description: "Jul-Sept" },
    { value: "winter", label: "Winter", description: "Oct-Dec" }
];
</script>

<template>
    <div class="demo-page">
        <!-- 页面头部 -->
        <header class="demo-page-header">
            <h1 class="demo-page-title">Segmented 分段控制器</h1>
            <p class="demo-page-desc">分段控制器用于在多个选项中选择单个选项，类似于 Radio 按钮组但更紧凑。</p>
        </header>

        <!-- 何时使用 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>需要在多个选项中选择单个选项时</li>
                <li>切换选项后，关联区域的内容会发生变化</li>
                <li>需要比 Radio 按钮更紧凑的展示形式</li>
            </ul>
        </section>

        <!-- 代码演示 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基本用法 -->
                <DemoBox title="基本用法" description="最简单的用法，使用 options 属性设置选项。" :code="basicCode">
                    <vort-segmented v-model="basicValue" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" />
                </DemoBox>

                <!-- 三种尺寸 -->
                <DemoBox title="三种尺寸" description="提供 large、middle、small 三种尺寸，默认为 middle。" :code="sizeCode">
                    <div class="flex flex-col gap-4">
                        <vort-segmented v-model="sizeValue" size="large" :options="['large', 'middle', 'small']" />
                        <vort-segmented v-model="sizeValue" size="middle" :options="['large', 'middle', 'small']" />
                        <vort-segmented v-model="sizeValue" size="small" :options="['large', 'middle', 'small']" />
                    </div>
                </DemoBox>

                <!-- Block 模式 -->
                <DemoBox title="Block 分段控制器" description="设置 block 属性可以使 Segmented 填充父容器宽度。" :code="blockCode">
                    <vort-segmented v-model="blockValue" block :options="['Map', 'Transit', 'Satellite']" />
                </DemoBox>

                <!-- 圆角形状 -->
                <DemoBox title="圆角形状" description="设置 shape='round' 可以使用圆角形状。" :code="roundCode">
                    <vort-segmented v-model="roundValue" shape="round" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" />
                </DemoBox>

                <!-- 禁用状态 -->
                <DemoBox title="禁用状态" description="可以禁用整个组件，也可以禁用单个选项。" :code="disabledCode">
                    <div class="flex flex-col gap-4">
                        <vort-segmented v-model="disabledValue" disabled :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" />
                        <vort-segmented
                            v-model="partialDisabledValue"
                            :options="[
                                { label: 'Daily', value: 'Daily' },
                                { label: 'Weekly', value: 'Weekly', disabled: true },
                                { label: 'Monthly', value: 'Monthly' },
                                { label: 'Quarterly', value: 'Quarterly', disabled: true },
                                { label: 'Yearly', value: 'Yearly' }
                            ]"
                        />
                    </div>
                </DemoBox>

                <!-- 受控模式 -->
                <DemoBox title="受控模式" description="使用 v-model 实现受控模式。" :code="controlledCode">
                    <div class="flex flex-col gap-3">
                        <vort-segmented v-model="controlledValue" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" />
                        <p class="text-sm text-[var(--vort-text-secondary)]">当前选中：{{ controlledValue }}</p>
                    </div>
                </DemoBox>

                <!-- 带图标 -->
                <DemoBox title="带图标" description="可以为选项设置图标。" :code="iconCode">
                    <vort-segmented v-model="iconValue" :options="iconOptions" />
                </DemoBox>

                <!-- 仅图标 -->
                <DemoBox title="仅图标" description="只显示图标不显示文字。" :code="iconOnlyCode">
                    <vort-segmented v-model="iconOnlyValue" :options="iconOnlyOptions" />
                </DemoBox>

                <!-- 动态加载 -->
                <DemoBox title="动态加载" description="动态加载选项数据。" :code="dynamicCode">
                    <div class="flex items-center gap-4">
                        <vort-segmented v-model="dynamicValue" :options="dynamicOptions" />
                        <vort-button v-if="!moreLoaded" size="small" @click="loadMoreOptions">加载更多</vort-button>
                    </div>
                </DemoBox>

                <!-- 自定义渲染 -->
                <DemoBox title="自定义渲染" description="通过插槽自定义选项的渲染内容。" :code="customCode">
                    <vort-segmented v-model="customValue" :options="customOptions">
                        <template #label="{ option }">
                            <div class="text-center py-1">
                                <div class="font-medium">{{ option.label }}</div>
                                <div class="text-xs text-[var(--vort-text-tertiary)]">{{ (option as any).description }}</div>
                            </div>
                        </template>
                    </vort-segmented>
                </DemoBox>
            </div>
        </section>

        <!-- API 文档 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Segmented Props</h3>
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

            <h3 class="demo-api-title">SegmentedOption</h3>
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
                    <tr v-for="item in optionData" :key="item.prop">
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

            <h3 class="demo-api-title">Segmented Events</h3>
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

            <h3 class="demo-api-title">Segmented Slots</h3>
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
/* 特有样式 */
.demo-btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
</style>
