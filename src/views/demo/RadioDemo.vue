<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 示例数据
const basicValue = ref("a");
const disabledValue = ref("a");
const sizeValue = ref("middle");
const buttonValue = ref("a");
const solidValue = ref("a");
const plainValue = ref("a");
const optionsValue = ref("Apple");
const buttonOptionsValue = ref("Apple");
const changeValue = ref("a");
const lastChangeEventType = ref("");
const changeTriggerCount = ref(0);

// Options 配置
const plainOptions = ["Apple", "Pear", "Orange"];
const optionsWithDisabled = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange", disabled: true }
];

// 示例代码
const basicCode = `<script setup>
import { ref } from 'vue';
const value = ref('a');
<\/script>

<template>
  <vort-radio-group v-model="value">
    <vort-radio value="a">A</vort-radio>
    <vort-radio value="b">B</vort-radio>
    <vort-radio value="c">C</vort-radio>
    <vort-radio value="d">D</vort-radio>
  </vort-radio-group>
</template>`;

const disabledCode = `<template>
  <vort-radio disabled>禁用</vort-radio>
  <vort-radio disabled checked>禁用且选中</vort-radio>

  <vort-radio-group v-model="value" disabled>
    <vort-radio value="a">A</vort-radio>
    <vort-radio value="b">B</vort-radio>
  </vort-radio-group>
</template>`;

const sizeCode = `<script setup>
import { ref } from 'vue';
const value = ref('middle');
<\/script>

<template>
  <vort-radio-group v-model="value" size="large">
    <vort-radio value="large">Large</vort-radio>
    <vort-radio value="middle">Default</vort-radio>
    <vort-radio value="small">Small</vort-radio>
  </vort-radio-group>

  <vort-radio-group v-model="value">
    <vort-radio value="large">Large</vort-radio>
    <vort-radio value="middle">Default</vort-radio>
    <vort-radio value="small">Small</vort-radio>
  </vort-radio-group>

  <vort-radio-group v-model="value" size="small">
    <vort-radio value="large">Large</vort-radio>
    <vort-radio value="middle">Default</vort-radio>
    <vort-radio value="small">Small</vort-radio>
  </vort-radio-group>
</template>`;

const buttonCode = `<script setup>
import { ref } from 'vue';
const value = ref('a');
<\/script>

<template>
  <vort-radio-group v-model="value">
    <vort-radio-button value="a">杭州</vort-radio-button>
    <vort-radio-button value="b">上海</vort-radio-button>
    <vort-radio-button value="c">北京</vort-radio-button>
    <vort-radio-button value="d">成都</vort-radio-button>
  </vort-radio-group>

  <vort-radio-group v-model="value" disabled>
    <vort-radio-button value="a">杭州</vort-radio-button>
    <vort-radio-button value="b">上海</vort-radio-button>
    <vort-radio-button value="c">北京</vort-radio-button>
    <vort-radio-button value="d">成都</vort-radio-button>
  </vort-radio-group>
</template>`;

const solidCode = `<script setup>
import { ref } from 'vue';
const value = ref('a');
<\/script>

<template>
  <vort-radio-group v-model="value" button-style="solid">
    <vort-radio-button value="a">杭州</vort-radio-button>
    <vort-radio-button value="b">上海</vort-radio-button>
    <vort-radio-button value="c">北京</vort-radio-button>
    <vort-radio-button value="d">成都</vort-radio-button>
  </vort-radio-group>

  <vort-radio-group v-model="value" button-style="solid" disabled>
    <vort-radio-button value="a">杭州</vort-radio-button>
    <vort-radio-button value="b">上海</vort-radio-button>
    <vort-radio-button value="c">北京</vort-radio-button>
    <vort-radio-button value="d">成都</vort-radio-button>
  </vort-radio-group>
</template>`;

const plainCode = `<script setup>
import { ref } from 'vue';
const value = ref('a');
<\/script>

<template>
  <vort-radio-group v-model="value" button-style="plain">
    <vort-radio-button value="a">杭州</vort-radio-button>
    <vort-radio-button value="b">上海</vort-radio-button>
    <vort-radio-button value="c">北京</vort-radio-button>
    <vort-radio-button value="d">成都</vort-radio-button>
  </vort-radio-group>

  <vort-radio-group v-model="value" button-style="plain" disabled>
    <vort-radio-button value="a">杭州</vort-radio-button>
    <vort-radio-button value="b">上海</vort-radio-button>
    <vort-radio-button value="c">北京</vort-radio-button>
    <vort-radio-button value="d">成都</vort-radio-button>
  </vort-radio-group>
</template>`;

