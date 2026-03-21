<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 基础使用
const value1 = ref(30);
const value2 = ref(40);

// 范围选择
const rangeValue = ref<[number, number]>([20, 50]);

// 带标记
const marksValue = ref(37);
const marks = {
    0: "0°C",
    26: "26°C",
    37: "37°C",
    100: {
        value: 100,
        label: "100°C"
    }
};

// 步长
const stepValue = ref(0);

// 垂直
const verticalValue = ref(30);
const verticalRangeValue = ref<[number, number]>([20, 50]);

// 自定义提示
const tooltipValue = ref(30);
const formatter = (value: number) => `${value}%`;

// 示例代码
const basicCode = `<script setup>
import { ref } from 'vue';
const value1 = ref(30);
const value2 = ref(40);
<\/script>

<template>
  <vort-slider v-model="value1" />
  <vort-slider v-model="value2" disabled />
</template>`;

const rangeCode = `<script setup>
import { ref } from 'vue';
const value = ref([20, 50]);
<\/script>

<template>
  <vort-slider v-model="value" range />
</template>`;

const marksCode = `<script setup>
import { ref } from 'vue';
const value = ref(37);
const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    value: 100,
    label: '100°C'
  }
};
<\/script>

<template>
  <vort-slider v-model="value" :marks="marks" />
</template>`;

const stepCode = `<script setup>
import { ref } from 'vue';
const value = ref(0);
<\/script>

<template>
  <vort-slider v-model="value" :min="0" :max="100" :step="10" dots />
</template>`;

const verticalCode = `<script setup>
import { ref } from 'vue';
const value = ref(30);
const rangeValue = ref([20, 50]);
<\/script>

<template>
  <vort-slider v-model="value" vertical />
  <vort-slider v-model="rangeValue" vertical range />
</template>`;

const tooltipCode = `<script setup>
import { ref } from 'vue';
const value = ref(30);
const formatter = (value) => \`\${value}%\`;
<\/script>

<template>
  <!-- 隐藏 Tooltip -->
  <vort-slider v-model="value" :tooltip="false" />

  <!-- 自定义 Tooltip 格式 -->
  <vort-slider v-model="value" :tip-formatter="formatter" />

  <!-- 始终显示 Tooltip -->
  <vort-slider v-model="value" tooltip="always" />
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "modelValue",
        desc: "当前值（单值模式）或范围值（范围模式 [min, max]）",
        type: "number | [number, number]",
        default: "-"
    },
    {
        prop: "min",
        desc: "最小值",
        type: "number",
        default: "0"
    },
    {
        prop: "max",
        desc: "最大值",
        type: "number",
        default: "100"
    },
    {
        prop: "step",
        desc: "步长，取值必须大于 0，并且可被 (max - min) 整除",
        type: "number",
        default: "1"
    },
    {
        prop: "disabled",
        desc: "是否禁用",
        type: "boolean",
        default: "false"
    },
    {
        prop: "tooltip",
        desc: "是否显示 Tooltip",
        type: "boolean | 'always'",
        default: "true"
    },
    {
        prop: "range",
        desc: "双滑块模式",
        type: "boolean",
        default: "false"
    },
    {
        prop: "vertical",
        desc: "是否垂直方向",
        type: "boolean",
        default: "false"
    },
    {
        prop: "reverse",
        desc: "是否反向坐标轴",
        type: "boolean",
        default: "false"
    },
    {
        prop: "marks",
        desc: "刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内",
        type: "Record<number, string | { label: string }>",
        default: "-"
    },
    {
        prop: "dots",
        desc: "是否只能拖拽到刻度上",
        type: "boolean",
        default: "false"
    },
    {
        prop: "included",
        desc: "marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列",
        type: "boolean",
        default: "true"
    },
    {
        prop: "tipFormatter",
        desc: "格式化 Tooltip 内容，设为 null 时隐藏 Tooltip",
        type: "((value: number) => string) | null",
        default: "-"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "update:modelValue",
        desc: "值变化时触发",
        params: "value: number | [number, number]"
    },
    {
        event: "change",
        desc: "值变化时触发（拖拽过程中实时触发）",
        params: "value: number | [number, number]"
    },
    {
        event: "afterChange",
        desc: "值变化完成后触发（松开鼠标时触发）",
        params: "value: number | [number, number]"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Slider 滑动输入条</h1>
            <p class="demo-page-desc">滑动型输入器，展示当前值和可选范围。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <p class="demo-section-desc">当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。</p>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本使用" description="基本滑动条。当 disabled 为 true 时，滑块处于不可用状态。" :code="basicCode">
                    <div class="w-full flex flex-col gap-6">
                        <div>
                            <p class="text-sm text-gray-600 mb-2">普通滑块：{{ value1 }}</p>
                            <vort-slider v-model="value1" />
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-2">禁用状态：{{ value2 }}</p>
                            <vort-slider v-model="value2" disabled />
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="范围选择" description="通过设置 range 为 true 启用双滑块模式。" :code="rangeCode">
                    <div class="w-full">
                        <p class="text-sm text-gray-600 mb-2">范围值：[{{ rangeValue[0] }}, {{ rangeValue[1] }}]</p>
                        <vort-slider v-model="rangeValue" range />
                    </div>
                </DemoBox>

                <DemoBox title="带标记的滑块" description="使用 marks 属性标注分段式滑块，使用 value 可以自定义节点内容。" :code="marksCode">
                    <div class="w-full">
                        <p class="text-sm text-gray-600 mb-2">当前温度：{{ marksValue }}°C</p>
                        <vort-slider v-model="marksValue" :marks="marks" />
                    </div>
                </DemoBox>

                <DemoBox title="步长" description="通过 step 设置步长，dots 为 true 时会显示步长点。" :code="stepCode">
                    <div class="w-full flex flex-col gap-6">
                        <div>
                            <p class="text-sm text-gray-600 mb-2">步长为 10：{{ stepValue }}</p>
                            <vort-slider v-model="stepValue" :min="0" :max="100" :step="10" />
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-2">带刻度点：{{ stepValue }}</p>
                            <vort-slider v-model="stepValue" :min="0" :max="100" :step="10" dots />
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="垂直方向" description="通过设置 vertical 为 true 将滑块改为垂直方向。" :code="verticalCode">
                    <div class="flex gap-12">
                        <div class="flex flex-col">
                            <p class="text-sm text-gray-600 mb-4">单值：{{ verticalValue }}</p>
                            <vort-slider v-model="verticalValue" vertical style="height: 200px" />
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sm text-gray-600 mb-4">范围：[{{ verticalRangeValue[0] }}, {{ verticalRangeValue[1] }}]</p>
                            <vort-slider v-model="verticalRangeValue" vertical range style="height: 200px" />
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="自定义提示" description="可以通过 tooltip 控制 Tooltip 的显示，通过 tipFormatter 自定义 Tooltip 格式。" :code="tooltipCode">
                    <div class="w-full flex flex-col gap-6">
                        <div>
                            <p class="text-sm text-gray-600 mb-2">隐藏 Tooltip：{{ tooltipValue }}</p>
                            <vort-slider v-model="tooltipValue" :tooltip="false" />
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-2">自定义格式：{{ tooltipValue }}%</p>
                            <vort-slider v-model="tooltipValue" :tip-formatter="formatter" />
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-2">始终显示：{{ tooltipValue }}</p>
                            <vort-slider v-model="tooltipValue" tooltip="always" />
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
        </section>
    </div>
</template>

<!-- 公共样式已在 demo.css 中定义 -->
