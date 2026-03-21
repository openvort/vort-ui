<script setup lang="ts">
import { ref } from "vue";
import type { CascaderOption, CascaderValue, CascaderMultipleValue, ShowCheckedStrategy } from "@/components/vort/cascader";
import { SHOW_CHILD, SHOW_PARENT } from "@/components/vort/cascader";
import DemoBox from "./components/DemoBox.vue";

// 基础选项数据
const options: CascaderOption[] = [
    {
        value: "zhejiang",
        label: "浙江",
        children: [
            {
                value: "hangzhou",
                label: "杭州",
                children: [
                    { value: "xihu", label: "西湖区" },
                    { value: "xiacheng", label: "下城区" },
                    { value: "jianggan", label: "江干区" }
                ]
            },
            {
                value: "ningbo",
                label: "宁波",
                children: [
                    { value: "haishu", label: "海曙区" },
                    { value: "jiangbei", label: "江北区" }
                ]
            }
        ]
    },
    {
        value: "jiangsu",
        label: "江苏",
        children: [
            {
                value: "nanjing",
                label: "南京",
                children: [
                    { value: "xuanwu", label: "玄武区" },
                    { value: "qinhuai", label: "秦淮区" }
                ]
            },
            {
                value: "suzhou",
                label: "苏州",
                children: [
                    { value: "gusu", label: "姑苏区" },
                    { value: "wuzhong", label: "吴中区" }
                ]
            }
        ]
    },
    {
        value: "fujian",
        label: "福建",
        children: [
            {
                value: "fuzhou",
                label: "福州",
                children: [
                    { value: "gulou", label: "鼓楼区" },
                    { value: "taijiang", label: "台江区" }
                ]
            },
            {
                value: "xiamen",
                label: "厦门",
                children: [
                    { value: "siming", label: "思明区" },
                    { value: "huli", label: "湖里区" }
                ]
            }
        ]
    }
];

// 带禁用选项的数据
const optionsWithDisabled: CascaderOption[] = [
    {
        value: "zhejiang",
        label: "浙江",
        children: [
            {
                value: "hangzhou",
                label: "杭州",
                children: [
                    { value: "xihu", label: "西湖区" },
                    { value: "xiacheng", label: "下城区", disabled: true }
                ]
            },
            {
                value: "ningbo",
                label: "宁波",
                disabled: true,
                children: [{ value: "haishu", label: "海曙区" }]
            }
        ]
    },
    {
        value: "jiangsu",
        label: "江苏",
        children: [
            {
                value: "nanjing",
                label: "南京",
                children: [{ value: "xuanwu", label: "玄武区" }]
            }
        ]
    }
];

// 演示用的状态
const basicValue = ref<CascaderValue>([]);
const defaultValue = ref<CascaderValue>(["zhejiang", "hangzhou", "xihu"]);
const multipleValue = ref<CascaderMultipleValue>([]);
const searchValue = ref<CascaderValue>([]);
const hoverValue = ref<CascaderValue>([]);
const disabledValue = ref<CascaderValue>([]);
const changeOnSelectValue = ref<CascaderValue>([]);
const customDisplayValue = ref<CascaderValue>([]);
const sizeValue = ref<CascaderValue>([]);
const statusErrorValue = ref<CascaderValue>([]);
const statusWarningValue = ref<CascaderValue>([]);
const maxTagValue = ref<CascaderMultipleValue>([
    ["zhejiang", "hangzhou", "xihu"],
    ["jiangsu", "nanjing", "xuanwu"]
]);

// 回填策略演示
const showChildValue = ref<CascaderMultipleValue>([]);
const showParentValue = ref<CascaderMultipleValue>([
    ["zhejiang", "hangzhou", "xihu"],
    ["zhejiang", "hangzhou", "xiacheng"],
    ["zhejiang", "hangzhou", "jianggan"]
]);

const handleChange = (value: CascaderValue | CascaderMultipleValue | undefined) => {
    console.log("cascader change:", value);
};

const customDisplayRender = (labels: string[]) => {
    return labels.join(" > ");
};

