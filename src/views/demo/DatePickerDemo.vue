<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { RangePresetItem } from "@/components/vort/date-picker";

// 范围值类型
type RangeValue = [Date | null, Date | null] | null;

// 状态值
const date1 = ref<Date | null>(null);
const date2 = ref<Date | null>(new Date());
const date3 = ref<Date | null>(null);
const date4 = ref<Date | null>(null);
const date5 = ref<Date | null>(null);
const date6 = ref<Date | null>(null);
const date7 = ref<Date | null>(null);
const date8 = ref<Date | null>(null);
const date9 = ref<Date | null>(null);
const date10 = ref<Date | null>(null);
const date11 = ref<Date | null>(null);
const date12 = ref<Date | null>(null);

// 预设日期/范围
const presetDate = ref<Date | null>(null);
const presetRange = ref<RangeValue>(null);
const asRangeTuple = (start: Dayjs, end: Dayjs): [Dayjs, Dayjs] => [start, end];

const presets = ref([
    { label: "今天", value: dayjs() },
    { label: "昨天", value: dayjs().add(-1, "d") },
    { label: "最近7天", value: dayjs().add(-7, "d") },
    { label: "最近14天", value: dayjs().add(-14, "d") },
    { label: "最近30天", value: dayjs().add(-30, "d") },
    { label: "上个月", value: dayjs().add(-1, "month") },
    { label: "本月", value: dayjs().startOf("month") }
]);

const rangePresets = ref<RangePresetItem[]>([
    { label: "今天", value: asRangeTuple(dayjs(), dayjs()) },
    { label: "昨天", value: asRangeTuple(dayjs().add(-1, "d"), dayjs().add(-1, "d")) },
    { label: "最近7天", value: asRangeTuple(dayjs().add(-7, "d"), dayjs()) },
    { label: "最近14天", value: asRangeTuple(dayjs().add(-14, "d"), dayjs()) },
    { label: "最近30天", value: asRangeTuple(dayjs().add(-30, "d"), dayjs()) },
    { label: "上个月", value: asRangeTuple(dayjs().add(-1, "month").startOf("month"), dayjs().add(-1, "month").endOf("month")) },
    { label: "本月", value: asRangeTuple(dayjs().startOf("month"), dayjs()) }
]);

// 联动选择（开始/结束日期）
const linkedStartDate = ref<Date | null>(null);
const linkedEndDate = ref<Date | null>(null);

// 日期时间选择
const dateTime1 = ref<Date | null>(null);
const dateTime2 = ref<Date | null>(new Date());
const dateTime3 = ref<Date | null>(null);

// valueFormat 示例
const valueFormatDate1 = ref<string>("");
const valueFormatDate2 = ref<string>("2026-01-28");
const valueFormatDateTime = ref<string>("");

// 范围选择器状态值
const range1 = ref<RangeValue>(null);
const range2 = ref<RangeValue>([new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]);
const range3 = ref<RangeValue>(null);
const range4 = ref<RangeValue>(null);
const range5 = ref<RangeValue>(null);
const range6 = ref<RangeValue>(null);
const range7 = ref<RangeValue>(null);
const range8 = ref<RangeValue>(null);

// 范围日期时间选择
const rangeTime1 = ref<RangeValue>(null);
const rangeTime2 = ref<RangeValue>([new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]);
const rangeTime3 = ref<RangeValue>(null);

// 禁用过去的日期
const disablePastDates = (current: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current.getTime() < today.getTime();
};

// 禁用周末
const disableWeekends = (current: Date): boolean => {
    const day = current.getDay();
    return day === 0 || day === 6;
};

// 联动：禁用结束日期之后的日期（用于开始日期选择器）
const disabledStartDate = (current: Date): boolean => {
    if (!linkedEndDate.value) return false;
    const end = new Date(linkedEndDate.value);
    end.setHours(0, 0, 0, 0);
    const compareDate = new Date(current);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() > end.getTime();
};

// 联动：禁用开始日期之前的日期（用于结束日期选择器）
const disabledEndDate = (current: Date): boolean => {
    if (!linkedStartDate.value) return false;
    const start = new Date(linkedStartDate.value);
    start.setHours(0, 0, 0, 0);
    const compareDate = new Date(current);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() < start.getTime();
};

// 示例代码
const basicCode = `<script setup>
import { ref } from "vue";

const date = ref(null);
<\/script>

<template>
  <vort-date-picker v-model="date" placeholder="请选择日期" />
</template>`;

