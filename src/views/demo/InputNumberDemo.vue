<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { SettingsIcon, DollarSign } from "lucide-vue-next";

// 示例数据
const basicValue = ref<number | null>(3);
const sizeValue1 = ref<number | null>(10);
const sizeValue2 = ref<number | null>(10);
const sizeValue3 = ref<number | null>(10);
const minMaxValue = ref<number | null>(1);
const stepValue = ref<number | null>(0);
const decimalValue = ref<number | null>(0);
const precisionValue = ref<number | null>(null);
const formatterValue = ref<number | null>(1000);
const disabledValue = ref<number | null>(100);
const readonlyValue = ref<number | null>(200);
const statusValue1 = ref<number | null>(null);
const statusValue2 = ref<number | null>(null);
const prefixValue = ref<number | null>(100);
const addonValue1 = ref<number | null>(100);
const addonValue2 = ref<number | null>(50);
const addonValue3 = ref<number | null>(1000);
const borderedValue = ref<number | null>(50);

// Compact 模式示例数据
const compactValue1 = ref<number | null>(100);
const compactValue2 = ref<number | null>(50);
const compactValue3 = ref<number | null>(1000);
const compactCurrency = ref("CNY");
const compactUnit = ref("kg");
const compactAreaCode = ref("+86");

// Compact 模式选项
const currencyOptions = [
    { label: "CNY ¥", value: "CNY" },
    { label: "USD $", value: "USD" },
    { label: "EUR €", value: "EUR" },
    { label: "GBP £", value: "GBP" }
];

const unitOptions = [
    { label: "kg", value: "kg" },
    { label: "g", value: "g" },
    { label: "lb", value: "lb" },
    { label: "oz", value: "oz" }
];

const areaCodeOptions = [
    { label: "+86 中国", value: "+86" },
    { label: "+1 美国", value: "+1" },
    { label: "+44 英国", value: "+44" },
    { label: "+81 日本", value: "+81" }
];
const noControlsValue = ref<number | null>(10);
const keyboardValue = ref<number | null>(5);

// 示例代码
const basicCode = `<script setup>
import { ref } from 'vue';
const value = ref(3);
<\/script>

<template>
  <vort-input-number v-model="value" />
</template>`;

const sizeCode = `<template>
  <vort-input-number v-model="value" size="large" />
  <vort-input-number v-model="value" />
  <vort-input-number v-model="value" size="small" />
</template>`;

const minMaxCode = `<script setup>
import { ref } from 'vue';
const value = ref(1);
<\/script>

<template>
  <vort-input-number v-model="value" :min="1" :max="10" />
</template>`;

const stepCode = `<script setup>
import { ref } from 'vue';
const value = ref(0);
<\/script>

<template>
  <vort-input-number v-model="value" :min="0" :max="10" :step="0.1" />
</template>`;

const decimalCode = `<script setup>
import { ref } from 'vue';
const value = ref(0);
<\/script>

<template>
  <vort-input-number v-model="value" :step="0.01" :precision="2" />
</template>`;

const formatterCode = `<script setup>
import { ref } from 'vue';
const value = ref(1000);

const formatter = (value) => \`$ \${value}\`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
const parser = (value) => value.replace(/\\$\\s?|(,*)/g, '');
<\/script>

<template>
  <vort-input-number
    v-model="value"
    :formatter="formatter"
    :parser="parser"
  />
</template>`;

const disabledCode = `<template>
  <vort-input-number v-model="value" disabled />
  <vort-input-number v-model="value" read-only />
</template>`;

const statusCode = `<template>
  <vort-input-number status="error" placeholder="错误状态" />
  <vort-input-number status="warning" placeholder="警告状态" />
</template>`;

const prefixCode = `<script setup>
import { DollarSign } from 'lucide-vue-next';
<\/script>

<template>
  <vort-input-number v-model="value">
    <template #prefix>
      <DollarSign class="w-4 h-4" />
    </template>
  </vort-input-number>
</template>`;