// 示例代码
const basicCode = `<script setup>
import { ref } from "vue";

const value = ref([]);

const options = [
  {
    value: "zhejiang",
    label: "浙江",
    children: [
      {
        value: "hangzhou",
        label: "杭州",
        children: [
          { value: "xihu", label: "西湖区" },
          { value: "xiacheng", label: "下城区" }
        ]
      }
    ]
  }
];
<\/script>

<template>
  <vort-cascader
    v-model="value"
    :options="options"
    placeholder="请选择地区"
    allow-clear
  />
</template>`;

const defaultValueCode = `<script setup>
import { ref } from "vue";

const value = ref(["zhejiang", "hangzhou", "xihu"]);
<\/script>

<template>
  <vort-cascader v-model="value" :options="options" allow-clear />
</template>`;

const multipleCode = `<script setup>
import { ref } from "vue";

const value = ref([]);
<\/script>

<template>
  <vort-cascader
    v-model="value"
    :options="options"
    placeholder="请选择地区（多选）"
    multiple
    allow-clear
  />
</template>`;

const searchCode = `<script setup>
import { ref } from "vue";

const value = ref([]);
<\/script>

<template>
  <vort-cascader
    v-model="value"
    :options="options"
    placeholder="请输入搜索"
    show-search
    allow-clear
  />
</template>`;

const hoverCode = `<template>
  <vort-cascader
    v-model="value"
    :options="options"
    placeholder="移入展开"
    expand-trigger="hover"
    allow-clear
  />
</template>`;

const changeOnSelectCode = `<template>
  <vort-cascader
    v-model="value"
    :options="options"
    placeholder="选择即改变"
    change-on-select
    allow-clear
  />
</template>`;

const disabledOptionsCode = `<script setup>
import { ref } from "vue";

const value = ref([]);

const options = [
  {
    value: "zhejiang",
    label: "浙江",
    children: [
      {
        value: "hangzhou",
        label: "杭州",
        children: [
          { value: "xihu", label: "西湖区" },
          { value: "xiacheng", label: "下城区", disabled: true }
        ]
      },
      {
        value: "ningbo",
        label: "宁波",
        disabled: true,
        children: [{ value: "haishu", label: "海曙区" }]
      }
    ]
  }
];
<\/script>

<template>
  <vort-cascader v-model="value" :options="options" placeholder="有禁用选项" allow-clear />
</template>`;

const displayRenderCode = `<script setup>
import { ref } from "vue";

const value = ref([]);

const customDisplayRender = (labels) => {
  return labels.join(" > ");
};
<\/script>

<template>
  <vort-cascader
    v-model="value"
    :options="options"
    placeholder="自定义显示"
    :display-render="customDisplayRender"
    allow-clear
  />
</template>`;

const sizeCode = `<template>
  <vort-cascader v-model="value" :options="options" size="large" placeholder="Large 大号" allow-clear />
  <vort-cascader v-model="value" :options="options" size="middle" placeholder="Middle 中号（默认）" allow-clear />
  <vort-cascader v-model="value" :options="options" size="small" placeholder="Small 小号" allow-clear />
</template>`;

const statusCode = `<template>
  <vort-cascader v-model="value1" :options="options" status="error" placeholder="Error 状态" />
  <vort-cascader v-model="value2" :options="options" status="warning" placeholder="Warning 状态" />
</template>`;

const disabledCode = `<template>
  <vort-cascader
    :model-value="['zhejiang', 'hangzhou', 'xihu']"
    :options="options"
    disabled
  />
</template>`;

const maxTagCountCode = `<script setup>
import { ref } from "vue";

const value = ref([
  ["zhejiang", "hangzhou", "xihu"],
  ["jiangsu", "nanjing", "xuanwu"]
]);
<\/script>

<template>
  <vort-cascader
    v-model="value"
    :options="options"
    multiple
    :max-tag-count="1"
    allow-clear
  />
</template>`;