const optionsCode = `<script setup>
import { ref } from 'vue';
const value = ref('Apple');

const plainOptions = ['Apple', 'Pear', 'Orange'];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];
<\/script>

<template>
  <!-- 简单数组 -->
  <vort-radio-group v-model="value" :options="plainOptions" />

  <!-- 对象数组（带禁用项） -->
  <vort-radio-group v-model="value" :options="optionsWithDisabled" />

  <!-- 按钮样式 + options -->
  <vort-radio-group v-model="value" :options="plainOptions" option-type="button" />

  <!-- 按钮样式 + options + solid -->
  <vort-radio-group v-model="value" :options="plainOptions" option-type="button" button-style="solid" />
</template>`;

const changeCode = `<script setup>
import { ref } from 'vue';

const value = ref('a');
const lastChangeEventType = ref('');

const handleChange = (event: Event) => {
  lastChangeEventType.value = event.type;
};
<\/script>

<template>
  <vort-radio-group v-model="value" @change="handleChange">
    <vort-radio value="a">A</vort-radio>
    <vort-radio value="b">B</vort-radio>
    <vort-radio value="c">C</vort-radio>
  </vort-radio-group>

  <p>当前选中值：{{ value }}</p>
  <p>最近一次事件类型：{{ lastChangeEventType }}</p>
</template>`;

// Props 表格数据
const radioPropsData = [
    { prop: "value", desc: "根据 value 进行比较，判断是否选中", type: "string | number", default: "-" },
    { prop: "checked", desc: "是否选中（非 RadioGroup 下使用）", type: "boolean", default: "false" },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" }
];

const radioGroupPropsData = [
    { prop: "v-model", desc: "当前选中的值", type: "string | number", default: "-" },
    { prop: "defaultValue", desc: "默认选中的值", type: "string | number", default: "-" },
    { prop: "disabled", desc: "禁用整组", type: "boolean", default: "false" },
    { prop: "size", desc: "大小", type: "'large' | 'middle' | 'small'", default: "'middle'" },
    { prop: "buttonStyle", desc: "RadioButton 的风格样式", type: "'outline' | 'solid' | 'plain'", default: "'outline'" },
    { prop: "optionType", desc: "用于设置 Radio options 类型", type: "'default' | 'button'", default: "'default'" },
    { prop: "options", desc: "以配置形式设置子元素", type: "string[] | Array<{ label, value, disabled? }>", default: "-" },
    { prop: "name", desc: 'RadioGroup 下所有 input[type="radio"] 的 name 属性', type: "string", default: "-" }
];

const radioEventsData = [{ event: "change", desc: "选项变化时的回调函数", params: "(event: Event) => void" }];

const radioGroupEventsData = [
    { event: "update:modelValue", desc: "选中项变化时触发（v-model）", params: "(value: string | number) => void" },
    { event: "change", desc: "选中项变化时触发，如需最新值请直接读取 v-model", params: "(event: Event) => void" }
];