const defaultValueCode = `<script setup>
import { ref } from "vue";

const date = ref(new Date());
<\/script>

<template>
  <vort-date-picker v-model="date" />
</template>`;

const sizeCode = `<template>
  <vort-date-picker v-model="date1" size="large" placeholder="Large" />
  <vort-date-picker v-model="date2" size="middle" placeholder="Middle" />
  <vort-date-picker v-model="date3" size="small" placeholder="Small" />
</template>`;

const presetsCode = `<script setup>
import { ref } from "vue";
import dayjs from "dayjs";

const date = ref(null);

const presets = [
  { label: "今天", value: dayjs() },
  { label: "昨天", value: dayjs().add(-1, "d") },
  { label: "最近7天", value: dayjs().add(-7, "d") },
  { label: "最近14天", value: dayjs().add(-14, "d") },
  { label: "最近30天", value: dayjs().add(-30, "d") },
  { label: "上个月", value: dayjs().add(-1, "month") },
  { label: "本月", value: dayjs().startOf("month") },
];
<\/script>

<template>
  <vort-date-picker v-model="date" :presets="presets" />
</template>`;

const disabledCode = `<template>
  <vort-date-picker disabled placeholder="禁用状态" />
</template>`;

const formatCode = `<script setup>
import { ref } from "vue";

const date = ref(new Date());
<\/script>

<template>
  <vort-date-picker v-model="date" format="YYYY/MM/DD" />
  <vort-date-picker v-model="date" format="YYYY年MM月DD日" />
</template>`;

const statusCode = `<template>
  <vort-date-picker status="error" placeholder="Error" />
  <vort-date-picker status="warning" placeholder="Warning" />
</template>`;

const disabledDateCode = `<script setup>
import { ref } from "vue";

const date = ref(null);

// 禁用过去的日期
const disablePastDates = (current) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return current.getTime() < today.getTime();
};

// 禁用周末
const disableWeekends = (current) => {
  const day = current.getDay();
  return day === 0 || day === 6;
};
<\/script>

<template>
  <vort-date-picker
    v-model="date"
    :disabled-date="disablePastDates"
    placeholder="不能选择过去"
  />
  <vort-date-picker
    v-model="date"
    :disabled-date="disableWeekends"
    placeholder="不能选择周末"
  />
</template>`;

const linkedDateCode = `<script setup>
import { ref } from "vue";

const startDate = ref(null);
const endDate = ref(null);

// 开始日期选择器：禁用结束日期之后的日期
const disabledStartDate = (current) => {
  if (!endDate.value) return false;
  const end = new Date(endDate.value);
  end.setHours(0, 0, 0, 0);
  const compareDate = new Date(current);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate.getTime() > end.getTime();
};

// 结束日期选择器：禁用开始日期之前的日期
const disabledEndDate = (current) => {
  if (!startDate.value) return false;
  const start = new Date(startDate.value);
  start.setHours(0, 0, 0, 0);
  const compareDate = new Date(current);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate.getTime() < start.getTime();
};
<\/script>

<template>
  <div class="flex items-center gap-2">
    <vort-date-picker
      v-model="startDate"
      placeholder="开始日期"
      :disabled-date="disabledStartDate"
    />
    <span>至</span>
    <vort-date-picker
      v-model="endDate"
      placeholder="结束日期"
      :disabled-date="disabledEndDate"
    />
  </div>
</template>`;

const monthPickerCode = `<script setup>
import { ref } from "vue";

const date = ref(null);
<\/script>

<template>
  <vort-date-picker v-model="date" picker="month" placeholder="选择月份" />
</template>`;

const yearPickerCode = `<script setup>
import { ref } from "vue";

const date = ref(null);
<\/script>

<template>
  <vort-date-picker v-model="date" picker="year" placeholder="选择年份" />
</template>`;

// valueFormat 示例代码
const valueFormatCode = `<script setup>
import { ref } from "vue";

// 绑定值为字符串类型
const date1 = ref("");
const date2 = ref("2026-01-28");
const dateTime = ref("");
<\/script>

<template>
  <!-- 基本用法：绑定值为 YYYY-MM-DD 格式字符串 -->
  <vort-date-picker
    v-model="date1"
    value-format="YYYY-MM-DD"
    placeholder="valueFormat: YYYY-MM-DD"
  />

  <!-- 带初始值 -->
  <vort-date-picker
    v-model="date2"
    value-format="YYYY-MM-DD"
  />

  <!-- 日期时间选择：绑定值为 YYYY-MM-DD HH:mm:ss 格式字符串 -->
  <vort-date-picker
    v-model="dateTime"
    show-time
    value-format="YYYY-MM-DD HH:mm:ss"
    placeholder="valueFormat: YYYY-MM-DD HH:mm:ss"
  />
</template>`;

