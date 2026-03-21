<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 示例数据
const basicChecked = ref(false);
const groupValue = ref<string[]>(["Apple"]);
const disabledValue = ref<string[]>(["Apple"]);
const indeterminateChecked = ref(false);
const indeterminate = ref(true);
const optionsValue = ref<string[]>(["Pear"]);

// 全选相关
const checkAll = ref(false);
const checkedList = ref<string[]>(["Apple", "Orange"]);
const plainOptions = ["Apple", "Pear", "Orange"];

const onCheckAllChange = (e: Event, checked: boolean) => {
    checkedList.value = checked ? [...plainOptions] : [];
    indeterminate.value = false;
    checkAll.value = checked;
};

const onGroupChange = (values: string[]) => {
    checkedList.value = values as string[];
    checkAll.value = values.length === plainOptions.length;
    indeterminate.value = values.length > 0 && values.length < plainOptions.length;
};

// Options 配置
const optionsWithDisabled = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange", disabled: true }
];

// 示例代码
const basicCode = `<script setup>
import { ref } from 'vue';
const checked = ref(false);
<\/script>

<template>
  <vort-checkbox v-model:checked="checked">Checkbox</vort-checkbox>
</template>`;

const disabledCode = `<template>
  <vort-checkbox disabled>禁用</vort-checkbox>
  <vort-checkbox disabled :checked="true">禁用且选中</vort-checkbox>

  <vort-checkbox-group v-model="value" disabled>
    <vort-checkbox value="Apple">Apple</vort-checkbox>
    <vort-checkbox value="Pear">Pear</vort-checkbox>
  </vort-checkbox-group>
</template>`;

const groupCode = `<script setup>
import { ref } from 'vue';
const value = ref(['Apple']);
<\/script>

<template>
  <vort-checkbox-group v-model="value">
    <vort-checkbox value="Apple">Apple</vort-checkbox>
    <vort-checkbox value="Pear">Pear</vort-checkbox>
    <vort-checkbox value="Orange">Orange</vort-checkbox>
  </vort-checkbox-group>
</template>`;

const indeterminateCode = `<script setup>
import { ref } from 'vue';

const checkAll = ref(false);
const indeterminate = ref(true);
const checkedList = ref(['Apple', 'Orange']);
const plainOptions = ['Apple', 'Pear', 'Orange'];

const onCheckAllChange = (e, checked) => {
  checkedList.value = checked ? [...plainOptions] : [];
  indeterminate.value = false;
  checkAll.value = checked;
};

const onGroupChange = (values) => {
  checkAll.value = values.length === plainOptions.length;
  indeterminate.value = values.length > 0 && values.length < plainOptions.length;
};
<\/script>

<template>
  <div>
    <vort-checkbox
      v-model:checked="checkAll"
      :indeterminate="indeterminate"
      @change="onCheckAllChange"
    >
      Check all
    </vort-checkbox>
  </div>
  <hr />
  <vort-checkbox-group
    v-model="checkedList"
    :options="plainOptions"
    @change="onGroupChange"
  />
</template>`;

const optionsCode = `<script setup>
import { ref } from 'vue';
const value = ref(['Pear']);

const plainOptions = ['Apple', 'Pear', 'Orange'];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];
<\/script>

<template>
  <!-- 简单数组 -->
  <vort-checkbox-group v-model="value" :options="plainOptions" />

  <!-- 对象数组（带禁用项） -->
  <vort-checkbox-group v-model="value" :options="optionsWithDisabled" />
</template>`;

// Props 表格数据
const checkboxPropsData = [
    { prop: "v-model:checked", desc: "是否选中", type: "boolean", default: "false" },
    { prop: "value", desc: "在 CheckboxGroup 中使用时的值", type: "string | number", default: "-" },
    { prop: "indeterminate", desc: "设置 indeterminate 状态，只负责样式控制", type: "boolean", default: "false" },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" }
];

