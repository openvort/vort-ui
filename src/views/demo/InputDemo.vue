<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { User, SettingsIcon } from "lucide-vue-next";

// 示例数据
const basicValue = ref("");
const sizeValue1 = ref("");
const sizeValue2 = ref("");
const sizeValue3 = ref("");
const disabledValue = ref("禁用内容");
const statusValue1 = ref("");
const statusValue2 = ref("");
const clearValue = ref("点击右侧清除");
const prefixValue = ref("");
const suffixValue = ref("");
const passwordValue = ref("");
const countValue = ref("");
const maxCountValue = ref("");
const addonValue1 = ref("");
const addonValue2 = ref("");
const addonValue3 = ref("");
const searchValue1 = ref("");
const searchValue2 = ref("");
const searchValue3 = ref("");
const variantValue1 = ref("");
const variantValue2 = ref("");
const variantValue3 = ref("");
const variantValue4 = ref("");

// Compact 模式示例数据
const compactValue1 = ref("");
const compactValue2 = ref("");
const compactValue3 = ref("");
const compactProtocol = ref("https://");
const compactDomain = ref(".com");
const compactAreaCode = ref("+86");
const compactCurrency = ref("CNY");

// Compact 模式选项
const protocolOptions = [
    { label: "http://", value: "http://" },
    { label: "https://", value: "https://" },
    { label: "ftp://", value: "ftp://" }
];

const domainOptions = [
    { label: ".com", value: ".com" },
    { label: ".cn", value: ".cn" },
    { label: ".org", value: ".org" },
    { label: ".net", value: ".net" }
];

const areaCodeOptions = [
    { label: "+86 中国", value: "+86" },
    { label: "+1 美国", value: "+1" },
    { label: "+44 英国", value: "+44" },
    { label: "+81 日本", value: "+81" }
];

const currencyOptions = [
    { label: "CNY ¥", value: "CNY" },
    { label: "USD $", value: "USD" },
    { label: "EUR €", value: "EUR" },
    { label: "GBP £", value: "GBP" }
];

// Textarea 示例数据
const textareaBasic = ref("");
const textareaCount = ref("");
const textareaMaxCount = ref("");
const textareaClear = ref("点击右下角清除按钮");
const textareaAutoSize = ref("");
const textareaAutoSizeLimit = ref("");
const textareaDisabled = ref("禁用状态的文本域");
const textareaError = ref("");
const textareaWarning = ref("");

// 示例代码
const basicCode = `<script setup>
import { ref } from 'vue';
const value = ref('');
<\/script>

<template>
  <vort-input v-model="value" placeholder="请输入内容" />
</template>`;

const sizeCode = `<template>
  <vort-input size="large" placeholder="large size" />
  <vort-input placeholder="default size" />
  <vort-input size="small" placeholder="small size" />
</template>`;

const disabledCode = `<template>
  <vort-input disabled model-value="禁用内容" />
</template>`;

const statusCode = `<template>
  <vort-input status="error" placeholder="错误状态" />
  <vort-input status="warning" placeholder="警告状态" />
</template>`;

const variantCode = `<template>
  <vort-input variant="outlined" placeholder="outlined" />
  <vort-input variant="filled" placeholder="filled" />
  <vort-input variant="borderless" placeholder="borderless" />
  <vort-input variant="underlined" placeholder="underlined" />
  <vort-input-search variant="filled" placeholder="输入搜索内容" />
</template>`;

const borderedCode = `<template>
  <vort-input :bordered="false" placeholder="无边框输入框" />
</template>`;

const clearCode = `<script setup>
import { ref } from 'vue';
const value = ref('点击右侧清除');
<\/script>

<template>
  <vort-input v-model="value" allow-clear placeholder="可清除内容" />
</template>`;

const prefixSuffixCode = `<script setup>
import { User, SettingsIcon } from 'lucide-vue-next';
<\/script>

<template>
  <vort-input placeholder="请输入用户名">
    <template #prefix>
      <User class="w-4 h-4" />
    </template>
  </vort-input>

  <vort-input placeholder="请输入内容">
    <template #suffix>
      <SettingsIcon class="w-4 h-4" />
    </template>
  </vort-input>
</template>`;

const passwordCode = `<script setup>
import { ref } from 'vue';
const password = ref('');
<\/script>

<template>
  <vort-input-password v-model="password" placeholder="请输入密码" />
</template>`;

const countCode = `<template>
  <vort-input show-count placeholder="字数统计" />
  <vort-input show-count :maxlength="20" placeholder="最大 20 字符" />
</template>`;