// 日期时间选择示例代码
const showTimeBasicCode = `<script setup>
import { ref } from "vue";

const dateTime = ref(null);
<\/script>

<template>
  <vort-date-picker
    v-model="dateTime"
    show-time
    placeholder="请选择日期时间"
  />
</template>`;

const showTimeWithValueCode = `<script setup>
import { ref } from "vue";

const dateTime = ref(new Date());
<\/script>

<template>
  <vort-date-picker v-model="dateTime" show-time />
</template>`;

const showTimeOptionsCode = `<script setup>
import { ref } from "vue";

const dateTime = ref(null);
<\/script>

<template>
  <!-- 只显示时分，隐藏秒 -->
  <vort-date-picker
    v-model="dateTime"
    :show-time="{ showSecond: false }"
    format="YYYY-MM-DD HH:mm"
    placeholder="选择日期时间（时分）"
  />

  <!-- 设置步长 -->
  <vort-date-picker
    v-model="dateTime"
    :show-time="{ hourStep: 2, minuteStep: 15, secondStep: 10 }"
    placeholder="选择日期时间（步长）"
  />
</template>`;

// 范围选择器示例代码
const rangeBasicCode = `<script setup>
import { ref } from "vue";

const range = ref(null);
<\/script>

<template>
  <vort-range-picker v-model="range" />
</template>`;

const rangeDefaultValueCode = `<script setup>
import { ref } from "vue";

// 默认选择今天到一周后
const range = ref([new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]);
<\/script>

<template>
  <vort-range-picker v-model="range" />
</template>`;

const rangeSizeCode = `<template>
  <vort-range-picker v-model="range1" size="large" />
  <vort-range-picker v-model="range2" size="middle" />
  <vort-range-picker v-model="range3" size="small" />
</template>`;

const rangePresetsCode = `<script setup>
import { ref } from "vue";
import dayjs from "dayjs";

const range = ref(null);

const rangePresets = [
  { label: "今天", value: [dayjs(), dayjs()] },
  { label: "昨天", value: [dayjs().add(-1, "d"), dayjs().add(-1, "d")] },
  { label: "最近7天", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "最近14天", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "最近30天", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "上个月", value: [dayjs().add(-1, "month").startOf("month"), dayjs().add(-1, "month").endOf("month")] },
  { label: "本月", value: [dayjs().startOf("month"), dayjs()] },
];
<\/script>

<template>
  <vort-range-picker v-model="range" :presets="rangePresets" />
</template>`;

const rangeStatusCode = `<template>
  <vort-range-picker status="error" />
  <vort-range-picker status="warning" />
</template>`;

const rangeDisabledDateCode = `<script setup>
import { ref } from "vue";

const range = ref(null);

// 禁用今天之前的日期
const disablePastDates = (current) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return current.getTime() < today.getTime();
};
<\/script>

<template>
  <vort-range-picker
    v-model="range"
    :disabled-date="disablePastDates"
  />
</template>`;

const rangeMonthCode = `<script setup>
import { ref } from "vue";

const range = ref(null);
<\/script>

<template>
  <vort-range-picker v-model="range" picker="month" />
</template>`;

const rangeYearCode = `<script setup>
import { ref } from "vue";

const range = ref(null);
<\/script>

<template>
  <vort-range-picker v-model="range" picker="year" />
</template>`;

// 范围日期时间选择示例代码
const rangeShowTimeBasicCode = `<script setup>
import { ref } from "vue";

const range = ref(null);
<\/script>

<template>
  <vort-range-picker v-model="range" show-time />
</template>`;

const rangeShowTimeWithValueCode = `<script setup>
import { ref } from "vue";

// 默认选择今天到一周后
const range = ref([new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]);
<\/script>

<template>
  <vort-range-picker v-model="range" show-time />
</template>`;