const checkboxGroupPropsData = [
    { prop: "v-model", desc: "当前选中的值数组", type: "(string | number)[]", default: "[]" },
    { prop: "defaultValue", desc: "默认选中的值数组", type: "(string | number)[]", default: "[]" },
    { prop: "disabled", desc: "禁用整组", type: "boolean", default: "false" },
    { prop: "options", desc: "以配置形式设置子元素", type: "string[] | Array<{ label, value, disabled? }>", default: "-" },
    { prop: "name", desc: 'CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性', type: "string", default: "-" }
];

const checkboxEventsData = [
    { event: "update:checked", desc: "选中状态变化时触发（v-model）", params: "(checked: boolean) => void" },
    { event: "change", desc: "选中状态变化时的回调函数", params: "(event: Event, checked: boolean) => void" }
];

const checkboxGroupEventsData = [
    { event: "update:modelValue", desc: "选中项变化时触发（v-model）", params: "(values: (string | number)[]) => void" },
    { event: "change", desc: "选中项变化时的回调函数", params: "(checkedValues: (string | number)[]) => void" }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Checkbox 复选框</h1>
            <p class="demo-page-desc">复选框，用于在一组选项中进行多选。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>在一组可选项中进行多项选择时。</li>
                <li>
                    单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox
                    一般用于状态标记，需要和提交操作配合。
                </li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本使用" description="最简单的用法。" :code="basicCode">
                    <vort-checkbox v-model:checked="basicChecked">Checkbox</vort-checkbox>
                    <p class="demo-result">当前状态: {{ basicChecked ? "选中" : "未选中" }}</p>
                </DemoBox>

                <DemoBox title="禁用状态" description="Checkbox 或 CheckboxGroup 设置 disabled 属性即可禁用。" :code="disabledCode">
                    <div class="demo-col">
                        <div class="demo-row">
                            <vort-checkbox disabled>禁用</vort-checkbox>
                            <vort-checkbox disabled :checked="true">禁用且选中</vort-checkbox>
                        </div>
                        <vort-checkbox-group v-model="disabledValue" disabled>
                            <vort-checkbox value="Apple">Apple</vort-checkbox>
                            <vort-checkbox value="Pear">Pear</vort-checkbox>
                        </vort-checkbox-group>
                    </div>
                </DemoBox>

                <DemoBox title="复选框组" description="使用 CheckboxGroup 管理一组复选框。" :code="groupCode">
                    <vort-checkbox-group v-model="groupValue">
                        <vort-checkbox value="Apple">Apple</vort-checkbox>
                        <vort-checkbox value="Pear">Pear</vort-checkbox>
                        <vort-checkbox value="Orange">Orange</vort-checkbox>
                    </vort-checkbox-group>
                    <p class="demo-result">当前选中: {{ groupValue.join(", ") || "无" }}</p>
                </DemoBox>

                <DemoBox title="全选" description="在实现全选效果时，你可能会用到 indeterminate 属性。" :code="indeterminateCode">
                    <div class="demo-col">
                        <vort-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange"> Check all </vort-checkbox>
                        <hr class="demo-divider" />
                        <vort-checkbox-group
                            v-model="checkedList"
                            :options="plainOptions"
                            @change="(val: (string | number)[]) => onGroupChange(val as string[])"
                        />
                    </div>
                </DemoBox>

                <DemoBox title="配置方式" description="通过配置 options 参数来渲染复选框，可以省去单独写 Checkbox 组件。" :code="optionsCode">
                    <div class="demo-col">
                        <vort-checkbox-group v-model="optionsValue" :options="plainOptions" />
                        <vort-checkbox-group v-model="optionsValue" :options="optionsWithDisabled" />
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Checkbox Props</h3>
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
                    <tr v-for="item in checkboxPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">CheckboxGroup Props</h3>
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
                    <tr v-for="item in checkboxGroupPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">Checkbox Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in checkboxEventsData" :key="item.event">
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

            <h3 class="demo-api-title">CheckboxGroup Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in checkboxGroupEventsData" :key="item.event">
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