const addonCode = `<template>
  <vort-input placeholder="mysite">
    <template #addonBefore>http://</template>
    <template #addonAfter>.com</template>
  </vort-input>

  <vort-input placeholder="请输入网址">
    <template #addonBefore>https://</template>
  </vort-input>

  <vort-input placeholder="请输入内容">
    <template #addonAfter>.cn</template>
  </vort-input>
</template>`;

const compactCode = `<script setup>
import { ref } from 'vue';

const url = ref('');
const protocol = ref('https://');
const domain = ref('.com');
const phone = ref('');
const areaCode = ref('+86');
const price = ref('');
const currency = ref('CNY');

const protocolOptions = [
  { label: 'http://', value: 'http://' },
  { label: 'https://', value: 'https://' },
  { label: 'ftp://', value: 'ftp://' }
];

const domainOptions = [
  { label: '.com', value: '.com' },
  { label: '.cn', value: '.cn' },
  { label: '.org', value: '.org' }
];

const areaCodeOptions = [
  { label: '+86 中国', value: '+86' },
  { label: '+1 美国', value: '+1' },
  { label: '+44 英国', value: '+44' }
];

const currencyOptions = [
  { label: 'CNY ¥', value: 'CNY' },
  { label: 'USD $', value: 'USD' },
  { label: 'EUR €', value: 'EUR' }
];
<\/script>

<template>
  <!-- 前后都有 Select -->
  <vort-input v-model="url" compact placeholder="请输入网址">
    <template #addonBefore>
      <vort-select v-model="protocol" :bordered="false" :options="protocolOptions" style="width: 100px" />
    </template>
    <template #addonAfter>
      <vort-select v-model="domain" :bordered="false" :options="domainOptions" style="width: 80px" />
    </template>
  </vort-input>

  <!-- 前置 Select（手机号） -->
  <vort-input v-model="phone" compact placeholder="请输入手机号">
    <template #addonBefore>
      <vort-select v-model="areaCode" :bordered="false" :options="areaCodeOptions" style="width: 110px" />
    </template>
  </vort-input>

  <!-- 后置 Select（货币） -->
  <vort-input v-model="price" compact placeholder="请输入金额">
    <template #addonAfter>
      <vort-select v-model="currency" :bordered="false" :options="currencyOptions" style="width: 90px" />
    </template>
  </vort-input>
</template>`;

const searchCode = `<script setup>
import { ref } from 'vue';
const value = ref('');

const onSearch = (value) => {
  console.log('搜索:', value);
};
<\/script>

<template>
  <!-- 基础搜索框 -->
  <vort-input-search v-model="value" placeholder="输入搜索内容" @search="onSearch" />

  <!-- 带按钮的搜索框 -->
  <vort-input-search v-model="value" placeholder="输入搜索内容" :enter-button="true" @search="onSearch" />

  <!-- 自定义按钮文字 -->
  <vort-input-search v-model="value" placeholder="输入搜索内容" enter-button="搜索" @search="onSearch" />
</template>`;

// Textarea 示例代码
const textareaBasicCode = `<script setup>
import { ref } from 'vue';
const value = ref('');
<\/script>

<template>
  <vort-textarea v-model="value" placeholder="请输入内容" :rows="4" />
</template>`;

const textareaCountCode = `<template>
  <vort-textarea placeholder="字数统计" show-count />
  <vort-textarea placeholder="最大 100 字符" :maxlength="100" show-count />
</template>`;

const textareaClearCode = `<script setup>
import { ref } from 'vue';
const value = ref('点击右下角清除按钮');
<\/script>

<template>
  <vort-textarea v-model="value" allow-clear placeholder="可清除内容" />
</template>`;

const textareaAutoSizeCode = `<script setup>
import { ref } from 'vue';
const value1 = ref('');
const value2 = ref('');
<\/script>

<template>
  <!-- 自动高度 -->
  <vort-textarea v-model="value1" placeholder="自适应高度" :auto-size="true" />

  <!-- 限制最小/最大行数 -->
  <vort-textarea
    v-model="value2"
    placeholder="限制 2-6 行"
    :auto-size="{ minRows: 2, maxRows: 6 }"
  />
</template>`;

const textareaDisabledCode = `<template>
  <vort-textarea disabled value="禁用状态的文本域" />
</template>`;

