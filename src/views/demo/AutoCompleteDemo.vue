<script setup lang="ts">
import { ref, computed } from "vue";
import DemoBox from "./components/DemoBox.vue";
import type { AutoCompleteOption } from "@/components/vort/auto-complete";

// ============ 基本用法 ============
const basicValue = ref("");
const basicOptions = computed<AutoCompleteOption[]>(() => {
    if (!basicValue.value) return [];
    return [
        { value: `${basicValue.value}` },
        { value: `${basicValue.value}${basicValue.value}` },
        { value: `${basicValue.value}${basicValue.value}${basicValue.value}` }
    ];
});

// ============ 自定义选项 ============
const customValue = ref("");
const customOptions: AutoCompleteOption[] = [
    { value: "Burns Bay Road", label: "Burns Bay Road" },
    { value: "Downing Street", label: "Downing Street" },
    { value: "Wall Street", label: "Wall Street" }
];

// ============ 不区分大小写 ============
const caseValue = ref("");
const caseOptions: AutoCompleteOption[] = [{ value: "Burns Bay Road" }, { value: "Downing Street" }, { value: "Wall Street" }];
const filterOptionIgnoreCase = (input: string, option: AutoCompleteOption) => {
    const optionValue = String(option.value).toLowerCase();
    return optionValue.includes(input.toLowerCase());
};

// ============ 尺寸 ============
const sizeValue = ref("");
const sizeOptions: AutoCompleteOption[] = [{ value: "large" }, { value: "middle" }, { value: "small" }];

// ============ 带清除按钮 ============
const clearValue = ref("初始值");

// ============ 禁用选项 ============
const disabledValue = ref("");
const disabledOptions: AutoCompleteOption[] = [
    { value: "选项一", label: "选项一" },
    { value: "选项二（禁用）", label: "选项二（禁用）", disabled: true },
    { value: "选项三", label: "选项三" },
    { value: "选项四（禁用）", label: "选项四（禁用）", disabled: true }
];

// ============ 自定义渲染 ============
const renderValue = ref("");
const renderOptions = computed<AutoCompleteOption[]>(() => {
    const query = renderValue.value;
    if (!query) {
        return [
            { value: "test@example.com", label: "test@example.com" },
            { value: "test@gmail.com", label: "test@gmail.com" },
            { value: "test@qq.com", label: "test@qq.com" }
        ];
    }
    return ["@gmail.com", "@163.com", "@qq.com"].map((suffix) => ({
        value: query.includes("@") ? query : `${query}${suffix}`,
        label: query.includes("@") ? query : `${query}${suffix}`
    }));
});

// ============ 查询模式 ============
const searchValue = ref("");
const searchOptions = ref<AutoCompleteOption[]>([]);
const handleSearch = (value: string) => {
    if (!value) {
        searchOptions.value = [];
        return;
    }
    // 模拟搜索
    setTimeout(() => {
        searchOptions.value = [
            { value: `${value} - 结果1`, label: `${value} - 结果1` },
            { value: `${value} - 结果2`, label: `${value} - 结果2` },
            { value: `${value} - 结果3`, label: `${value} - 结果3` }
        ];
    }, 100);
};

// ============ 状态 ============
const statusValue = ref("");
const statusOptions: AutoCompleteOption[] = [{ value: "error" }, { value: "warning" }];

// ============ 示例代码 ============
const basicCode = `<script setup lang="ts">
import { ref, computed } from "vue";
import type { AutoCompleteOption } from "@/components/vort/auto-complete";

const value = ref("");
const options = computed<AutoCompleteOption[]>(() => {
    if (!value.value) return [];
    return [
        { value: \`\${value.value}\` },
        { value: \`\${value.value}\${value.value}\` },
        { value: \`\${value.value}\${value.value}\${value.value}\` }
    ];
});
<\/script>

<template>
    <vort-auto-complete
        v-model="value"
        :options="options"
        placeholder="请输入"
        style="width: 200px"
    />
</template>`;