const showCheckedStrategyCode = `<script setup>
import { ref } from "vue";
import { SHOW_CHILD, SHOW_PARENT } from "@/components/vort/cascader";

const showChildValue = ref([]);
const showParentValue = ref([
  ["zhejiang", "hangzhou", "xihu"],
  ["zhejiang", "hangzhou", "xiacheng"],
  ["zhejiang", "hangzhou", "jianggan"]
]);
<\/script>

<template>
  <!-- SHOW_CHILD: 只显示选中的子节点 -->
  <vort-cascader
    v-model="showChildValue"
    :options="options"
    multiple
    :show-checked-strategy="SHOW_CHILD"
    placeholder="SHOW_CHILD 模式"
    allow-clear
  />

  <!-- SHOW_PARENT: 只显示父节点（当父节点下所有子节点都选中时） -->
  <vort-cascader
    v-model="showParentValue"
    :options="options"
    multiple
    :show-checked-strategy="SHOW_PARENT"
    placeholder="SHOW_PARENT 模式"
    allow-clear
  />
</template>`;
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Cascader 级联选择</h1>
            <p class="demo-page-desc">级联选择框，从一组相关联的数据集合进行选择。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>需要从一组相关联的数据集合进行选择，例如省市区、公司层级、分类等。</li>
                <li>从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。</li>
                <li>比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基础用法 -->
                <DemoBox title="基础用法" description="最基本的级联选择器，点击展开下一级菜单。" :code="basicCode">
                    <div class="flex flex-col gap-2">
                        <vort-cascader
                            v-model="basicValue"
                            :options="options"
                            placeholder="请选择地区"
                            allow-clear
                            style="width: 280px"
                            @change="handleChange"
                        />
                        <p class="text-sm text-gray-500">当前值: {{ basicValue }}</p>
                    </div>
                </DemoBox>

                <!-- 默认值 -->
                <DemoBox title="默认值" description="通过 v-model 设置默认值。" :code="defaultValueCode">
                    <div class="flex flex-col gap-2">
                        <vort-cascader v-model="defaultValue" :options="options" allow-clear style="width: 280px" />
                        <p class="text-sm text-gray-500">当前值: {{ defaultValue }}</p>
                    </div>
                </DemoBox>

                <!-- 多选 -->
                <DemoBox title="多选" description="通过 multiple 属性开启多选模式。" :code="multipleCode">
                    <div class="flex flex-col gap-2">
                        <vort-cascader
                            v-model="multipleValue"
                            :options="options"
                            placeholder="请选择地区（多选）"
                            multiple
                            allow-clear
                            style="width: 380px"
                            @change="handleChange"
                        />
                        <p class="text-sm text-gray-500">当前值: {{ multipleValue }}</p>
                    </div>
                </DemoBox>

                <!-- 搜索 -->
                <DemoBox title="搜索" description="通过 showSearch 属性启用搜索功能。" :code="searchCode">
                    <div class="flex flex-col gap-2">
                        <vort-cascader v-model="searchValue" :options="options" placeholder="请输入搜索" show-search allow-clear style="width: 280px" />
                        <p class="text-sm text-gray-500">当前值: {{ searchValue }}</p>
                    </div>
                </DemoBox>

                <!-- Hover 展开 -->
                <DemoBox title="移入展开" description="通过 expandTrigger 属性设置为 hover 实现移入展开。" :code="hoverCode">
                    <vort-cascader v-model="hoverValue" :options="options" placeholder="移入展开" expand-trigger="hover" allow-clear style="width: 280px" />
                </DemoBox>

                <!-- 选择即改变 -->
                <DemoBox title="选择即改变" description="通过 changeOnSelect 属性实现选择任意级别时触发 change 事件。" :code="changeOnSelectCode">
                    <div class="flex flex-col gap-2">
                        <vort-cascader
                            v-model="changeOnSelectValue"
                            :options="options"
                            placeholder="选择即改变"
                            change-on-select
                            allow-clear
                            style="width: 280px"
                        />
                        <p class="text-sm text-gray-500">当前值: {{ changeOnSelectValue }}</p>
                    </div>
                </DemoBox>

                <!-- 禁用选项 -->
                <DemoBox title="禁用选项" description="通过在选项中设置 disabled 属性禁用某些选项。" :code="disabledOptionsCode">
                    <vort-cascader v-model="disabledValue" :options="optionsWithDisabled" placeholder="有禁用选项" allow-clear style="width: 280px" />
                </DemoBox>

                <!-- 自定义显示 -->
                <DemoBox title="自定义显示" description="通过 displayRender 属性自定义选中值的显示方式。" :code="displayRenderCode">
                    <vort-cascader
                        v-model="customDisplayValue"
                        :options="options"
                        placeholder="自定义显示"
                        :display-render="customDisplayRender"
                        allow-clear
                        style="width: 280px"
                    />
                </DemoBox>

                <!-- 尺寸 -->
                <DemoBox
                    title="三种大小"
                    description="三种大小的选择框，当 size 分别为 large 和 small 时，高度为 40px 和 24px，默认高度为 32px。"
                    :code="sizeCode"
                >
                    <div class="flex flex-col gap-4">
                        <vort-cascader v-model="sizeValue" :options="options" size="large" placeholder="Large 大号" allow-clear style="width: 280px" />
                        <vort-cascader
                            v-model="sizeValue"
                            :options="options"
                            size="middle"
                            placeholder="Middle 中号（默认）"
                            allow-clear
                            style="width: 280px"
                        />
                        <vort-cascader v-model="sizeValue" :options="options" size="small" placeholder="Small 小号" allow-clear style="width: 280px" />
                    </div>
                </DemoBox>

                <!-- 校验状态 -->
                <DemoBox title="校验状态" description="使用 status 属性设置校验状态，可选值为 error 或 warning。" :code="statusCode">
                    <div class="flex gap-4">
                        <vort-cascader v-model="statusErrorValue" :options="options" status="error" placeholder="Error 状态" style="width: 200px" />
                        <vort-cascader v-model="statusWarningValue" :options="options" status="warning" placeholder="Warning 状态" style="width: 200px" />
                    </div>
                </DemoBox>

                <!-- 禁用 -->
                <DemoBox title="禁用" description="通过 disabled 属性禁用整个选择器。" :code="disabledCode">
                    <vort-cascader :model-value="['zhejiang', 'hangzhou', 'xihu']" :options="options" disabled style="width: 280px" />
                </DemoBox>

                <!-- 多选限制标签数量 -->
                <DemoBox title="多选标签数量限制" description="通过 maxTagCount 限制显示的标签数量，超出部分会折叠显示。" :code="maxTagCountCode">
                    <div class="flex flex-col gap-2">
                        <vort-cascader v-model="maxTagValue" :options="options" multiple :max-tag-count="1" allow-clear style="width: 380px" />
                        <p class="text-sm text-gray-500">当前值: {{ maxTagValue }}</p>
                    </div>
                </DemoBox>

                <!-- 选中项回填策略 -->
                <DemoBox
                    title="选中项回填策略"
                    description="通过 showCheckedStrategy 定义选中项回填的方式。在大数据场景（如省市区选择）下，推荐使用 SHOW_PARENT 模式以获得更好的性能。"
                    :code="showCheckedStrategyCode"
                >
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col gap-2">
                            <p class="text-sm font-medium">SHOW_CHILD（默认）: 只显示选中的子节点</p>
                            <vort-cascader
                                v-model="showChildValue"
                                :options="options"
                                multiple
                                :show-checked-strategy="SHOW_CHILD"
                                placeholder="SHOW_CHILD 模式"
                                allow-clear
                                style="width: 450px"
                            />
                            <p class="text-xs text-gray-500">当前值: {{ showChildValue }}</p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="text-sm font-medium">SHOW_PARENT: 只显示父节点（当父节点下所有子节点都选中时）</p>
                            <vort-cascader
                                v-model="showParentValue"
                                :options="options"
                                multiple
                                :show-checked-strategy="SHOW_PARENT"
                                placeholder="SHOW_PARENT 模式"
                                allow-clear
                                style="width: 450px"
                            />
                            <p class="text-xs text-gray-500">当前值: {{ showParentValue }}</p>
                            <p class="text-xs text-blue-500">提示：杭州的所有区都已选中，所以只显示"浙江 / 杭州"</p>
                        </div>
                        <!-- 大数据场景说明 -->
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p class="text-sm font-medium text-blue-800 mb-2">💡 大数据场景性能优化</p>
                            <p class="text-xs text-blue-700 leading-relaxed">
                                当数据量较大时（如全国省市区数据，约 3000+ 条），<strong>强烈推荐使用 SHOW_PARENT 模式</strong>：
                            </p>
                            <ul class="text-xs text-blue-700 mt-2 ml-4 list-disc space-y-1">
                                <li><strong>SHOW_CHILD</strong>：v-model 存储所有叶子节点，选中"中国"会存储 3000+ 条数据</li>
                                <li><strong>SHOW_PARENT</strong>：v-model 只存储最高层的全选父节点，选中"中国"只存储 1 条数据</li>
                            </ul>
                            <p class="text-xs text-blue-700 mt-2">SHOW_PARENT 模式不仅减少了数据传输量，还能显著提升勾选/取消勾选的响应速度。</p>
                        </div>
                    </div>
                </DemoBox>
            </div>
        </section>

        <!-- API 文档 -->
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
                    <tr>
                        <td>modelValue (v-model)</td>
                        <td>选中的值，单选时为数组，多选时为二维数组</td>
                        <td><code>CascaderValue | CascaderMultipleValue</code></td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>options</td>
                        <td>选项数据</td>
                        <td><code>CascaderOption[]</code></td>
                        <td><code>[]</code></td>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td>占位文本</td>
                        <td><code>string</code></td>
                        <td><code>'请选择'</code></td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>尺寸</td>
                        <td><code>'large' | 'middle' | 'small'</code></td>
                        <td><code>'middle'</code></td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>是否禁用</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td>校验状态</td>
                        <td><code>'error' | 'warning'</code></td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>multiple</td>
                        <td>是否多选</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td>showSearch</td>
                        <td>是否支持搜索</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td>allowClear</td>
                        <td>是否支持清除</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td>expandTrigger</td>
                        <td>次级菜单展开方式</td>
                        <td><code>'click' | 'hover'</code></td>
                        <td><code>'click'</code></td>
                    </tr>
                    <tr>
                        <td>changeOnSelect</td>
                        <td>选择任意级别时触发 change</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td>displayRender</td>
                        <td>自定义显示值函数</td>
                        <td><code>(labels: string[], options: CascaderOption[]) => string</code></td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>maxTagCount</td>
                        <td>多选时最多显示的标签数</td>
                        <td><code>number</code></td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>showCheckedStrategy</td>
                        <td>定义选中项回填的方式。大数据场景推荐 SHOW_PARENT（只存储父节点，性能更优）</td>
                        <td><code>'SHOW_CHILD' | 'SHOW_PARENT'</code></td>
                        <td><code>'SHOW_CHILD'</code></td>
                    </tr>
                    <tr>
                        <td>notFoundContent</td>
                        <td>空数据时显示的内容</td>
                        <td><code>string</code></td>
                        <td><code>'暂无数据'</code></td>
                    </tr>
                    <tr>
                        <td>destroyPopupOnHide</td>
                        <td>关闭时是否销毁弹出层 DOM</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
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
                    <tr>
                        <td>change</td>
                        <td>选中值变化时触发</td>
                        <td><code>(value, selectedOptions) => void</code></td>
                    </tr>
                    <tr>
                        <td>search</td>
                        <td>搜索输入时触发</td>
                        <td><code>(value: string) => void</code></td>
                    </tr>
                    <tr>
                        <td>clear</td>
                        <td>清除值时触发</td>
                        <td><code>() => void</code></td>
                    </tr>
                    <tr>
                        <td>focus</td>
                        <td>获得焦点时触发</td>
                        <td><code>(event: FocusEvent) => void</code></td>
                    </tr>
                    <tr>
                        <td>blur</td>
                        <td>失去焦点时触发</td>
                        <td><code>(event: FocusEvent) => void</code></td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">CascaderOption</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>属性</th>
                        <th>说明</th>
                        <th>类型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>value</td>
                        <td>选项值</td>
                        <td><code>string | number</code></td>
                    </tr>
                    <tr>
                        <td>label</td>
                        <td>选项标签</td>
                        <td><code>string</code></td>
                    </tr>
                    <tr>
                        <td>children</td>
                        <td>子选项</td>
                        <td><code>CascaderOption[]</code></td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>是否禁用</td>
                        <td><code>boolean</code></td>
                    </tr>
                    <tr>
                        <td>isLeaf</td>
                        <td>是否是叶子节点</td>
                        <td><code>boolean</code></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<!-- 公共样式已在 demo.css 中定义 -->