const handleGroupChange = (event: Event) => {
    lastChangeEventType.value = event.type;
    changeTriggerCount.value += 1;
};
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Radio 单选框</h1>
            <p class="demo-page-desc">单选框，用于在多个备选项中选中单个状态。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>用于在多个备选项中选中单个状态。</li>
                <li>和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本使用" description="最简单的用法，使用 RadioGroup 管理一组单选框。" :code="basicCode">
                    <vort-radio-group v-model="basicValue">
                        <vort-radio value="a">A</vort-radio>
                        <vort-radio value="b">B</vort-radio>
                        <vort-radio value="c">C</vort-radio>
                        <vort-radio value="d">D</vort-radio>
                    </vort-radio-group>
                    <p class="demo-result">当前选中: {{ basicValue }}</p>
                </DemoBox>

                <DemoBox title="禁用状态" description="Radio 或 RadioGroup 设置 disabled 属性即可禁用。" :code="disabledCode">
                    <div class="demo-col">
                        <div class="demo-row">
                            <vort-radio disabled>禁用</vort-radio>
                            <vort-radio disabled :checked="true">禁用且选中</vort-radio>
                        </div>
                        <vort-radio-group v-model="disabledValue" disabled>
                            <vort-radio value="a">A</vort-radio>
                            <vort-radio value="b">B</vort-radio>
                        </vort-radio-group>
                    </div>
                </DemoBox>

                <DemoBox title="三种大小" description="大中小三种组合，可以和表单输入框进行对应配合。" :code="sizeCode">
                    <div class="demo-col">
                        <vort-radio-group v-model="sizeValue" size="large">
                            <vort-radio value="large">Large</vort-radio>
                            <vort-radio value="middle">Default</vort-radio>
                            <vort-radio value="small">Small</vort-radio>
                        </vort-radio-group>
                        <vort-radio-group v-model="sizeValue">
                            <vort-radio value="large">Large</vort-radio>
                            <vort-radio value="middle">Default</vort-radio>
                            <vort-radio value="small">Small</vort-radio>
                        </vort-radio-group>
                        <vort-radio-group v-model="sizeValue" size="small">
                            <vort-radio value="large">Large</vort-radio>
                            <vort-radio value="middle">Default</vort-radio>
                            <vort-radio value="small">Small</vort-radio>
                        </vort-radio-group>
                    </div>
                </DemoBox>

                <DemoBox title="按钮样式" description="按钮样式的单选组合，使用 RadioButton 组件。" :code="buttonCode">
                    <div class="demo-col">
                        <vort-radio-group v-model="buttonValue">
                            <vort-radio-button value="a">杭州</vort-radio-button>
                            <vort-radio-button value="b">上海</vort-radio-button>
                            <vort-radio-button value="c">北京</vort-radio-button>
                            <vort-radio-button value="d">成都</vort-radio-button>
                        </vort-radio-group>
                        <vort-radio-group v-model="buttonValue" disabled>
                            <vort-radio-button value="a">杭州</vort-radio-button>
                            <vort-radio-button value="b">上海</vort-radio-button>
                            <vort-radio-button value="c">北京</vort-radio-button>
                            <vort-radio-button value="d">成都</vort-radio-button>
                        </vort-radio-group>
                    </div>
                </DemoBox>

                <DemoBox title="填底的按钮样式" description="实色填底的单选按钮样式，设置 buttonStyle='solid'。" :code="solidCode">
                    <div class="demo-col">
                        <vort-radio-group v-model="solidValue" button-style="solid">
                            <vort-radio-button value="a">杭州</vort-radio-button>
                            <vort-radio-button value="b">上海</vort-radio-button>
                            <vort-radio-button value="c">北京</vort-radio-button>
                            <vort-radio-button value="d">成都</vort-radio-button>
                        </vort-radio-group>
                        <vort-radio-group v-model="solidValue" button-style="solid" disabled>
                            <vort-radio-button value="a">杭州</vort-radio-button>
                            <vort-radio-button value="b">上海</vort-radio-button>
                            <vort-radio-button value="c">北京</vort-radio-button>
                            <vort-radio-button value="d">成都</vort-radio-button>
                        </vort-radio-group>
                    </div>
                </DemoBox>

                <DemoBox
                    title="朴素的按钮样式"
                    description="朴素风格的单选按钮样式，设置 buttonStyle='plain'。未选中时无边框透明背景，选中时显示主色浅底。"
                    :code="plainCode"
                >
                    <div class="demo-col">
                        <vort-radio-group v-model="plainValue" button-style="plain">
                            <vort-radio-button value="a">杭州</vort-radio-button>
                            <vort-radio-button value="b">上海</vort-radio-button>
                            <vort-radio-button value="c">北京</vort-radio-button>
                            <vort-radio-button value="d">成都</vort-radio-button>
                        </vort-radio-group>
                        <vort-radio-group v-model="plainValue" button-style="plain" disabled>
                            <vort-radio-button value="a">杭州</vort-radio-button>
                            <vort-radio-button value="b">上海</vort-radio-button>
                            <vort-radio-button value="c">北京</vort-radio-button>
                            <vort-radio-button value="d">成都</vort-radio-button>
                        </vort-radio-group>
                    </div>
                </DemoBox>

                <DemoBox title="配置方式" description="通过配置 options 参数来渲染单选框，可以省去单独写 Radio 组件。" :code="optionsCode">
                    <div class="demo-col">
                        <vort-radio-group v-model="optionsValue" :options="plainOptions" />
                        <vort-radio-group v-model="optionsValue" :options="optionsWithDisabled" />
                        <vort-radio-group v-model="buttonOptionsValue" :options="plainOptions" option-type="button" />
                        <vort-radio-group v-model="buttonOptionsValue" :options="plainOptions" option-type="button" button-style="solid" />
                    </div>
                </DemoBox>

                <DemoBox
                    title="Change 事件"
                    description="`change` 当前用于通知交互事件本身；最新选中值请直接通过 `v-model` 读取。"
                    :code="changeCode"
                >
                    <div class="demo-col">
                        <vort-radio-group v-model="changeValue" @change="handleGroupChange">
                            <vort-radio value="a">A</vort-radio>
                            <vort-radio value="b">B</vort-radio>
                            <vort-radio value="c">C</vort-radio>
                        </vort-radio-group>
                        <p class="demo-result">当前选中: {{ changeValue }}</p>
                        <p class="demo-result">最近一次事件类型: {{ lastChangeEventType || "-" }}</p>
                        <p class="demo-result">change 触发次数: {{ changeTriggerCount }}</p>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Radio Props</h3>
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
                    <tr v-for="item in radioPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">RadioGroup Props</h3>
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
                    <tr v-for="item in radioGroupPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">Radio Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in radioEventsData" :key="item.event">
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

            <h3 class="demo-api-title">RadioGroup Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in radioGroupEventsData" :key="item.event">
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