const customCode = `<script setup lang="ts">
import { ref } from "vue";
import type { AutoCompleteOption } from "@/components/vort/auto-complete";

const value = ref("");
const options: AutoCompleteOption[] = [
    { value: "Burns Bay Road", label: "Burns Bay Road" },
    { value: "Downing Street", label: "Downing Street" },
    { value: "Wall Street", label: "Wall Street" }
];
<\/script>

<template>
    <vort-auto-complete
        v-model="value"
        :options="options"
        placeholder="请输入地址"
        style="width: 200px"
    />
</template>`;

const filterCode = `<script setup lang="ts">
import { ref } from "vue";
import type { AutoCompleteOption } from "@/components/vort/auto-complete";

const value = ref("");
const options: AutoCompleteOption[] = [
    { value: "Burns Bay Road" },
    { value: "Downing Street" },
    { value: "Wall Street" }
];

// 不区分大小写的过滤
const filterOption = (input: string, option: AutoCompleteOption) => {
    const optionValue = String(option.value).toLowerCase();
    return optionValue.includes(input.toLowerCase());
};
<\/script>

<template>
    <vort-auto-complete
        v-model="value"
        :options="options"
        :filter-option="filterOption"
        placeholder="输入搜索（不区分大小写）"
        style="width: 200px"
    />
</template>`;

const sizeCode = `<template>
    <vort-auto-complete size="large" placeholder="大尺寸" style="width: 200px" />
    <vort-auto-complete size="middle" placeholder="默认尺寸" style="width: 200px" />
    <vort-auto-complete size="small" placeholder="小尺寸" style="width: 200px" />
</template>`;

const clearCode = `<template>
    <vort-auto-complete
        v-model="value"
        :options="options"
        allow-clear
        placeholder="可清除"
        style="width: 200px"
    />
</template>`;

const disabledCode = `<script setup lang="ts">
const options: AutoCompleteOption[] = [
    { value: "选项一", label: "选项一" },
    { value: "选项二（禁用）", label: "选项二（禁用）", disabled: true },
    { value: "选项三", label: "选项三" },
    { value: "选项四（禁用）", label: "选项四（禁用）", disabled: true }
];
<\/script>

<template>
    <vort-auto-complete :options="options" placeholder="包含禁用选项" />
    <vort-auto-complete disabled placeholder="禁用状态" />
</template>`;

const renderCode = `<script setup lang="ts">
import { ref, computed } from "vue";

const value = ref("");
const options = computed(() => {
    const query = value.value;
    if (!query) {
        return [
            { value: "test@example.com" },
            { value: "test@gmail.com" },
            { value: "test@qq.com" }
        ];
    }
    return ["@gmail.com", "@163.com", "@qq.com"].map(suffix => ({
        value: query.includes("@") ? query : \`\${query}\${suffix}\`,
        label: query.includes("@") ? query : \`\${query}\${suffix}\`
    }));
});
<\/script>

<template>
    <vort-auto-complete v-model="value" :options="options" style="width: 250px">
        <template #option="{ option }">
            <div class="flex items-center gap-2">
                <span>📧</span>
                <span>{{ option.value }}</span>
            </div>
        </template>
    </vort-auto-complete>
</template>`;

const searchCode = `<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
const options = ref([]);

const handleSearch = (val: string) => {
    if (!val) {
        options.value = [];
        return;
    }
    // 模拟异步搜索
    setTimeout(() => {
        options.value = [
            { value: \`\${val} - 结果1\` },
            { value: \`\${val} - 结果2\` },
            { value: \`\${val} - 结果3\` }
        ];
    }, 100);
};
<\/script>

<template>
    <vort-auto-complete
        v-model="value"
        :options="options"
        :filter-option="false"
        placeholder="输入搜索"
        @search="handleSearch"
        style="width: 200px"
    />
</template>`;

const statusCode = `<template>
    <vort-auto-complete status="error" placeholder="错误状态" />
    <vort-auto-complete status="warning" placeholder="警告状态" />
</template>`;