const addonCode = `<template>
  <!-- 前置标签 -->
  <vort-input-number v-model="value1">
    <template #addonBefore>¥</template>
  </vort-input-number>

  <!-- 后置标签 -->
  <vort-input-number v-model="value2">
    <template #addonAfter>%</template>
  </vort-input-number>

  <!-- 前置 + 后置标签 -->
  <vort-input-number v-model="value3">
    <template #addonBefore>价格</template>
    <template #addonAfter>元</template>
  </vort-input-number>
</template>`;

const borderedCode = `<template>
  <vort-input-number v-model="value" :bordered="false" />
</template>`;

const compactCode = `<script setup>
import { ref } from 'vue';

const price = ref(100);
const weight = ref(50);
const phone = ref(1234567890);
const currency = ref('CNY');
const unit = ref('kg');
const areaCode = ref('+86');

const currencyOptions = [
  { label: 'CNY ¥', value: 'CNY' },
  { label: 'USD $', value: 'USD' },
  { label: 'EUR €', value: 'EUR' }
];

const unitOptions = [
  { label: 'kg', value: 'kg' },
  { label: 'g', value: 'g' },
  { label: 'lb', value: 'lb' }
];

const areaCodeOptions = [
  { label: '+86 中国', value: '+86' },
  { label: '+1 美国', value: '+1' },
  { label: '+44 英国', value: '+44' }
];
<\/script>

<template>
  <!-- 前置 Select（货币选择） -->
  <vort-input-number v-model="price" compact placeholder="请输入金额">
    <template #addonBefore>
      <vort-select v-model="currency" :bordered="false" :options="currencyOptions" style="width: 100px" />
    </template>
  </vort-input-number>

  <!-- 后置 Select（单位选择） -->
  <vort-input-number v-model="weight" compact placeholder="请输入重量">
    <template #addonAfter>
      <vort-select v-model="unit" :bordered="false" :options="unitOptions" style="width: 80px" />
    </template>
  </vort-input-number>
</template>`;

const noControlsCode = `<template>
  <vort-input-number v-model="value" :controls="false" />
</template>`;