const textareaStatusCode = `<template>
  <vort-textarea status="error" placeholder="错误状态" />
  <vort-textarea status="warning" placeholder="警告状态" />
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "v-model",
        desc: "输入框内容",
        type: "string | number",
        default: "-"
    },
    {
        prop: "defaultValue",
        desc: "默认值（非受控模式）",
        type: "string | number",
        default: "-"
    },
    {
        prop: "size",
        desc: "输入框尺寸",
        type: "'large' | 'middle' | 'small'",
        default: "'middle'"
    },
    {
        prop: "variant",
        desc: "输入框形态变体（不传时兼容 bordered 行为）",
        type: "'outlined' | 'filled' | 'borderless' | 'underlined'",
        default: "-"
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
        prop: "bordered",
        desc: "是否有边框（兼容属性，不传 variant 时生效）",
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
        prop: "allowClear",
        desc: "可以点击清除图标删除内容",
        type: "boolean",
        default: "false"
    },
    {
        prop: "maxlength",
        desc: "最大输入长度",
        type: "number",
        default: "-"
    },
    {
        prop: "showCount",
        desc: "是否展示字数",
        type: "boolean",
        default: "false"
    },
    {
        prop: "compact",
        desc: "紧凑模式，用于在 addonBefore/addonAfter 中放置 Select 等组件",
        type: "boolean",
        default: "false"
    }
];

// Password Props 表格数据
const passwordPropsData = [
    {
        prop: "v-model",
        desc: "输入框内容",
        type: "string",
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
        prop: "visibilityToggle",
        desc: "是否显示切换按钮",
        type: "boolean",
        default: "true"
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
        desc: "输入框后缀图标"
    },
    {
        slot: "addonBefore",
        desc: "输入框前置标签"
    },
    {
        slot: "addonAfter",
        desc: "输入框后置标签"
    }
];

// Search Props 表格数据
const searchPropsData = [
    {
        prop: "v-model",
        desc: "输入框内容",
        type: "string",
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
        prop: "status",
        desc: "设置校验状态",
        type: "'error' | 'warning'",
        default: "-"
    },
    {
        prop: "enterButton",
        desc: "是否有确认按钮（可设为按钮文字）",
        type: "boolean | string",
        default: "false"
    },
    {
        prop: "loading",
        desc: "搜索按钮加载状态",
        type: "boolean",
        default: "false"
    }
];

// Search Events 表格数据
const searchEventsData = [
    {
        event: "search",
        desc: "点击搜索按钮或按下回车时触发",
        params: "(value: string, event?: Event) => void"
    },
    {
        event: "update:modelValue",
        desc: "输入框内容变化时触发（v-model）",
        params: "(value: string) => void"
    }
];

// Textarea Props 表格数据
const textareaPropsData = [
    {
        prop: "v-model",
        desc: "文本域内容",
        type: "string",
        default: "-"
    },
    {
        prop: "defaultValue",
        desc: "默认值（非受控模式）",
        type: "string",
        default: "-"
    },
    {
        prop: "size",
        desc: "文本域尺寸（影响字体大小和内边距）",
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
        prop: "rows",
        desc: "固定行数",
        type: "number",
        default: "4"
    },
    {
        prop: "autoSize",
        desc: "自适应内容高度",
        type: "boolean | { minRows?: number; maxRows?: number }",
        default: "-"
    },
    {
        prop: "disabled",
        desc: "是否禁用",
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
        prop: "allowClear",
        desc: "可以点击清除图标删除内容",
        type: "boolean",
        default: "false"
    },
    {
        prop: "maxlength",
        desc: "最大输入长度",
        type: "number",
        default: "-"
    },
    {
        prop: "showCount",
        desc: "是否展示字数",
        type: "boolean",
        default: "false"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "update:modelValue",
        desc: "输入框内容变化时触发（v-model）",
        params: "(value: string) => void"
    },
    {
        event: "change",
        desc: "输入框内容变化时触发",
        params: "(event: Event) => void"
    },
    {
        event: "input",
        desc: "输入时触发",
        params: "(event: Event) => void"
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
    },
    {
        event: "clear",
        desc: "点击清除按钮时触发",
        params: "() => void"
    }
];

// 搜索事件处理
const handleSearch = (value: string) => {
    console.log("搜索:", value);
};
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Input 输入框</h1>
            <p class="demo-page-desc">通过鼠标或键盘输入内容，是最基础的表单域的包装。包含单行输入框和多行文本域。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>需要用户输入表单域内容时。</li>
                <li>提供组合型输入框，带搜索的输入框，还可以进行大小选择。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本使用" description="基本使用方式，使用 v-model 进行双向绑定。" :code="basicCode">
                    <div class="demo-input-row">
                        <vort-input v-model="basicValue" placeholder="请输入内容" />
                    </div>
                </DemoBox>

                <DemoBox title="三种大小" description="输入框有三种尺寸：大、中（默认）、小。" :code="sizeCode">
                    <div class="demo-input-col">
                        <vort-input v-model="sizeValue1" size="large" placeholder="large size" />
                        <vort-input v-model="sizeValue2" placeholder="default size" />
                        <vort-input v-model="sizeValue3" size="small" placeholder="small size" />
                    </div>
                </DemoBox>

                <DemoBox title="带清除按钮" description="带清除按钮的输入框，有内容时始终显示清除图标。" :code="clearCode">
                    <div class="demo-input-row">
                        <vort-input v-model="clearValue" allow-clear placeholder="可清除内容" />
                    </div>
                </DemoBox>

                <DemoBox title="前缀和后缀" description="在输入框上添加前缀或后缀图标。" :code="prefixSuffixCode">
                    <div class="demo-input-col">
                        <vort-input v-model="prefixValue" placeholder="请输入用户名">
                            <template #prefix>
                                <User class="w-4 h-4" />
                            </template>
                        </vort-input>
                        <vort-input v-model="suffixValue" placeholder="请输入内容">
                            <template #suffix>
                                <SettingsIcon class="w-4 h-4" />
                            </template>
                        </vort-input>
                    </div>
                </DemoBox>

                <DemoBox title="密码框" description="密码输入框，可点击右侧图标切换密码可见性。" :code="passwordCode">
                    <div class="demo-input-row">
                        <vort-input-password v-model="passwordValue" placeholder="请输入密码" />
                    </div>
                </DemoBox>

                <DemoBox title="字数统计" description="显示输入字数，可配合 maxlength 限制最大输入长度。" :code="countCode">
                    <div class="demo-input-col">
                        <vort-input v-model="countValue" show-count placeholder="字数统计" />
                        <vort-input v-model="maxCountValue" show-count :maxlength="20" placeholder="最大 20 字符" />
                    </div>
                </DemoBox>

                <DemoBox title="禁用状态" description="添加 disabled 属性即可让输入框处于不可用状态。" :code="disabledCode">
                    <div class="demo-input-row">
                        <vort-input v-model="disabledValue" disabled />
                    </div>
                </DemoBox>

                <DemoBox title="输入框状态" description="使用 status 属性设置输入框的校验状态。" :code="statusCode">
                    <div class="demo-input-col">
                        <vort-input v-model="statusValue1" status="error" placeholder="错误状态" />
                        <vort-input v-model="statusValue2" status="warning" placeholder="警告状态" />
                    </div>
                </DemoBox>

                <DemoBox
                    title="形态变体"
                    description="提供 outlined / filled / borderless / underlined 四种形态，可通过 variant 属性设置。"
                    :code="variantCode"
                >
                    <div class="demo-input-col">
                        <vort-input v-model="variantValue1" variant="outlined" placeholder="outlined" />
                        <vort-input v-model="variantValue2" variant="filled" placeholder="filled" />
                        <vort-input v-model="variantValue3" variant="borderless" placeholder="borderless" />
                        <vort-input v-model="variantValue4" variant="underlined" placeholder="underlined" />
                        <vort-input-search v-model="searchValue1" variant="filled" placeholder="输入搜索内容" @search="handleSearch" />
                    </div>
                </DemoBox>

                <DemoBox title="无边框" description="没有边框的输入框。" :code="borderedCode">
                    <div class="demo-input-row">
                        <vort-input :bordered="false" placeholder="无边框输入框" />
                    </div>
                </DemoBox>

                <DemoBox title="前置/后置标签" description="使用 addonBefore 和 addonAfter 添加前置/后置标签。" :code="addonCode">
                    <div class="demo-input-col">
                        <vort-input v-model="addonValue1" placeholder="mysite">
                            <template #addonBefore>http://</template>
                            <template #addonAfter>.com</template>
                        </vort-input>
                        <vort-input v-model="addonValue2" placeholder="请输入网址">
                            <template #addonBefore>https://</template>
                        </vort-input>
                        <vort-input v-model="addonValue3" placeholder="请输入内容">
                            <template #addonAfter>.cn</template>
                        </vort-input>
                    </div>
                </DemoBox>

                <DemoBox
                    title="紧凑模式（Addon 支持 Select）"
                    description='使用 compact 属性开启紧凑模式，可在 addonBefore/addonAfter 中放置 Select 组件。Select 需设置 :bordered="false"。'
                    :code="compactCode"
                >
                    <div class="demo-input-col">
                        <vort-input v-model="compactValue1" compact placeholder="请输入网址">
                            <template #addonBefore>
                                <vort-select v-model="compactProtocol" :bordered="false" :options="protocolOptions" style="width: 100px" />
                            </template>
                            <template #addonAfter>
                                <vort-select v-model="compactDomain" :bordered="false" :options="domainOptions" style="width: 80px" />
                            </template>
                        </vort-input>
                        <vort-input v-model="compactValue2" compact placeholder="请输入手机号">
                            <template #addonBefore>
                                <vort-select v-model="compactAreaCode" :bordered="false" :options="areaCodeOptions" style="width: 110px" />
                            </template>
                        </vort-input>
                        <vort-input v-model="compactValue3" compact placeholder="请输入金额">
                            <template #addonAfter>
                                <vort-select v-model="compactCurrency" :bordered="false" :options="currencyOptions" style="width: 90px" />
                            </template>
                        </vort-input>
                    </div>
                </DemoBox>

                <DemoBox title="搜索框" description="带搜索按钮的输入框，支持自定义按钮文字。" :code="searchCode">
                    <div class="demo-input-col">
                        <vort-input-search v-model="searchValue1" placeholder="输入搜索内容" @search="handleSearch" />
                        <vort-input-search v-model="searchValue2" placeholder="输入搜索内容" :enter-button="true" @search="handleSearch" allow-clear />
                        <vort-input-search v-model="searchValue3" placeholder="输入搜索内容" enter-button="搜索" @search="handleSearch" />
                    </div>
                </DemoBox>

                <!-- Textarea 演示部分 -->
                <h3 class="demo-subsection-title">Textarea 文本域</h3>

                <DemoBox title="基本使用" description="用于多行文本输入。" :code="textareaBasicCode">
                    <div class="demo-textarea-row">
                        <vort-textarea v-model="textareaBasic" placeholder="请输入内容" :rows="4" />
                    </div>
                </DemoBox>

                <DemoBox title="字数统计" description="显示输入字数，可配合 maxlength 限制最大输入长度。" :code="textareaCountCode">
                    <div class="demo-textarea-col">
                        <vort-textarea v-model="textareaCount" placeholder="字数统计" show-count />
                        <vort-textarea v-model="textareaMaxCount" placeholder="最大 100 字符" :maxlength="100" show-count />
                    </div>
                </DemoBox>

                <DemoBox title="带清除按钮" description="带清除按钮的文本域，点击右下角图标可清除内容。" :code="textareaClearCode">
                    <div class="demo-textarea-row">
                        <vort-textarea v-model="textareaClear" allow-clear placeholder="可清除内容" />
                    </div>
                </DemoBox>

                <DemoBox title="自适应高度" description="文本域高度根据内容自动调整，可设置最小/最大行数。" :code="textareaAutoSizeCode">
                    <div class="demo-textarea-col">
                        <vort-textarea v-model="textareaAutoSize" placeholder="自适应高度" :auto-size="true" />
                        <vort-textarea v-model="textareaAutoSizeLimit" placeholder="限制 2-6 行" :auto-size="{ minRows: 2, maxRows: 6 }" />
                    </div>
                </DemoBox>

                <DemoBox title="禁用状态" description="添加 disabled 属性即可让文本域处于不可用状态。" :code="textareaDisabledCode">
                    <div class="demo-textarea-row">
                        <vort-textarea v-model="textareaDisabled" disabled />
                    </div>
                </DemoBox>

                <DemoBox title="文本域状态" description="使用 status 属性设置文本域的校验状态。" :code="textareaStatusCode">
                    <div class="demo-textarea-col">
                        <vort-textarea v-model="textareaError" status="error" placeholder="错误状态" />
                        <vort-textarea v-model="textareaWarning" status="warning" placeholder="警告状态" />
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Input Props</h3>
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

            <h3 class="demo-api-title">Input Slots</h3>
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

            <h3 class="demo-api-title">Input Events</h3>
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

            <h3 class="demo-api-title">InputPassword Props</h3>
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
                    <tr v-for="item in passwordPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">InputSearch Props</h3>
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
                    <tr v-for="item in searchPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">InputSearch Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in searchEventsData" :key="item.event">
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

            <h3 class="demo-api-title">Textarea Props</h3>
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
                    <tr v-for="item in textareaPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">Textarea Events</h3>
            <p class="demo-api-desc">Textarea 的事件与 Input 完全一致，请参考上方 Input Events 表格。</p>
        </section>
    </div>
</template>

<!-- 公共样式已在 demo.css 中定义 -->