// ============ API 数据 ============
const propsData = [
    { prop: "v-model / modelValue", desc: "输入框内容", type: "string", default: "-" },
    { prop: "options", desc: "自动完成的数据源", type: "AutoCompleteOption[]", default: "[]" },
    { prop: "placeholder", desc: "输入框占位文本", type: "string", default: "'请输入'" },
    { prop: "size", desc: "输入框尺寸", type: "'large' | 'middle' | 'small'", default: "'middle'" },
    { prop: "status", desc: "设置校验状态", type: "'error' | 'warning'", default: "-" },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    { prop: "bordered", desc: "是否有边框", type: "boolean", default: "true" },
    { prop: "allowClear", desc: "是否支持清除", type: "boolean", default: "false" },
    {
        prop: "filterOption",
        desc: "是否根据输入项进行筛选。当为函数时，会接收 inputValue 和 option 两个参数",
        type: "boolean | ((inputValue: string, option: AutoCompleteOption) => boolean)",
        default: "true"
    },
    { prop: "defaultActiveFirstOption", desc: "是否默认高亮第一个选项", type: "boolean", default: "true" },
    { prop: "backfill", desc: "使用键盘选择选项时，把选中项回填到输入框中", type: "boolean", default: "false" },
    { prop: "notFoundContent", desc: "无匹配时显示的内容", type: "string | null", default: "'无匹配结果'" },
    { prop: "listHeight", desc: "下拉菜单的最大高度", type: "number", default: "256" },
    { prop: "autoBlur", desc: "选中后是否自动失焦", type: "boolean", default: "false" },
    { prop: "open", desc: "是否打开下拉菜单（受控模式）", type: "boolean", default: "-" },
    { prop: "defaultOpen", desc: "默认是否打开下拉菜单", type: "boolean", default: "false" }
];

const eventsData = [
    { event: "change", desc: "输入框内容变化时的回调", params: "(value: string) => void" },
    { event: "search", desc: "搜索补全项的时候调用", params: "(value: string) => void" },
    { event: "select", desc: "被选中时调用，参数为选中项的 value 和 option", params: "(value: string, option: AutoCompleteOption) => void" },
    { event: "focus", desc: "获得焦点时的回调", params: "(event: FocusEvent) => void" },
    { event: "blur", desc: "失去焦点时的回调", params: "(event: FocusEvent) => void" },
    { event: "clear", desc: "清除内容时的回调", params: "() => void" },
    { event: "dropdownVisibleChange", desc: "下拉菜单展开/收起时的回调", params: "(visible: boolean) => void" }
];

const slotsData = [
    { slot: "prefix", desc: "输入框前缀图标" },
    { slot: "suffix", desc: "输入框后缀图标" },
    { slot: "option", desc: "自定义选项渲染，参数: { option, index }" },
    { slot: "notFoundContent", desc: "自定义空状态内容" }
];

const optionTypeData = [
    { prop: "value", desc: "选项的值", type: "string | number", default: "-" },
    { prop: "label", desc: "选项的显示文本（不传则使用 value）", type: "string", default: "-" },
    { prop: "disabled", desc: "是否禁用该选项", type: "boolean", default: "false" }
];
</script>

