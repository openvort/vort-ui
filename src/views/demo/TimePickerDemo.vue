<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 状态值
const time1 = ref<Date | null>(null);
const time2 = ref<Date | null>(new Date());
const time3 = ref<Date | null>(null);
const time4 = ref<Date | null>(null);
const time5 = ref<Date | null>(null);
const time6 = ref<Date | null>(null);
const time7 = ref<Date | null>(null);
const time8 = ref<Date | null>(null);
const time9 = ref<Date | null>(null);
const time10 = ref<Date | null>(null);
const time11 = ref<Date | null>(null);
const time12 = ref<Date | null>(null);
const time13 = ref<Date | null>(null);

// valueFormat 示例
const valueFormatTime1 = ref<string>("");
const valueFormatTime2 = ref<string>("14:30:00");

// 禁用小时
const disabledHours = (): number[] => {
    return [0, 1, 2, 3, 4, 5, 22, 23];
};

// 禁用分钟
const disabledMinutes = (selectedHour: number): number[] => {
    if (selectedHour === 12) {
        return [0, 30];
    }
    return [];
};

// 禁用秒
const disabledSeconds = (_selectedHour: number, _selectedMinute: number): number[] => {
    return [0, 59];
};

// 示例代码
const basicCode = `<script setup>
import { ref } from "vue";

const time = ref(null);
<\/script>

<template>
  <vort-time-picker v-model="time" placeholder="请选择时间" />
</template>`;

const defaultValueCode = `<script setup>
import { ref } from "vue";

const time = ref(new Date());
<\/script>

<template>
  <vort-time-picker v-model="time" />
</template>`;

const sizeCode = `<template>
  <vort-time-picker v-model="time1" size="large" placeholder="Large" />
  <vort-time-picker v-model="time2" size="middle" placeholder="Middle" />
  <vort-time-picker v-model="time3" size="small" placeholder="Small" />
</template>`;

const disabledCode = `<template>
  <vort-time-picker disabled placeholder="禁用状态" />
</template>`;

const formatCode = `<script setup>
import { ref } from "vue";

const time = ref(new Date());
<\/script>

<template>
  <vort-time-picker v-model="time" format="HH:mm" :show-second="false" />
  <vort-time-picker v-model="time" format="HH时mm分ss秒" />
</template>`;

const statusCode = `<template>
  <vort-time-picker status="error" placeholder="Error" />
  <vort-time-picker status="warning" placeholder="Warning" />
</template>`;

const use12HoursCode = `<script setup>
import { ref } from "vue";

const time = ref(null);
<\/script>

<template>
  <vort-time-picker v-model="time" :use12Hours="true" format="hh:mm:ss A" />
</template>`;

const stepCode = `<script setup>
import { ref } from "vue";

const time = ref(null);
<\/script>

<template>
  <vort-time-picker
    v-model="time"
    :hour-step="2"
    :minute-step="15"
    :second-step="10"
  />
</template>`;

const hideSecondCode = `<script setup>
import { ref } from "vue";

const time = ref(null);
<\/script>

<template>
  <vort-time-picker v-model="time" :show-second="false" format="HH:mm" />
</template>`;

const disabledTimeCode = `<script setup>
import { ref } from "vue";

const time = ref(null);

// 禁用小时
const disabledHours = () => {
  return [0, 1, 2, 3, 4, 5, 22, 23];
};

// 禁用分钟
const disabledMinutes = (selectedHour) => {
  if (selectedHour === 12) {
    return [0, 30];
  }
  return [];
};
<\/script>

<template>
  <vort-time-picker
    v-model="time"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
  />
</template>`;

const hideNowCode = `<script setup>
import { ref } from "vue";

const time = ref(null);
<\/script>

<template>
  <vort-time-picker v-model="time" :show-now="false" />
</template>`;