const keyboardCode = `<!-- 使用键盘上下箭头调整值（默认开启） -->
<template>
  <vort-input-number v-model="value" :keyboard="true" />
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "v-model",
        desc: "当前值",
        type: "number | null",
        default: "-"
    },
    {
        prop: "defaultValue",
        desc: "默认值",
        type: "number",
        default: "-"
    },
    {
        prop: "min",
        desc: "最小值",
        type: "number",
        default: "-∞"
    },
    {
        prop: "max",
        desc: "最大值",
        type: "number",
        default: "+∞"
    },
    {
        prop: "step",
        desc: "每次改变步数，可以为小数",
        type: "number | string",
        default: "1"
    },
    {
        prop: "precision",
        desc: "数值精度（小数位数）",
        type: "number",
        default: "-"
    },
    {
        prop: "size",
        desc: "输入框尺寸",
        type: "'large' | 'middle' | 'small'",
        default: "'middle'"
    },
    {
        prop: "placeholder",
        desc: "占位提示文字",
        type: "string",
        default: "-"
    },
    {
        prop: "disabled",
        desc: "是否禁用",
        type: "boolean",
        default: "false"
    },
    {
        prop: "readOnly",
        desc: "是否只读",
        type: "boolean",
        default: "false"
    },
    {
        prop: "bordered",
        desc: "是否有边框",
        type: "boolean",
        default: "true"
    },
    {
        prop: "status",
        desc: "设置校验状态",
        type: "'error' | 'warning'",
        default: "-"
    },
    {
        prop: "controls",
        desc: "是否显示增减按钮",
        type: "boolean",
        default: "true"
    },
    {
        prop: "keyboard",
        desc: "是否启用键盘快捷键（↑↓ 调整值）",
        type: "boolean",
        default: "true"
    },
    {
        prop: "formatter",
        desc: "指定输入框展示值的格式",
        type: "(value: number | string) => string",
        default: "-"
    },
    {
        prop: "parser",
        desc: "指定从 formatter 里转换回数字的方式",
        type: "(value: string) => number | string",
        default: "-"
    },
    {
        prop: "compact",
        desc: "紧凑模式，用于 addonBefore/addonAfter 放置 Select 等组件",
        type: "boolean",
        default: "false"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "update:modelValue",
        desc: "值变化时触发（v-model）",
        params: "(value: number | null) => void"
    },
    {
        event: "change",
        desc: "值变化时触发",
        params: "(value: number | null) => void"
    },
    {
        event: "step",
        desc: "点击上下按钮时触发",
        params: "(value: number | null, info: { offset: number; type: 'up' | 'down' }) => void"
    },
    {
        event: "focus",
        desc: "获取焦点时触发",
        params: "(event: FocusEvent) => void"
    },
    {
        event: "blur",
        desc: "失去焦点时触发",
        params: "(event: FocusEvent) => void"
    },
    {
        event: "pressEnter",
        desc: "按下回车键时触发",
        params: "(event: KeyboardEvent) => void"
    }
];

// Slots 表格数据
const slotsData = [
    {
        slot: "prefix",
        desc: "输入框前缀图标"
    },
    {
        slot: "suffix",
        desc: "输入框后缀内容"
    },
    {
        slot: "addonBefore",
        desc: "前置标签"
    },
    {
        slot: "addonAfter",
        desc: "后置标签"
    }
];

// 格式化函数
const formatter = (value: number | string | undefined) => {
    if (value === undefined || value === "") return "";
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const parser = (value: string | undefined) => {
    if (!value) return "";
    return value.replace(/\$\s?|(,*)/g, "");
};
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">InputNumber 数字输入框</h1>
            <p class="demo-page-desc">通过鼠标或键盘输入范围内的数值。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当需要获取标准数值时。</li>
                <li>需要限制用户输入数值的范围时。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本使用" description="数字输入框的基本用法。" :code="basicCode">
                    <div class="demo-input-row">
                        <vort-input-number v-model="basicValue" />
                        <span class="demo-value">当前值: {{ basicValue }}</span>
                    </div>
                </DemoBox>

                <DemoBox title="三种大小" description="数字输入框有三种尺寸：大、中（默认）、小。" :code="sizeCode">
                    <div class="demo-input-col">
                        <vort-input-number v-model="sizeValue1" size="large" placeholder="large" />
                        <vort-input-number v-model="sizeValue2" placeholder="default" />
                        <vort-input-number v-model="sizeValue3" size="small" placeholder="small" />
                    </div>
                </DemoBox>

                <DemoBox title="限制范围" description="使用 min 和 max 属性限制数值范围。" :code="minMaxCode">
                    <div class="demo-input-row">
                        <vort-input-number v-model="minMaxValue" :min="1" :max="10" />
                        <span class="demo-value">范围: 1 ~ 10</span>
                    </div>
                </DemoBox>

                <DemoBox title="步数" description="使用 step 属性设置每次改变的步数，可以是小数。" :code="stepCode">
                    <div class="demo-input-row">
                        <vort-input-number v-model="stepValue" :min="0" :max="10" :step="0.1" />
                        <span class="demo-value">步数: 0.1</span>
                    </div>
                </DemoBox>

                <DemoBox title="小数" description="使用 precision 属性指定小数位数。" :code="decimalCode">
                    <div class="demo-input-row">
                        <vort-input-number v-model="decimalValue" :step="0.01" :precision="2" />
                        <span class="demo-value">精度: 2位小数</span>
                    </div>
                </DemoBox>

                <DemoBox title="格式化展示" description="通过 formatter 和 parser 自定义输入框展示值的格式。" :code="formatterCode">
                    <div class="demo-input-row">
                        <vort-input-number v-model="formatterValue" :formatter="formatter" :parser="parser" />
                    </div>
                </DemoBox>

                <DemoBox title="前缀图标" description="在输入框前添加前缀图标。" :code="prefixCode">
                    <div class="demo-input-row">
                        <vort-input-number v-model="prefixValue">
                            <template #prefix>
                                <DollarSign class="w-4 h-4" />
                            </template>
                        </vort-input-number>
                    </div>
                </DemoBox>

                <DemoBox title="前置/后置标签" description="使用 addonBefore 和 addonAfter 添加前置/后置标签。" :code="addonCode">
                    <div class="demo-input-col">
                        <vort-input-number v-model="addonValue1">
                            <template #addonBefore>¥</template>
                        </vort-input-number>
                        <vort-input-number v-model="addonValue2">
                            <template #addonAfter>%</template>
                        </vort-input-number>
                        <vort-input-number v-model="addonValue3">
                            <template #addonBefore>价格</template>
                            <template #addonAfter>元</template>
                        </vort-input-number>
                    </div>
                </DemoBox>

                <DemoBox
                    title="紧凑模式（Addon 支持 Select）"
                    description='使用 compact 属性开启紧凑模式，可在 addonBefore/addonAfter 中放置 Select 组件。Select 需设置 :bordered="false"。'
                    :code="compactCode"
                >
                    <div class="demo-input-col">
                        <vort-input-number v-model="compactValue1" compact placeholder="请输入金额">
                            <template #addonBefore>
                                <vort-select v-model="compactCurrency" :bordered="false" :options="currencyOptions" style="width: 100px" />
                            </template>
                        </vort-input-number>
                        <vort-input-number v-model="compactValue2" compact placeholder="请输入重量">
                            <template #addonAfter>
                                <vort-select v-model="compactUnit" :bordered="false" :options="unitOptions" style="width: 80px" />
                            </template>
                        </vort-input-number>
                    </div>
                </DemoBox>

                <DemoBox title="禁用和只读" description="disabled 和 readOnly 状态的数字输入框。" :code="disabledCode">
                    <div class="demo-input-col">
                        <vort-input-number v-model="disabledValue" disabled />
                        <vort-input-number v-model="readonlyValue" read-only />
                    </div>
                </DemoBox>

                <DemoBox title="输入框状态" description="使用 status 属性设置输入框的校验状态。" :code="statusCode">
                    <div class="demo-input-col">
                        <vort-input-number v-model="statusValue1" status="error" placeholder="错误状态" />
                        <vort-input-number v-model="statusValue2" status="warning" placeholder="警告状态" />
                    </div>
                </DemoBox>

                <DemoBox title="无边框" description="没有边框的数字输入框。" :code="borderedCode">
                    <div class="demo-input-row">
                        <vort-input-number v-model="borderedValue" :bordered="false" />
                    </div>
                </DemoBox>

                <DemoBox title="隐藏控制按钮" description="设置 controls 为 false 隐藏增减按钮。" :code="noControlsCode">
                    <div class="demo-input-row">
                        <vort-input-number v-model="noControlsValue" :controls="false" />
                    </div>
                </DemoBox>

                <DemoBox title="键盘行为" description="使用键盘上下箭头可以调整数值（默认开启）。" :code="keyboardCode">
                    <div class="demo-input-row">
                        <vort-input-number v-model="keyboardValue" placeholder="使用 ↑↓ 调整" />
                        <span class="demo-value">聚焦后按 ↑↓ 键</span>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">InputNumber Props</h3>
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

            <h3 class="demo-api-title">InputNumber Slots</h3>
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

            <h3 class="demo-api-title">InputNumber Events</h3>
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
        </section>
    </div>
</template>

<style scoped>
/* ===== 特有样式 ===== */

/* Demo 布局（覆盖公共样式，添加 align-items） */
.demo-input-row {
    display: flex;
    align-items: center;
    gap: 16px;
}

.demo-input-row .vort-input-number {
    width: 180px;
}

/* 覆盖公共样式，使用更窄的 max-width */
.demo-input-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 300px;
}

.demo-value {
    font-size: 14px;
    color: var(--vort-text-tertiary);
}
</style>