<template>
    <div class="demo-page">
        <!-- 页面头部 -->
        <header class="demo-page-header">
            <h1 class="demo-page-title">AutoComplete 自动完成</h1>
            <p class="demo-page-desc">输入框自动完成功能。</p>
        </header>

        <!-- 何时使用 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>需要一个输入框而不是选择器。</li>
                <li>需要输入建议/辅助提示。</li>
            </ul>
            <p class="demo-section-desc">和 Select 的区别是：</p>
            <ul class="demo-section-list">
                <li>AutoComplete 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助输入。</li>
                <li>Select 是从选项中选择，关键词是选择。</li>
            </ul>
        </section>

        <!-- 代码演示 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本使用" description="基本使用，通过 options 设置自动完成的数据源。" :code="basicCode">
                    <vort-auto-complete v-model="basicValue" :options="basicOptions" placeholder="请输入" style="width: 200px" />
                </DemoBox>

                <DemoBox title="自定义选项" description="可以自定义选项的 value 和 label。" :code="customCode">
                    <vort-auto-complete v-model="customValue" :options="customOptions" placeholder="请输入地址" style="width: 200px" />
                </DemoBox>

                <DemoBox title="自定义过滤" description="通过 filterOption 自定义过滤逻辑，此例为不区分大小写。" :code="filterCode">
                    <vort-auto-complete
                        v-model="caseValue"
                        :options="caseOptions"
                        :filter-option="filterOptionIgnoreCase"
                        placeholder="输入搜索（不区分大小写）"
                        style="width: 250px"
                    />
                </DemoBox>

                <DemoBox title="三种尺寸" description="三种尺寸的输入框，大、默认、小。" :code="sizeCode">
                    <div class="flex flex-col gap-4 w-full">
                        <vort-auto-complete v-model="sizeValue" :options="sizeOptions" size="large" placeholder="大尺寸" style="width: 200px" />
                        <vort-auto-complete v-model="sizeValue" :options="sizeOptions" size="middle" placeholder="默认尺寸" style="width: 200px" />
                        <vort-auto-complete v-model="sizeValue" :options="sizeOptions" size="small" placeholder="小尺寸" style="width: 200px" />
                    </div>
                </DemoBox>

                <DemoBox title="带清除按钮" description="支持通过 allowClear 属性显示清除按钮。" :code="clearCode">
                    <vort-auto-complete v-model="clearValue" :options="customOptions" allow-clear placeholder="可清除" style="width: 200px" />
                </DemoBox>

                <DemoBox title="禁用" description="禁用输入框或禁用某些选项。" :code="disabledCode">
                    <div class="flex gap-4">
                        <vort-auto-complete
                            v-model="disabledValue"
                            :options="disabledOptions"
                            :filter-option="false"
                            placeholder="包含禁用选项"
                            style="width: 200px"
                        />
                        <vort-auto-complete disabled placeholder="禁用状态" style="width: 200px" />
                    </div>
                </DemoBox>

                <DemoBox title="自定义渲染" description="通过 option 插槽自定义选项的渲染内容。" :code="renderCode">
                    <vort-auto-complete v-model="renderValue" :options="renderOptions" :filter-option="false" placeholder="请输入邮箱" style="width: 250px">
                        <template #option="{ option }">
                            <div class="flex items-center gap-2">
                                <span>📧</span>
                                <span>{{ option.value }}</span>
                            </div>
                        </template>
                    </vort-auto-complete>
                </DemoBox>

                <DemoBox title="查询模式 - 确定类目" description="设置 filterOption 为 false，通过 search 事件实现异步搜索。" :code="searchCode">
                    <vort-auto-complete
                        v-model="searchValue"
                        :options="searchOptions"
                        :filter-option="false"
                        placeholder="输入搜索"
                        @search="handleSearch"
                        style="width: 200px"
                    />
                </DemoBox>

                <DemoBox title="状态" description="通过 status 设置不同的校验状态。" :code="statusCode">
                    <div class="flex gap-4">
                        <vort-auto-complete v-model="statusValue" :options="statusOptions" status="error" placeholder="错误状态" style="width: 200px" />
                        <vort-auto-complete v-model="statusValue" :options="statusOptions" status="warning" placeholder="警告状态" style="width: 200px" />
                    </div>
                </DemoBox>
            </div>
        </section>

        <!-- API 文档 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">AutoComplete Props</h3>
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

            <h3 class="demo-api-title">AutoComplete Events</h3>
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

            <h3 class="demo-api-title">AutoComplete Slots</h3>
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

            <h3 class="demo-api-title">AutoCompleteOption</h3>
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
                    <tr v-for="item in optionTypeData" :key="item.prop">
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
        </section>
    </div>
</template>

<!-- 公共样式已在 demo.css 中定义 -->