// valueFormat 示例代码
const valueFormatCode = `<script setup>
import { ref } from "vue";

// 绑定值为字符串类型
const time1 = ref("");
const time2 = ref("14:30:00");
<\/script>

<template>
  <!-- 绑定值为 HH:mm:ss 格式字符串 -->
  <vort-time-picker
    v-model="time1"
    value-format="HH:mm:ss"
    placeholder="valueFormat: HH:mm:ss"
  />

  <!-- 带初始值 -->
  <vort-time-picker
    v-model="time2"
    value-format="HH:mm:ss"
  />
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "v-model",
        desc: "选中的时间值",
        type: "Date | string | null",
        default: "-"
    },
    {
        prop: "defaultValue",
        desc: "默认选中的时间",
        type: "Date | string",
        default: "-"
    },
    {
        prop: "size",
        desc: "选择器大小",
        type: "'large' | 'middle' | 'small'",
        default: "'middle'"
    },
    {
        prop: "disabled",
        desc: "是否禁用",
        type: "boolean",
        default: "false"
    },
    {
        prop: "placeholder",
        desc: "输入框占位文本",
        type: "string",
        default: "'请选择时间'"
    },
    {
        prop: "format",
        desc: "时间格式化字符串（显示格式）",
        type: "string",
        default: "'HH:mm:ss'"
    },
    {
        prop: "valueFormat",
        desc: "绑定值的格式，不指定则绑定值为 Date 对象",
        type: "string",
        default: "-"
    },
    {
        prop: "allowClear",
        desc: "是否显示清除按钮",
        type: "boolean",
        default: "true"
    },
    {
        prop: "use12Hours",
        desc: "使用 12 小时制",
        type: "boolean",
        default: "false"
    },
    {
        prop: "hourStep",
        desc: "小时选项间隔",
        type: "number",
        default: "1"
    },
    {
        prop: "minuteStep",
        desc: "分钟选项间隔",
        type: "number",
        default: "1"
    },
    {
        prop: "secondStep",
        desc: "秒数选项间隔",
        type: "number",
        default: "1"
    },
    {
        prop: "showSecond",
        desc: "是否显示秒选择",
        type: "boolean",
        default: "true"
    },
    {
        prop: "showNow",
        desc: "是否显示此刻按钮",
        type: "boolean",
        default: "true"
    },
    {
        prop: "disabledHours",
        desc: "不可选择的小时",
        type: "() => number[]",
        default: "-"
    },
    {
        prop: "disabledMinutes",
        desc: "不可选择的分钟",
        type: "(selectedHour: number) => number[]",
        default: "-"
    },
    {
        prop: "disabledSeconds",
        desc: "不可选择的秒",
        type: "(selectedHour: number, selectedMinute: number) => number[]",
        default: "-"
    },
    {
        prop: "status",
        desc: "校验状态",
        type: "'error' | 'warning'",
        default: "-"
    },
    {
        prop: "open",
        desc: "控制弹层显示",
        type: "boolean",
        default: "-"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "change",
        desc: "时间变化时触发",
        params: "(value: Date | null, timeString: string) => void"
    },
    {
        event: "openChange",
        desc: "弹出面板和关闭面板时触发",
        params: "(open: boolean) => void"
    }
];

// 格式化时间用于显示
const formatTimeDisplay = (date: Date | null): string => {
    if (!date) return "未选择";
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
};
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">TimePicker 时间选择器</h1>
            <p class="demo-page-desc">输入或选择时间的控件，采用 Ant Design 风格。支持小时、分钟、秒的选择。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。</li>
                <li>支持 12 小时制和 24 小时制。</li>
                <li>支持禁用特定时间。</li>
                <li>支持设置时间间隔步长。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基本使用 -->
                <DemoBox title="基本使用" description="最简单的用法，在浮层中可以选择时间。" :code="basicCode">
                    <vort-time-picker v-model="time1" placeholder="请选择时间" style="width: 200px" />
                    <span class="ml-4 text-sm text-gray-500">选中值: {{ formatTimeDisplay(time1) }}</span>
                </DemoBox>

                <!-- 带初始值 -->
                <DemoBox title="带初始值" description="通过设置 v-model 的初始值来指定默认选中的时间。" :code="defaultValueCode">
                    <vort-time-picker v-model="time2" style="width: 200px" />
                </DemoBox>

                <!-- 三种大小 -->
                <DemoBox
                    title="三种大小"
                    description="三种大小的选择框，当 size 分别为 large 和 small 时，输入框高度为 40px 和 24px，默认高度为 32px。"
                    :code="sizeCode"
                >
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-time-picker v-model="time3" size="large" placeholder="Large" style="width: 200px" />
                        <vort-time-picker v-model="time4" size="middle" placeholder="Middle" style="width: 200px" />
                        <vort-time-picker v-model="time5" size="small" placeholder="Small" style="width: 200px" />
                    </div>
                </DemoBox>

                <!-- 禁用状态 -->
                <DemoBox title="禁用状态" description="选择框的禁用状态。" :code="disabledCode">
                    <vort-time-picker disabled placeholder="禁用状态" style="width: 200px" />
                </DemoBox>

                <!-- 时间格式 -->
                <DemoBox title="时间格式" description="使用 format 属性自定义时间格式。同时配合 show-second 属性可以隐藏秒选择。" :code="formatCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-time-picker v-model="time6" format="HH:mm" :show-second="false" placeholder="HH:mm" style="width: 200px" />
                        <vort-time-picker v-model="time7" format="HH时mm分ss秒" placeholder="HH时mm分ss秒" style="width: 220px" />
                    </div>
                </DemoBox>

                <!-- 绑定值格式 -->
                <DemoBox
                    title="绑定值格式"
                    description="使用 valueFormat 属性可以指定绑定值的格式。不指定则绑定值为 Date 对象，指定后绑定值为格式化后的字符串。参考 Ant Design。"
                    :code="valueFormatCode"
                >
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-4 flex-wrap">
                            <vort-time-picker v-model="valueFormatTime1" value-format="HH:mm:ss" placeholder="valueFormat: HH:mm:ss" style="width: 220px" />
                            <span class="text-sm text-gray-500">绑定值 (string): "{{ valueFormatTime1 }}"</span>
                        </div>
                        <div class="flex items-center gap-4 flex-wrap">
                            <vort-time-picker v-model="valueFormatTime2" value-format="HH:mm:ss" style="width: 220px" />
                            <span class="text-sm text-gray-500">绑定值 (string): "{{ valueFormatTime2 }}"</span>
                        </div>
                    </div>
                </DemoBox>

                <!-- 校验状态 -->
                <DemoBox title="校验状态" description="使用 status 属性设置校验状态，可选值为 error 或 warning。" :code="statusCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-time-picker v-model="time8" status="error" placeholder="Error" style="width: 200px" />
                        <vort-time-picker v-model="time9" status="warning" placeholder="Warning" style="width: 200px" />
                    </div>
                </DemoBox>

                <!-- 12 小时制 -->
                <DemoBox title="12 小时制" description="使用 use12Hours 属性切换到 12 小时制，会出现 AM/PM 选择。" :code="use12HoursCode">
                    <vort-time-picker v-model="time10" :use12Hours="true" format="hh:mm:ss A" style="width: 200px" />
                </DemoBox>

                <!-- 步长选项 -->
                <DemoBox title="步长选项" description="使用 hourStep、minuteStep、secondStep 属性设置选项间隔。" :code="stepCode">
                    <vort-time-picker v-model="time11" :hour-step="2" :minute-step="15" :second-step="10" style="width: 200px" />
                </DemoBox>

                <!-- 隐藏秒选择 -->
                <DemoBox title="隐藏秒选择" description="使用 show-second 属性隐藏秒列选择。" :code="hideSecondCode">
                    <vort-time-picker v-model="time12" :show-second="false" format="HH:mm" style="width: 200px" />
                </DemoBox>

                <!-- 禁用部分时间 -->
                <DemoBox title="禁用部分时间" description="使用 disabledHours、disabledMinutes、disabledSeconds 属性禁用特定时间。" :code="disabledTimeCode">
                    <vort-time-picker
                        v-model="time13"
                        :disabled-hours="disabledHours"
                        :disabled-minutes="disabledMinutes"
                        :disabled-seconds="disabledSeconds"
                        style="width: 200px"
                    />
                </DemoBox>

                <!-- 隐藏此刻按钮 -->
                <DemoBox title="隐藏此刻按钮" description="使用 show-now 属性隐藏此刻按钮。" :code="hideNowCode">
                    <vort-time-picker v-model="time13" :show-now="false" style="width: 200px" />
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

            <h3 class="demo-api-title">格式化占位符</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>占位符</th>
                        <th>说明</th>
                        <th>示例</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>HH</code></td>
                        <td>24小时制小时（两位数）</td>
                        <td>00-23</td>
                    </tr>
                    <tr>
                        <td><code>H</code></td>
                        <td>24小时制小时</td>
                        <td>0-23</td>
                    </tr>
                    <tr>
                        <td><code>hh</code></td>
                        <td>12小时制小时（两位数）</td>
                        <td>01-12</td>
                    </tr>
                    <tr>
                        <td><code>h</code></td>
                        <td>12小时制小时</td>
                        <td>1-12</td>
                    </tr>
                    <tr>
                        <td><code>mm</code></td>
                        <td>分钟（两位数）</td>
                        <td>00-59</td>
                    </tr>
                    <tr>
                        <td><code>m</code></td>
                        <td>分钟</td>
                        <td>0-59</td>
                    </tr>
                    <tr>
                        <td><code>ss</code></td>
                        <td>秒数（两位数）</td>
                        <td>00-59</td>
                    </tr>
                    <tr>
                        <td><code>s</code></td>
                        <td>秒数</td>
                        <td>0-59</td>
                    </tr>
                    <tr>
                        <td><code>A</code></td>
                        <td>上午/下午（大写）</td>
                        <td>AM/PM</td>
                    </tr>
                    <tr>
                        <td><code>a</code></td>
                        <td>上午/下午（小写）</td>
                        <td>am/pm</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<!-- 公共样式已在 demo.css 中定义 -->
