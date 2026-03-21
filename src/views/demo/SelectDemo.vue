<script setup lang="ts">
import { ref } from "vue";
import type { SelectOptionType } from "@/components/vort";
import DemoBox from "./components/DemoBox.vue";
import { SearchOutlined } from "@/components/vort/icons";

// 基础选项
const basicOptions: SelectOptionType[] = [
    { value: "jack", label: "Jack" },
    { value: "lucy", label: "Lucy" },
    { value: "tom", label: "Tom" },
    { value: "jerry", label: "Jerry" }
];

// 更多选项（用于多选演示）
const moreOptions: SelectOptionType[] = [
    { value: "gold", label: "Gold" },
    { value: "lime", label: "Lime" },
    { value: "green", label: "Green" },
    { value: "cyan", label: "Cyan" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" }
];

// 带禁用选项
const disabledOptions: SelectOptionType[] = [
    { value: "jack", label: "Jack" },
    { value: "lucy", label: "Lucy", disabled: true },
    { value: "tom", label: "Tom" },
    { value: "jerry", label: "Jerry", disabled: true }
];

// 状态值 - 单选
const value1 = ref<string>();
const value2 = ref<string>("lucy");
const value3 = ref<string>();
const value4 = ref<string>();
const value5 = ref<string>();
const value6 = ref<string>();
const value7 = ref<string>();
const value8 = ref<string>();
const value9 = ref<string>();
const value10 = ref<string>();
const value11 = ref<string>();
const value12 = ref<string>();

// 子组件方式选项值
const slotValue1 = ref<string>();
const slotValue2 = ref<string[]>([]);

// 状态值 - 多选
const multiValue1 = ref<string[]>([]);
const multiValue2 = ref<string[]>(["gold", "lime"]);
const multiValue3 = ref<string[]>(["gold", "lime", "green", "cyan", "blue"]);
const multiValue4 = ref<string[]>([]);

// getPopupContainer 示例
const value13 = ref<string>();
const scrollContainerRef = ref<HTMLElement | null>(null);

// bordered 示例
const value14 = ref<string>("lucy");
const value15 = ref<string[]>(["gold", "lime"]);

// 示例代码
const basicCode = `<script setup>
import { ref } from "vue";

const value = ref();

const options = [
  { value: "jack", label: "Jack" },
  { value: "lucy", label: "Lucy" },
  { value: "tom", label: "Tom" },
  { value: "jerry", label: "Jerry" }
];
<\/script>

<template>
  <vort-select v-model="value" :options="options" placeholder="请选择" />
</template>`;

const defaultValueCode = `<script setup>
import { ref } from "vue";

const value = ref("lucy");

const options = [
  { value: "jack", label: "Jack" },
  { value: "lucy", label: "Lucy" },
  { value: "tom", label: "Tom" }
];
<\/script>

<template>
  <vort-select v-model="value" :options="options" />
</template>`;

const sizeCode = `<template>
  <vort-select v-model="value1" :options="options" size="large" placeholder="Large" />
  <vort-select v-model="value2" :options="options" size="middle" placeholder="Middle" />
  <vort-select v-model="value3" :options="options" size="small" placeholder="Small" />
</template>`;

const disabledCode = `<template>
  <!-- 整体禁用 -->
  <vort-select :options="options" disabled placeholder="Disabled" />
  
  <!-- 选项禁用 -->
  <vort-select 
    v-model="value" 
    :options="[
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy', disabled: true },
      { value: 'tom', label: 'Tom' }
    ]" 
    placeholder="请选择"
  />
</template>`;

const statusCode = `<template>
  <vort-select :options="options" status="error" placeholder="Error" />
  <vort-select :options="options" status="warning" placeholder="Warning" />
</template>`;

const searchCode = `<script setup>
import { ref } from "vue";

const value = ref();
<\/script>

<template>
  <vort-select 
    v-model="value" 
    :options="options" 
    show-search 
    placeholder="请搜索选择"
  />
</template>`;

const clearCode = `<script setup>
import { ref } from "vue";

const value = ref("lucy");
<\/script>

<template>
  <vort-select 
    v-model="value" 
    :options="options" 
    allow-clear 
    placeholder="请选择"
  />
</template>`;

const multipleCode = `<script setup>
import { ref } from "vue";

const value = ref([]);

const options = [
  { value: "gold", label: "Gold" },
  { value: "lime", label: "Lime" },
  { value: "green", label: "Green" },
  { value: "cyan", label: "Cyan" }
];
<\/script>

<template>
  <vort-select 
    v-model="value" 
    :options="options" 
    mode="multiple"
    placeholder="请选择"
  />
</template>`;

const multipleSearchCode = `<script setup>
import { ref } from "vue";

const value = ref(["gold", "lime"]);
<\/script>

<template>
  <vort-select 
    v-model="value" 
    :options="options" 
    mode="multiple"
    show-search
    allow-clear
    placeholder="请搜索选择"
  />
</template>`;

const maxTagCountCode = `<script setup>
import { ref } from "vue";

const value = ref(["gold", "lime", "green", "cyan", "blue"]);
<\/script>

<template>
  <vort-select 
    v-model="value" 
    :options="options" 
    mode="multiple"
    :max-tag-count="3"
    placeholder="请选择"
  />
</template>`;

const prefixCode = `<script setup>
import { ref } from "vue";
import { SearchOutlined } from "@/components/vort/icons";

// 用户图标 SVG
const UserIcon = {
  template: \`<svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M858.5 763.6a374 374 0 00-80.6-119.5..."/>
  </svg>\`
};
<\/script>

<template>
  <vort-select v-model="value" :options="options" placeholder="请选择用户">
    <template #prefix>
      <UserIcon />
    </template>
  </vort-select>
  
  <vort-select v-model="value2" :options="options" show-search placeholder="搜索用户">
    <template #prefix>
      <SearchOutlined />
    </template>
  </vort-select>
</template>`;

const dropdownRenderCode = `<script setup>
import { ref } from "vue";

const value = ref();
<\/script>

<template>
  <vort-select v-model="value" :options="options" placeholder="请选择">
    <template #dropdownRender>
      <div class="p-2 border-t border-gray-200">
        <vort-button type="link" size="small" block>
          + 添加新选项
        </vort-button>
      </div>
    </template>
  </vort-select>
</template>`;

const getPopupContainerCode = `<script setup>
import { ref } from "vue";

const value = ref();
const scrollContainerRef = ref(null);
<\/script>

<template>
  <div 
    ref="scrollContainerRef" 
    style="height: 300px; overflow: auto; position: relative; border: 1px solid #d9d9d9; padding: 24px;"
  >
    <div style="height: 600px;">
      <p style="margin-bottom: 100px;">滚动容器内的 Select，下拉菜单相对于容器定位</p>
      <vort-select 
        v-model="value" 
        :options="options" 
        :get-popup-container="() => scrollContainerRef"
        placeholder="请选择" 
        style="width: 200px"
      />
      <p style="margin-top: 100px;">下方内容</p>
    </div>
  </div>
</template>`;

const borderedCode = `<script setup>
import { ref } from "vue";

const value1 = ref("lucy");
const value2 = ref(["gold", "lime"]);
<\/script>

<template>
  <!-- 有边框（默认） -->
  <vort-select v-model="value1" :options="options" placeholder="有边框" />
  
  <!-- 无边框 -->
  <vort-select v-model="value1" :options="options" :bordered="false" placeholder="无边框" />
  
  <!-- 多选无边框 -->
  <vort-select 
    v-model="value2" 
    :options="options" 
    mode="multiple"
    :bordered="false" 
    placeholder="多选无边框" 
  />
</template>`;

const slotOptionsCode = `<script setup>
import { ref } from "vue";

const value = ref();
<\/script>

<template>
  <!-- 使用 vort-select-option 子组件定义选项 -->
  <vort-select v-model="value" placeholder="请选择">
    <vort-select-option value="jack">Jack</vort-select-option>
    <vort-select-option value="lucy">Lucy</vort-select-option>
    <vort-select-option value="tom">Tom</vort-select-option>
    <vort-select-option value="jerry" disabled>Jerry (禁用)</vort-select-option>
  </vort-select>
</template>`;

const slotOptionsMultipleCode = `<script setup>
import { ref } from "vue";

const value = ref([]);
<\/script>

<template>
  <!-- 多选模式下使用子组件定义选项 -->
  <vort-select v-model="value" mode="multiple" placeholder="请选择">
    <vort-select-option value="gold">Gold</vort-select-option>
    <vort-select-option value="lime">Lime</vort-select-option>
    <vort-select-option value="green">Green</vort-select-option>
    <vort-select-option value="cyan">Cyan</vort-select-option>
  </vort-select>
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "v-model",
        desc: "当前选中的值，单选时为 string | number，多选时为数组",
        type: "string | number | (string | number)[]",
        default: "-"
    },
    {
        prop: "options",
        desc: "数据化配置选项内容",
        type: "SelectOption[]",
        default: "[]"
    },
    {
        prop: "placeholder",
        desc: "选择框默认文本",
        type: "string",
        default: "'请选择'"
    },
    {
        prop: "size",
        desc: "选择框大小",
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
        prop: "status",
        desc: "设置校验状态",
        type: "'error' | 'warning'",
        default: "-"
    },
    {
        prop: "mode",
        desc: "设置 Select 的模式为多选",
        type: "'multiple' | 'tags'",
        default: "-"
    },
    {
        prop: "showSearch",
        desc: "是否支持搜索",
        type: "boolean",
        default: "false"
    },
    {
        prop: "allowClear",
        desc: "是否支持清除",
        type: "boolean",
        default: "false"
    },
    {
        prop: "maxTagCount",
        desc: "最多显示多少个 tag",
        type: "number | 'responsive'",
        default: "-"
    },
    {
        prop: "maxTagPlaceholder",
        desc: "隐藏 tag 时显示的内容",
        type: "string | ((omittedValues) => string)",
        default: "'+ N ...'"
    },
    {
        prop: "filterOption",
        desc: "是否根据输入项进行筛选",
        type: "boolean | ((inputValue, option) => boolean)",
        default: "true"
    },
    {
        prop: "notFoundContent",
        desc: "当下拉列表为空时显示的内容",
        type: "string",
        default: "'无匹配结果'"
    },
    {
        prop: "listHeight",
        desc: "设置弹窗滚动高度",
        type: "number",
        default: "256"
    },
    {
        prop: "autoClearSearchValue",
        desc: "是否在选中项后清空搜索框",
        type: "boolean",
        default: "true"
    },
    {
        prop: "getPopupContainer",
        desc: "菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位",
        type: "() => HTMLElement",
        default: "-"
    },
    {
        prop: "bordered",
        desc: "是否有边框",
        type: "boolean",
        default: "true"
    }
];

// SelectOption 类型表格数据
const optionData = [
    {
        prop: "value",
        desc: "选项值",
        type: "string | number",
        default: "-"
    },
    {
        prop: "label",
        desc: "选项标签",
        type: "string",
        default: "-"
    },
    {
        prop: "disabled",
        desc: "是否禁用",
        type: "boolean",
        default: "false"
    }
];

// VortSelectOption 组件 Props 表格数据
const selectOptionPropsData = [
    {
        prop: "value",
        desc: "选项值（必填）",
        type: "string | number",
        default: "-"
    },
    {
        prop: "label",
        desc: "选项标签（可选，默认使用插槽内容）",
        type: "string",
        default: "插槽文本内容"
    },
    {
        prop: "disabled",
        desc: "是否禁用",
        type: "boolean",
        default: "false"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "change",
        desc: "选中值发生变化时触发",
        params: "(value, option) => void"
    },
    {
        event: "search",
        desc: "搜索框值变化时触发",
        params: "(value: string) => void"
    },
    {
        event: "select",
        desc: "选中选项时触发",
        params: "(value, option) => void"
    },
    {
        event: "deselect",
        desc: "取消选中时触发（仅多选）",
        params: "(value, option) => void"
    },
    {
        event: "clear",
        desc: "清除内容时触发",
        params: "() => void"
    },
    {
        event: "focus",
        desc: "获得焦点时触发",
        params: "(event: FocusEvent) => void"
    },
    {
        event: "blur",
        desc: "失去焦点时触发",
        params: "(event: FocusEvent) => void"
    }
];

// Slots 表格数据
const slotsData = [
    {
        slot: "default",
        desc: "选项内容，可放置 vort-select-option 子组件"
    },
    {
        slot: "prefix",
        desc: "选择框前缀图标"
    },
    {
        slot: "suffix",
        desc: "选择框后缀图标"
    },
    {
        slot: "dropdownRender",
        desc: "自定义下拉框底部内容"
    },
    {
        slot: "dropdownSearch",
        desc: "自定义下拉框顶部搜索区域"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Select 选择器</h1>
            <p class="demo-page-desc">下拉选择器，支持单选、多选、搜索等功能，采用 Ant Design 风格。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>弹出一个下拉菜单给用户选择操作，用于代替原生的选择器。</li>
                <li>当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。</li>
                <li>当需要从大量选项中选择时，可以使用搜索功能快速定位。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基本使用 -->
                <DemoBox title="基本使用" description="基本使用，适用于在多个选项中选择一个的场景。" :code="basicCode">
                    <vort-select v-model="value1" :options="basicOptions" placeholder="请选择" style="width: 200px" />
                </DemoBox>

                <!-- 带初始值 -->
                <DemoBox title="带初始值" description="通过设置 v-model 的初始值来指定默认选中的选项。" :code="defaultValueCode">
                    <vort-select v-model="value2" :options="basicOptions" style="width: 200px" />
                </DemoBox>

                <!-- 子组件方式定义选项 -->
                <DemoBox
                    title="子组件方式定义选项"
                    description="除了使用 options 属性，也可以通过 vort-select-option 子组件声明式地定义选项。"
                    :code="slotOptionsCode"
                >
                    <vort-select v-model="slotValue1" placeholder="请选择" style="width: 200px">
                        <vort-select-option value="jack">Jack</vort-select-option>
                        <vort-select-option value="lucy">Lucy</vort-select-option>
                        <vort-select-option value="tom">Tom</vort-select-option>
                        <vort-select-option value="jerry" disabled>Jerry (禁用)</vort-select-option>
                    </vort-select>
                </DemoBox>

                <!-- 子组件方式 - 多选模式 -->
                <DemoBox title="子组件方式 - 多选模式" description="多选模式下也可以使用 vort-select-option 子组件定义选项。" :code="slotOptionsMultipleCode">
                    <vort-select v-model="slotValue2" mode="multiple" placeholder="请选择" style="width: 100%; max-width: 400px">
                        <vort-select-option value="gold">Gold</vort-select-option>
                        <vort-select-option value="lime">Lime</vort-select-option>
                        <vort-select-option value="green">Green</vort-select-option>
                        <vort-select-option value="cyan">Cyan</vort-select-option>
                    </vort-select>
                </DemoBox>

                <!-- 三种大小 -->
                <DemoBox
                    title="三种大小"
                    description="三种大小的选择框，当 size 分别为 large 和 small 时，输入框高度为 40px 和 24px ，默认高度为 32px。"
                    :code="sizeCode"
                >
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-select v-model="value3" :options="basicOptions" size="large" placeholder="Large" style="width: 200px" />
                        <vort-select v-model="value4" :options="basicOptions" size="middle" placeholder="Middle" style="width: 200px" />
                        <vort-select v-model="value5" :options="basicOptions" size="small" placeholder="Small" style="width: 200px" />
                    </div>
                </DemoBox>

                <!-- 无边框 -->
                <DemoBox title="无边框" description="设置 bordered 为 false 可以隐藏边框，适合嵌入到其他组件中使用。" :code="borderedCode">
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-4 flex-wrap">
                            <vort-select v-model="value14" :options="basicOptions" placeholder="有边框" style="width: 200px" />
                            <vort-select v-model="value14" :options="basicOptions" :bordered="false" placeholder="无边框" style="width: 200px" />
                        </div>
                        <vort-select
                            v-model="value15"
                            :options="moreOptions"
                            mode="multiple"
                            :bordered="false"
                            placeholder="多选无边框"
                            style="width: 100%; max-width: 400px"
                        />
                    </div>
                </DemoBox>

                <!-- 带搜索 -->
                <DemoBox title="带搜索框" description="展开后可对选项进行搜索筛选。" :code="searchCode">
                    <vort-select v-model="value9" :options="basicOptions" show-search placeholder="请搜索选择" style="width: 200px" />
                </DemoBox>

                <!-- 可清除 -->
                <DemoBox title="可清除" description="设置 allowClear 属性，鼠标悬停时显示清除按钮。" :code="clearCode">
                    <vort-select v-model="value10" :options="basicOptions" allow-clear placeholder="请选择" style="width: 200px" />
                </DemoBox>

                <!-- 禁用状态 -->
                <DemoBox title="禁用状态" description="禁用整个选择框或单独禁用某些选项。" :code="disabledCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-select :options="basicOptions" disabled placeholder="Disabled" style="width: 200px" />
                        <vort-select v-model="value6" :options="disabledOptions" placeholder="部分禁用" style="width: 200px" />
                    </div>
                </DemoBox>

                <!-- 校验状态 -->
                <DemoBox title="校验状态" description="使用 status 属性设置校验状态，可选值为 error 或 warning。" :code="statusCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-select v-model="value7" :options="basicOptions" status="error" placeholder="Error" style="width: 200px" />
                        <vort-select v-model="value8" :options="basicOptions" status="warning" placeholder="Warning" style="width: 200px" />
                    </div>
                </DemoBox>

                <!-- 多选模式 -->
                <DemoBox title="多选模式" description="多选模式，通过设置 mode='multiple' 启用。" :code="multipleCode">
                    <vort-select v-model="multiValue1" :options="moreOptions" mode="multiple" placeholder="请选择" style="width: 100%; max-width: 400px" />
                </DemoBox>

                <!-- 多选带搜索 -->
                <DemoBox title="多选带搜索" description="多选模式下，可以结合搜索和清除功能一起使用。" :code="multipleSearchCode">
                    <vort-select
                        v-model="multiValue2"
                        :options="moreOptions"
                        mode="multiple"
                        show-search
                        allow-clear
                        placeholder="请搜索选择"
                        style="width: 100%; max-width: 400px"
                    />
                </DemoBox>

                <!-- 最大标签数 -->
                <DemoBox title="最大标签数" description="使用 maxTagCount 限制显示的标签数量，超出部分会折叠显示。" :code="maxTagCountCode">
                    <vort-select
                        v-model="multiValue3"
                        :options="moreOptions"
                        mode="multiple"
                        :max-tag-count="3"
                        placeholder="请选择"
                        style="width: 100%; max-width: 400px"
                    />
                </DemoBox>

                <!-- 前缀图标 -->
                <DemoBox title="前缀图标" description="通过 prefix 插槽可以自定义前缀图标。" :code="prefixCode">
                    <div class="flex items-center gap-4 flex-wrap">
                        <vort-select v-model="value11" :options="basicOptions" placeholder="请选择用户" style="width: 200px">
                            <template #prefix>
                                <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                                    <path
                                        d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
                                    />
                                </svg>
                            </template>
                        </vort-select>
                        <vort-select v-model="value12" :options="basicOptions" show-search placeholder="搜索用户" style="width: 200px">
                            <template #prefix>
                                <SearchOutlined />
                            </template>
                        </vort-select>
                    </div>
                </DemoBox>

                <!-- 自定义下拉内容 -->
                <DemoBox title="自定义下拉内容" description="使用 dropdownRender 插槽可以在下拉框底部添加自定义内容，如添加按钮。" :code="dropdownRenderCode">
                    <vort-select v-model="multiValue4" :options="moreOptions" mode="multiple" placeholder="请选择" style="width: 100%; max-width: 400px">
                        <template #dropdownRender>
                            <div class="p-2">
                                <vort-button type="link" size="small" block> + 添加新选项 </vort-button>
                            </div>
                        </template>
                    </vort-select>
                </DemoBox>

                <!-- 自定义弹出容器 -->
                <DemoBox
                    title="自定义弹出容器"
                    description="使用 getPopupContainer 可以自定义下拉菜单的渲染父节点，解决滚动定位问题。"
                    :code="getPopupContainerCode"
                >
                    <div
                        ref="scrollContainerRef"
                        style="height: 300px; overflow: auto; position: relative; border: 1px solid var(--vort-border); padding: 24px; border-radius: 4px"
                    >
                        <div style="height: 600px">
                            <p style="margin-bottom: 100px; color: var(--vort-text-secondary)">滚动容器内的 Select，下拉菜单相对于容器定位，不会被容器裁剪</p>
                            <vort-select
                                v-model="value13"
                                :options="basicOptions"
                                :get-popup-container="() => scrollContainerRef!"
                                placeholder="请选择"
                                style="width: 200px"
                            />
                            <p style="margin-top: 100px; color: var(--vort-text-secondary)">下方内容</p>
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

            <h3 class="demo-api-title">SelectOption (options 数组项类型)</h3>
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

            <h3 class="demo-api-title">VortSelectOption 组件 Props</h3>
            <p class="demo-api-desc">通过子组件方式定义选项时使用</p>
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
                    <tr v-for="item in selectOptionPropsData" :key="item.prop">
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

<!-- 公共样式已在 demo.css 中定义 -->