const rangeShowTimeOptionsCode = `<script setup>
import { ref } from "vue";

const range = ref(null);
<\/script>

<template>
  <!-- 只显示时分，隐藏秒 -->
  <vort-range-picker
    v-model="range"
    :show-time="{ showSecond: false }"
    format="YYYY-MM-DD HH:mm"
  />

  <!-- 设置步长 -->
  <vort-range-picker
    v-model="range"
    :show-time="{ hourStep: 2, minuteStep: 15 }"
  />
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "v-model",
        desc: "选中的日期值",
        type: "Date | string | number | null",
        default: "-"
    },
    {
        prop: "defaultValue",
        desc: "默认选中的日期",
        type: "Date | string | number",
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
        default: "showTime ? '请选择日期时间' : '请选择日期'"
    },
    {
        prop: "format",
        desc: "日期格式化字符串（显示格式）",
        type: "string",
        default: "showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
    },
    {
        prop: "valueFormat",
        desc: "绑定值的格式，对 value、defaultValue 起作用。不指定则绑定值为 Date 对象",
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
        prop: "disabledDate",
        desc: "不可选择的日期",
        type: "(currentDate: Date) => boolean",
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
    },
    {
        prop: "showToday",
        desc: "是否显示今天按钮",
        type: "boolean",
        default: "true"
    },
    {
        prop: "presets",
        desc: "预设日期（显示在弹层左侧，垂直排列）",
        type: "Array<{ label: string; value: any }>",
        default: "-"
    },
    {
        prop: "picker",
        desc: "设置选择器类型",
        type: "'date' | 'month' | 'year'",
        default: "'date'"
    },
    {
        prop: "showTime",
        desc: "增加时间选择功能",
        type: "boolean | ShowTimeOptions",
        default: "false"
    },
    {
        prop: "showNow",
        desc: "是否显示「此刻」按钮（showTime 时有效）",
        type: "boolean",
        default: "true"
    },
    {
        prop: "disabledHours",
        desc: "不可选择的小时（showTime 时有效）",
        type: "() => number[]",
        default: "-"
    },
    {
        prop: "disabledMinutes",
        desc: "不可选择的分钟（showTime 时有效）",
        type: "(selectedHour: number) => number[]",
        default: "-"
    },
    {
        prop: "disabledSeconds",
        desc: "不可选择的秒（showTime 时有效）",
        type: "(selectedHour: number, selectedMinute: number) => number[]",
        default: "-"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "change",
        desc: "日期变化时触发",
        params: "(value: Date | null, dateString: string) => void"
    },
    {
        event: "openChange",
        desc: "弹出日历和关闭日历时触发",
        params: "(open: boolean) => void"
    }
];

// RangePicker Props 表格数据
const rangePropsData = [
    {
        prop: "v-model",
        desc: "选中的日期范围值",
        type: "[Date | null, Date | null] | null",
        default: "-"
    },
    {
        prop: "defaultValue",
        desc: "默认选中的日期范围",
        type: "[Date | null, Date | null]",
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
        type: "[string, string]",
        default: "showTime ? ['开始日期时间', '结束日期时间'] : ['开始日期', '结束日期']"
    },
    {
        prop: "format",
        desc: "日期格式化字符串（显示格式）",
        type: "string",
        default: "showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
    },
    {
        prop: "valueFormat",
        desc: "绑定值的格式，对 value、defaultValue 起作用。不指定则绑定值为 Date 对象",
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
        prop: "disabledDate",
        desc: "不可选择的日期",
        type: "(currentDate: Date) => boolean",
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
    },
    {
        prop: "separator",
        desc: "分隔符",
        type: "string",
        default: "'~'"
    },
    {
        prop: "presets",
        desc: "预设范围（显示在弹层左侧，垂直排列）",
        type: "Array<{ label: string; value: [any, any] }>",
        default: "-"
    },
    {
        prop: "picker",
        desc: "设置选择器类型",
        type: "'date' | 'month' | 'year'",
        default: "'date'"
    },
    {
        prop: "showTime",
        desc: "增加时间选择功能",
        type: "boolean | ShowTimeOptions",
        default: "false"
    },
    {
        prop: "showNow",
        desc: "是否显示「此刻」按钮（showTime 时有效）",
        type: "boolean",
        default: "true"
    },
    {
        prop: "disabledHours",
        desc: "不可选择的小时（showTime 时有效）",
        type: "() => number[]",
        default: "-"
    },
    {
        prop: "disabledMinutes",
        desc: "不可选择的分钟（showTime 时有效）",
        type: "(selectedHour: number) => number[]",
        default: "-"
    },
    {
        prop: "disabledSeconds",
        desc: "不可选择的秒（showTime 时有效）",
        type: "(selectedHour: number, selectedMinute: number) => number[]",
        default: "-"
    }
];

// RangePicker Events 表格数据
const rangeEventsData = [
    {
        event: "change",
        desc: "日期范围变化时触发",
        params: "(value: RangeValue, dateStrings: [string, string]) => void"
    },
    {
        event: "openChange",
        desc: "弹出日历和关闭日历时触发",
        params: "(open: boolean) => void"
    },
    {
        event: "calendarChange",
        desc: "待选日期发生变化时触发",
        params: "(dates: RangeValue, dateStrings: [string, string], info: { range: 'start' | 'end' }) => void"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">DatePicker 日期选择器</h1>
            <p class="demo-page-desc">输入或选择日期的控件，采用 Ant Design 风格。支持单个日期选择和日期范围选择。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。</li>
                <li>当用户需要选择一个日期范围（如开始日期和结束日期），可以使用 RangePicker 组件。</li>
                <li>支持年、月、日三种选择器类型。</li>
                <li>支持禁用特定日期范围。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基本使用 -->
                <DemoBox title="基本使用" description="最简单的用法，在浮层中可以选择或者输入日期。" :code="basicCode">
                    <vort-date-picker v-model="date1" placeholder="请选择日期" style="width: 200px" />
                    <span class="ml-4 text-sm text-gray-500">选中值: {{ date1?.toLocaleDateString() || "未选择" }}</span>
                </DemoBox>

                <!-- 预设日期 -->
                <DemoBox title="预设日期" description="通过 presets 在弹层左侧提供快捷选择，位置与 Ant Design 一致。" :code="presetsCode">
                    <vort-date-picker v-model="presetDate" :presets="presets" placeholder="请选择日期" style="width: 200px" />
                    <span class="ml-4 text-sm text-gray-500">选中值: {{ presetDate?.toLocaleDateString() || "未选择" }}</span>
                </DemoBox>

                <!-- 带初始值 -->
                <DemoBox title="带初始值" description="通过设置 v-model 的初始值来指定默认选中的日期。" :code="defaultValueCode">
                    <vort-date-picker v-model="date2" style="width: 200px" />
                </DemoBox>

                <!-- 三种大小 -->
                <DemoBox
                    title="三种大小"
                    description="三种大小的选择框，当 size 分别为 large 和 small 时，输入框高度为 40px 和 24px，默认高度为 32px。"
                    :code="sizeCode"
                >
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-date-picker v-model="date3" size="large" placeholder="Large" style="width: 200px" />
                        <vort-date-picker v-model="date4" size="middle" placeholder="Middle" style="width: 200px" />
                        <vort-date-picker v-model="date5" size="small" placeholder="Small" style="width: 200px" />
                    </div>
                </DemoBox>

                <!-- 禁用状态 -->
                <DemoBox title="禁用状态" description="选择框的禁用状态。" :code="disabledCode">
                    <vort-date-picker disabled placeholder="禁用状态" style="width: 200px" />
                </DemoBox>

                <!-- 日期格式 -->
                <DemoBox title="日期格式" description="使用 format 属性自定义日期格式。支持 YYYY、MM、DD 占位符。" :code="formatCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        {{ date6 }}
                        <vort-date-picker v-model="date6" format="YYYY/MM/DD HH:mm:ss" placeholder="YYYY/MM/DD HH:mm:ss" show-time style="width: 200px" />
                        <vort-date-picker v-model="date7" format="YYYY年MM月DD日" placeholder="YYYY年MM月DD日" style="width: 220px" />
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
                            <vort-date-picker v-model="valueFormatDate1" value-format="YYYY-MM-DD" placeholder="valueFormat: YYYY-MM-DD" style="width: 220px" />
                            <span class="text-sm text-gray-500">绑定值 (string): "{{ valueFormatDate1 }}"</span>
                        </div>
                        <div class="flex items-center gap-4 flex-wrap">
                            <vort-date-picker v-model="valueFormatDate2" value-format="YYYY-MM-DD" style="width: 220px" />
                            <span class="text-sm text-gray-500">绑定值 (string): "{{ valueFormatDate2 }}"</span>
                        </div>
                        <div class="flex items-center gap-4 flex-wrap">
                            <vort-date-picker
                                v-model="valueFormatDateTime"
                                show-time
                                value-format="YYYY-MM-DD HH:mm:ss"
                                placeholder="valueFormat: YYYY-MM-DD HH:mm:ss"
                                style="width: 260px"
                            />
                            <span class="text-sm text-gray-500">绑定值 (string): "{{ valueFormatDateTime }}"</span>
                        </div>
                    </div>
                </DemoBox>

                <!-- 校验状态 -->
                <DemoBox title="校验状态" description="使用 status 属性设置校验状态，可选值为 error 或 warning。" :code="statusCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-date-picker v-model="date8" status="error" placeholder="Error" style="width: 200px" />
                        <vort-date-picker v-model="date9" status="warning" placeholder="Warning" style="width: 200px" />
                    </div>
                </DemoBox>

                <!-- 不可选择日期 -->
                <DemoBox title="不可选择日期" description="使用 disabledDate 属性可以禁用特定日期，如禁用过去的日期或周末。" :code="disabledDateCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-date-picker v-model="date10" :disabled-date="disablePastDates" placeholder="不能选择过去" style="width: 200px" />
                        <vort-date-picker v-model="date11" :disabled-date="disableWeekends" placeholder="不能选择周末" style="width: 200px" />
                    </div>
                </DemoBox>

                <!-- 月份选择器 -->
                <DemoBox title="月份选择器" description="使用 picker='month' 设置月份选择器。" :code="monthPickerCode">
                    <vort-date-picker v-model="date12" picker="month" placeholder="选择月份" style="width: 200px" />
                </DemoBox>

                <!-- 年份选择器 -->
                <DemoBox title="年份选择器" description="使用 picker='year' 设置年份选择器。" :code="yearPickerCode">
                    <vort-date-picker v-model="date12" picker="year" placeholder="选择年份" style="width: 200px" />
                </DemoBox>

                <!-- 两个独立 DatePicker 联动 -->
                <DemoBox
                    title="联动选择（开始/结束日期）"
                    description="两个独立的 DatePicker 通过 disabledDate 实现联动。开始日期不能晚于结束日期，结束日期不能早于开始日期。适用于表单中需要分开展示开始和结束日期的场景。"
                    :code="linkedDateCode"
                >
                    <div class="flex items-center gap-2">
                        <vort-date-picker v-model="linkedStartDate" placeholder="开始日期" :disabled-date="disabledStartDate" style="width: 180px" />
                        <span class="text-gray-400">至</span>
                        <vort-date-picker v-model="linkedEndDate" placeholder="结束日期" :disabled-date="disabledEndDate" style="width: 180px" />
                    </div>
                    <div class="mt-2 text-sm text-gray-500">
                        选中范围: {{ linkedStartDate?.toLocaleDateString() || "未选择" }} ~ {{ linkedEndDate?.toLocaleDateString() || "未选择" }}
                    </div>
                </DemoBox>

                <!-- 分隔线 -->
                <div class="demo-divider">
                    <h2 class="demo-divider-title">日期时间选择（showTime）</h2>
                </div>

                <!-- 日期时间选择 - 基本用法 -->
                <DemoBox
                    title="日期时间选择 - 基本用法"
                    description="使用 show-time 属性可以在选择日期的同时选择时间。选择日期后需要点击「确定」按钮确认，也可点击「此刻」快速选择当前时间。"
                    :code="showTimeBasicCode"
                >
                    <vort-date-picker v-model="dateTime1" show-time placeholder="请选择日期时间" style="width: 220px" />
                    <span class="ml-4 text-sm text-gray-500"> 选中值: {{ dateTime1?.toLocaleString() || "未选择" }} </span>
                </DemoBox>

                <!-- 日期时间选择 - 带初始值 -->
                <DemoBox title="日期时间选择 - 带初始值" description="通过设置 v-model 的初始值来指定默认选中的日期时间。" :code="showTimeWithValueCode">
                    <vort-date-picker v-model="dateTime2" show-time style="width: 220px" />
                </DemoBox>

                <!-- 日期时间选择 - 配置选项 -->
                <DemoBox
                    title="日期时间选择 - 配置选项"
                    description="通过传入对象配置 showTime，可以设置时间步长、是否显示秒等选项。"
                    :code="showTimeOptionsCode"
                >
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-date-picker
                            v-model="dateTime3"
                            :show-time="{ showSecond: false }"
                            format="YYYY-MM-DD HH:mm"
                            placeholder="选择日期时间（时分）"
                            style="width: 220px"
                        />
                        <vort-date-picker
                            v-model="dateTime3"
                            :show-time="{ hourStep: 2, minuteStep: 15, secondStep: 10 }"
                            placeholder="选择日期时间（步长）"
                            style="width: 240px"
                        />
                    </div>
                </DemoBox>

                <!-- 分隔线 -->
                <div class="demo-divider">
                    <h2 class="demo-divider-title">RangePicker 范围选择器</h2>
                </div>

                <!-- 范围选择器基本使用 -->
                <DemoBox title="范围选择 - 基本使用" description="选择一个日期范围。" :code="rangeBasicCode">
                    <vort-range-picker v-model="range1" style="width: 300px" />
                    <span class="ml-4 text-sm text-gray-500">
                        选中值: {{ range1 ? `${range1[0]?.toLocaleDateString() || ""} ~ ${range1[1]?.toLocaleDateString() || ""}` : "未选择" }}
                    </span>
                </DemoBox>

                <!-- 范围选择 - 预设范围 -->
                <DemoBox title="范围选择 - 预设范围" description="通过 presets 在弹层左侧提供快捷范围，位置与 Ant Design 一致。" :code="rangePresetsCode">
                    <vort-range-picker v-model="presetRange" :presets="rangePresets" style="width: 300px" />
                    <span class="ml-4 text-sm text-gray-500">
                        选中值:
                        {{
                            presetRange
                                ? `${presetRange[0]?.toLocaleDateString() || ""} ~
                    ${presetRange[1]?.toLocaleDateString() || ""}`
                                : "未选择"
                        }}
                    </span>
                </DemoBox>

                <!-- 范围选择器带默认值 -->
                <DemoBox title="范围选择 - 带初始值" description="通过设置 v-model 的初始值来指定默认选中的日期范围。" :code="rangeDefaultValueCode">
                    <vort-range-picker v-model="range2" style="width: 300px" />
                </DemoBox>

                <!-- 范围选择器三种大小 -->
                <DemoBox title="范围选择 - 三种大小" description="三种大小的选择框。" :code="rangeSizeCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-range-picker v-model="range3" size="large" style="width: 300px" />
                        <vort-range-picker v-model="range4" size="middle" style="width: 280px" />
                        <vort-range-picker v-model="range5" size="small" style="width: 260px" />
                    </div>
                </DemoBox>

                <!-- 范围选择器校验状态 -->
                <DemoBox title="范围选择 - 校验状态" description="使用 status 属性设置校验状态。" :code="rangeStatusCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-range-picker status="error" style="width: 300px" />
                        <vort-range-picker status="warning" style="width: 300px" />
                    </div>
                </DemoBox>

                <!-- 范围选择器不可选择日期 -->
                <DemoBox title="范围选择 - 不可选择日期" description="使用 disabledDate 属性可以禁用特定日期。" :code="rangeDisabledDateCode">
                    <vort-range-picker v-model="range6" :disabled-date="disablePastDates" style="width: 300px" />
                </DemoBox>

                <!-- 范围选择器月份 -->
                <DemoBox title="范围选择 - 月份范围" description="使用 picker='month' 设置月份范围选择器。" :code="rangeMonthCode">
                    <vort-range-picker v-model="range7" picker="month" style="width: 300px" />
                </DemoBox>

                <!-- 范围选择器年份 -->
                <DemoBox title="范围选择 - 年份范围" description="使用 picker='year' 设置年份范围选择器。" :code="rangeYearCode">
                    <vort-range-picker v-model="range8" picker="year" style="width: 300px" />
                </DemoBox>

                <!-- 分隔线 -->
                <div class="demo-divider">
                    <h2 class="demo-divider-title">RangePicker 日期时间范围选择（showTime）</h2>
                </div>

                <!-- 范围日期时间选择 - 基本用法 -->
                <DemoBox
                    title="范围日期时间选择 - 基本用法"
                    description="使用 show-time 属性可以在选择日期范围的同时选择时间。选择完成后需要点击「确定」按钮确认。"
                    :code="rangeShowTimeBasicCode"
                >
                    <vort-range-picker v-model="rangeTime1" show-time style="width: 420px" />
                    <div class="mt-2 text-sm text-gray-500">
                        选中值: {{ rangeTime1 ? `${rangeTime1[0]?.toLocaleString() || ""} ~ ${rangeTime1[1]?.toLocaleString() || ""}` : "未选择" }}
                    </div>
                </DemoBox>

                <!-- 范围日期时间选择 - 带初始值 -->
                <DemoBox
                    title="范围日期时间选择 - 带初始值"
                    description="通过设置 v-model 的初始值来指定默认选中的日期时间范围。"
                    :code="rangeShowTimeWithValueCode"
                >
                    <vort-range-picker v-model="rangeTime2" show-time style="width: 420px" />
                </DemoBox>

                <!-- 范围日期时间选择 - 配置选项 -->
                <DemoBox
                    title="范围日期时间选择 - 配置选项"
                    description="通过传入对象配置 showTime，可以设置时间步长、是否显示秒等选项。"
                    :code="rangeShowTimeOptionsCode"
                >
                    <div class="flex items-start gap-4 flex-wrap">
                        <vort-range-picker v-model="rangeTime3" :show-time="{ showSecond: false }" format="YYYY-MM-DD HH:mm" style="width: 380px" />
                        <vort-range-picker v-model="rangeTime3" :show-time="{ hourStep: 2, minuteStep: 15 }" style="width: 420px" />
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
                        <td><code>YYYY</code></td>
                        <td>四位数年份</td>
                        <td>2024</td>
                    </tr>
                    <tr>
                        <td><code>YY</code></td>
                        <td>两位数年份</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td><code>MM</code></td>
                        <td>两位数月份</td>
                        <td>01-12</td>
                    </tr>
                    <tr>
                        <td><code>M</code></td>
                        <td>月份</td>
                        <td>1-12</td>
                    </tr>
                    <tr>
                        <td><code>DD</code></td>
                        <td>两位数日期</td>
                        <td>01-31</td>
                    </tr>
                    <tr>
                        <td><code>D</code></td>
                        <td>日期</td>
                        <td>1-31</td>
                    </tr>
                    <tr>
                        <td><code>HH</code></td>
                        <td>两位数小时（24小时制）</td>
                        <td>00-23</td>
                    </tr>
                    <tr>
                        <td><code>H</code></td>
                        <td>小时（24小时制）</td>
                        <td>0-23</td>
                    </tr>
                    <tr>
                        <td><code>mm</code></td>
                        <td>两位数分钟</td>
                        <td>00-59</td>
                    </tr>
                    <tr>
                        <td><code>m</code></td>
                        <td>分钟</td>
                        <td>0-59</td>
                    </tr>
                    <tr>
                        <td><code>ss</code></td>
                        <td>两位数秒</td>
                        <td>00-59</td>
                    </tr>
                    <tr>
                        <td><code>s</code></td>
                        <td>秒</td>
                        <td>0-59</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">ShowTimeOptions</h3>
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
                    <tr>
                        <td><code>hourStep</code></td>
                        <td>小时选项间隔</td>
                        <td><code>number</code></td>
                        <td><code>1</code></td>
                    </tr>
                    <tr>
                        <td><code>minuteStep</code></td>
                        <td>分钟选项间隔</td>
                        <td><code>number</code></td>
                        <td><code>1</code></td>
                    </tr>
                    <tr>
                        <td><code>secondStep</code></td>
                        <td>秒数选项间隔</td>
                        <td><code>number</code></td>
                        <td><code>1</code></td>
                    </tr>
                    <tr>
                        <td><code>showSecond</code></td>
                        <td>是否显示秒选择</td>
                        <td><code>boolean</code></td>
                        <td><code>true</code></td>
                    </tr>
                    <tr>
                        <td><code>defaultValue</code></td>
                        <td>默认时间</td>
                        <td><code>Date | string</code></td>
                        <td><code>-</code></td>
                    </tr>
                </tbody>
            </table>

            <!-- RangePicker API -->
            <h2 class="demo-section-title" style="margin-top: 48px">RangePicker API</h2>

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
                    <tr v-for="item in rangePropsData" :key="item.prop">
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
                    <tr v-for="item in rangeEventsData" :key="item.event">
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

/* 章节分隔线（带标题的分隔容器，与公共 demo-divider 不同） */
.demo-divider {
    margin: 48px 0 24px;
    padding-top: 24px;
    border-top: 1px solid var(--vort-border-secondary);
}

.demo-divider-title {
    margin: 0 0 16px;
    font-size: 20px;
    font-weight: 600;
    color: var(--vort-text);
}
</style>
