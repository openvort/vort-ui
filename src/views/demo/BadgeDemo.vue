<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { MinusOutlined, PlusOutlined } from "@/components/vort/icons";
import { Bell, Mail, ShoppingCart } from "lucide-vue-next";

// 动态数字展示
const count = ref(5);
const show = ref(true);

const decline = () => {
    if (count.value >= 1) {
        count.value--;
    }
};

const increase = () => {
    count.value++;
};

const random = () => {
    count.value = Math.floor(Math.random() * 100);
};

const toggleShow = () => {
    show.value = !show.value;
};

// 示例代码
const basicCode = `<template>
  <vort-badge :count="5">
    <div class="avatar-item" />
  </vort-badge>
  <vort-badge :count="0" show-zero>
    <div class="avatar-item" />
  </vort-badge>
  <vort-badge>
    <template #count>
      ?
    </template>
    <div class="avatar-item" />
  </vort-badge>
</template>`;

const overflowCode = `<template>
  <vort-badge :count="99">
    <div class="avatar-item" />
  </vort-badge>
  <vort-badge :count="100">
    <div class="avatar-item" />
  </vort-badge>
  <vort-badge :count="99" :overflow-count="10">
    <div class="avatar-item" />
  </vort-badge>
  <vort-badge :count="1000" :overflow-count="999">
    <div class="avatar-item" />
  </vort-badge>
</template>`;

const dotCode = `<template>
  <vort-badge dot>
    <Bell class="w-4 h-4" />
  </vort-badge>
  <vort-badge :count="5" dot>
    <Bell class="w-4 h-4" />
  </vort-badge>
  <vort-badge dot>
    <a href="#">Link something</a>
  </vort-badge>
</template>`;

const standaloneCode = `<template>
  <vort-badge :count="25" />
  <vort-badge :count="4" color="#52c41a" />
  <vort-badge :count="109" color="pink" />
</template>`;

const statusCode = `<template>
  <vort-badge status="success" />
  <vort-badge status="error" />
  <vort-badge status="default" />
  <vort-badge status="processing" />
  <vort-badge status="warning" />

  <vort-badge status="success" text="Success" />
  <vort-badge status="error" text="Error" />
  <vort-badge status="default" text="Default" />
  <vort-badge status="processing" text="Processing" />
  <vort-badge status="warning" text="Warning" />
</template>`;

const colorCode = `<template>
  <!-- 预设颜色 -->
  <vort-badge color="pink" text="pink" />
  <vort-badge color="red" text="red" />
  <vort-badge color="yellow" text="yellow" />
  <vort-badge color="orange" text="orange" />
  <vort-badge color="cyan" text="cyan" />
  <vort-badge color="green" text="green" />
  <vort-badge color="blue" text="blue" />
  <vort-badge color="purple" text="purple" />
  <vort-badge color="geekblue" text="geekblue" />
  <vort-badge color="magenta" text="magenta" />
  <vort-badge color="volcano" text="volcano" />
  <vort-badge color="gold" text="gold" />
  <vort-badge color="lime" text="lime" />

  <!-- 自定义颜色 -->
  <vort-badge color="#f50" text="#f50" />
  <vort-badge color="#2db7f5" text="#2db7f5" />
  <vort-badge color="#87d068" text="#87d068" />
  <vort-badge color="#108ee9" text="#108ee9" />
</template>`;

const sizeCode = `<template>
  <vort-badge :count="5">
    <div class="avatar-item" />
  </vort-badge>
  <vort-badge :count="5" size="small">
    <div class="avatar-item" />
  </vort-badge>
</template>`;

const dynamicCode = `<template>
  <div class="flex items-center gap-4">
    <vort-badge :count="count" :show-zero="true">
      <div class="avatar-item" />
    </vort-badge>
    <vort-button-group>
      <vort-button @click="decline">
        <MinusOutlined />
      </vort-button>
      <vort-button @click="increase">
        <PlusOutlined />
      </vort-button>
      <vort-button @click="random">
        随机
      </vort-button>
    </vort-button-group>
  </div>
  <div class="flex items-center gap-4 mt-4">
    <vort-badge :count="count" dot :show-zero="show">
      <div class="avatar-item" />
    </vort-badge>
    <vort-switch v-model="show" />
  </div>
</template>`;

const ribbonCode = `<template>
  <vort-badge-ribbon text="Hippie">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>

  <vort-badge-ribbon text="Hippie" color="pink">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>

  <vort-badge-ribbon text="Hippie" color="red">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>

  <vort-badge-ribbon text="Hippie" color="cyan">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>

  <vort-badge-ribbon text="Hippie" color="green">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>

  <vort-badge-ribbon text="Hippie" color="purple">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>

  <vort-badge-ribbon text="Hippie" color="volcano">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>

  <vort-badge-ribbon text="Hippie" color="magenta">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>
</template>`;

const ribbonPlacementCode = `<template>
  <vort-badge-ribbon text="Hippie" placement="start">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>
  <vort-badge-ribbon text="Hippie" placement="end">
    <div class="card-item">
      Pushes open the window and looks at the stars.
    </div>
  </vort-badge-ribbon>
</template>`;

// StatusDot 示例代码
const statusDotBasicCode = `<template>
  <vort-status-dot status="success" text="Success" />
  <vort-status-dot status="error" text="Error" />
  <vort-status-dot status="default" text="Default" />
  <vort-status-dot status="processing" text="Processing" />
  <vort-status-dot status="warning" text="Warning" />
</template>`;

const statusDotPulseCode = `<template>
  <!-- pulse 参数开启发光动画 -->
  <vort-status-dot status="processing" text="Processing" pulse />
  <vort-status-dot status="success" text="Online" pulse />
  <vort-status-dot status="error" text="Error" pulse />
  <vort-status-dot status="warning" text="Warning" pulse />
  <vort-status-dot color="#722ed1" text="Custom" pulse />
</template>`;

const statusDotSizeCode = `<template>
  <vort-status-dot status="success" size="small" text="Small" />
  <vort-status-dot status="success" size="default" text="Default" />
  <vort-status-dot status="success" size="large" text="Large" />
</template>`;

const statusDotColorCode = `<template>
  <!-- 预设颜色 -->
  <vort-status-dot color="pink" text="pink" />
  <vort-status-dot color="cyan" text="cyan" />
  <vort-status-dot color="purple" text="purple" />

  <!-- 自定义颜色 -->
  <vort-status-dot color="#f50" text="#f50" />
  <vort-status-dot color="#2db7f5" text="#2db7f5" />
</template>`;

const offsetCode = `<template>
  <vort-badge :count="5" :offset="[10, 10]">
    <div class="avatar-item" />
  </vort-badge>
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "count",
        desc: "展示的数字，为 0 时默认不显示",
        type: "number | string",
        default: "-"
    },
    {
        prop: "showZero",
        desc: "当数值为 0 时，是否展示 Badge",
        type: "boolean",
        default: "false"
    },
    {
        prop: "overflowCount",
        desc: "展示封顶的数字值",
        type: "number",
        default: "99"
    },
    {
        prop: "dot",
        desc: "不展示数字，只有一个小红点",
        type: "boolean",
        default: "false"
    },
    {
        prop: "status",
        desc: "设置 Badge 为状态点",
        type: "'success' | 'processing' | 'default' | 'error' | 'warning'",
        default: "-"
    },
    {
        prop: "color",
        desc: "自定义小圆点的颜色，支持预设颜色和自定义颜色",
        type: "PresetColor | string",
        default: "-"
    },
    {
        prop: "text",
        desc: "在设置了 status 或 color 的前提下有效，设置状态点的文本",
        type: "string",
        default: "-"
    },
    {
        prop: "offset",
        desc: "设置状态点的位置偏移 [x, y]",
        type: "[number, number]",
        default: "-"
    },
    {
        prop: "title",
        desc: "设置鼠标放在状态点上时显示的文字",
        type: "string",
        default: "-"
    },
    {
        prop: "size",
        desc: "徽标大小",
        type: "'default' | 'small'",
        default: "'default'"
    }
];

// Ribbon Props 表格数据
const ribbonPropsData = [
    {
        prop: "text",
        desc: "缎带中填入的内容",
        type: "string",
        default: "-"
    },
    {
        prop: "color",
        desc: "自定义缎带的颜色",
        type: "PresetColor | string",
        default: "-"
    },
    {
        prop: "placement",
        desc: "设置缎带的位置",
        type: "'start' | 'end'",
        default: "'end'"
    }
];

// Slots 表格数据
const slotsData = [
    {
        name: "default",
        desc: "徽标依附的内容"
    },
    {
        name: "count",
        desc: "自定义 count 显示内容"
    }
];

// Ribbon Slots 表格数据
const ribbonSlotsData = [
    {
        name: "default",
        desc: "缎带包裹的内容"
    },
    {
        name: "text",
        desc: "缎带中填入的内容"
    }
];

// StatusDot Props 表格数据
const statusDotPropsData = [
    {
        prop: "status",
        desc: "设置状态点的状态",
        type: "'success' | 'processing' | 'default' | 'error' | 'warning'",
        default: "'default'"
    },
    {
        prop: "color",
        desc: "自定义小圆点的颜色，支持预设颜色和自定义颜色",
        type: "PresetColor | string",
        default: "-"
    },
    {
        prop: "text",
        desc: "状态点的文本说明",
        type: "string",
        default: "-"
    },
    {
        prop: "pulse",
        desc: "是否开启发光动画效果",
        type: "boolean",
        default: "false"
    },
    {
        prop: "size",
        desc: "状态点大小",
        type: "'small' | 'default' | 'large'",
        default: "'default'"
    },
    {
        prop: "title",
        desc: "设置鼠标放在状态点上时显示的文字",
        type: "string",
        default: "-"
    }
];

// PresetColor 类型说明
const presetColorData = [
    { color: "pink", desc: "#eb2f96" },
    { color: "red", desc: "#f5222d" },
    { color: "yellow", desc: "#fadb14" },
    { color: "orange", desc: "#fa8c16" },
    { color: "cyan", desc: "#13c2c2" },
    { color: "green", desc: "#52c41a" },
    { color: "blue", desc: "#1677ff" },
    { color: "purple", desc: "#722ed1" },
    { color: "geekblue", desc: "#2f54eb" },
    { color: "magenta", desc: "#eb2f96" },
    { color: "volcano", desc: "#fa541c" },
    { color: "gold", desc: "#faad14" },
    { color: "lime", desc: "#a0d911" }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Badge 徽标数</h1>
            <p class="demo-page-desc">图标右上角的圆形徽标数字。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本" description="简单的徽章展示，当 count 为 0 时，默认不显示。设置 show-zero 属性可以显示 0。" :code="basicCode">
                    <div class="flex flex-wrap items-center gap-6">
                        <vort-badge :count="5">
                            <div class="avatar-item" />
                        </vort-badge>
                        <vort-badge :count="0" show-zero>
                            <div class="avatar-item" />
                        </vort-badge>
                        <vort-badge>
                            <template #count> ? </template>
                            <div class="avatar-item" />
                        </vort-badge>
                    </div>
                </DemoBox>

                <DemoBox title="封顶数字" description="超过 overflowCount 的会显示为 overflowCount+，默认的 overflowCount 为 99。" :code="overflowCode">
                    <div class="flex flex-wrap items-center gap-6">
                        <vort-badge :count="99">
                            <div class="avatar-item" />
                        </vort-badge>
                        <vort-badge :count="100">
                            <div class="avatar-item" />
                        </vort-badge>
                        <vort-badge :count="99" :overflow-count="10">
                            <div class="avatar-item" />
                        </vort-badge>
                        <vort-badge :count="1000" :overflow-count="999">
                            <div class="avatar-item" />
                        </vort-badge>
                    </div>
                </DemoBox>

                <DemoBox title="讨嫌的小红点" description="没有具体的数字。" :code="dotCode">
                    <div class="flex flex-wrap items-center gap-6">
                        <vort-badge dot>
                            <Bell class="w-4 h-4" />
                        </vort-badge>
                        <vort-badge :count="5" dot>
                            <Bell class="w-4 h-4" />
                        </vort-badge>
                        <vort-badge dot>
                            <a href="#" class="text-[var(--vort-primary)]">Link something</a>
                        </vort-badge>
                    </div>
                </DemoBox>

                <DemoBox title="独立使用" description="不包裹任何元素即是独立使用，可自定义样式展现。" :code="standaloneCode">
                    <div class="flex flex-wrap items-center gap-4">
                        <vort-badge :count="25" />
                        <vort-badge :count="4" color="#52c41a" />
                        <vort-badge :count="109" color="pink" />
                    </div>
                </DemoBox>

                <DemoBox title="状态点" description="用于表示状态的小圆点。" :code="statusCode">
                    <div class="w-full">
                        <div class="flex flex-wrap items-center gap-4 mb-4">
                            <vort-badge status="success" />
                            <vort-badge status="error" />
                            <vort-badge status="default" />
                            <vort-badge status="processing" />
                            <vort-badge status="warning" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <vort-badge status="success" text="Success" />
                            <vort-badge status="error" text="Error" />
                            <vort-badge status="default" text="Default" />
                            <vort-badge status="processing" text="Processing" />
                            <vort-badge status="warning" text="Warning" />
                        </div>
                    </div>
                </DemoBox>

                <DemoBox
                    title="多彩徽标"
                    description="我们添加了多种预设色彩的徽标样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。"
                    :code="colorCode"
                >
                    <div class="w-full">
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">预设颜色：</p>
                        <div class="flex flex-col gap-2 mb-4">
                            <vort-badge color="pink" text="pink" />
                            <vort-badge color="red" text="red" />
                            <vort-badge color="yellow" text="yellow" />
                            <vort-badge color="orange" text="orange" />
                            <vort-badge color="cyan" text="cyan" />
                            <vort-badge color="green" text="green" />
                            <vort-badge color="blue" text="blue" />
                            <vort-badge color="purple" text="purple" />
                            <vort-badge color="geekblue" text="geekblue" />
                            <vort-badge color="magenta" text="magenta" />
                            <vort-badge color="volcano" text="volcano" />
                            <vort-badge color="gold" text="gold" />
                            <vort-badge color="lime" text="lime" />
                        </div>
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">自定义颜色：</p>
                        <div class="flex flex-col gap-2">
                            <vort-badge color="#f50" text="#f50" />
                            <vort-badge color="#2db7f5" text="#2db7f5" />
                            <vort-badge color="#87d068" text="#87d068" />
                            <vort-badge color="#108ee9" text="#108ee9" />
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="大小" description="可以设置为小尺寸。" :code="sizeCode">
                    <div class="flex flex-wrap items-center gap-6">
                        <vort-badge :count="5">
                            <div class="avatar-item" />
                        </vort-badge>
                        <vort-badge :count="5" size="small">
                            <div class="avatar-item" />
                        </vort-badge>
                    </div>
                </DemoBox>

                <DemoBox title="动态" description="展示动态变化的效果。" :code="dynamicCode">
                    <div class="w-full">
                        <div class="flex items-center gap-4 mb-4">
                            <vort-badge :count="count" :show-zero="true">
                                <div class="avatar-item" />
                            </vort-badge>
                            <div class="flex gap-2">
                                <vort-button @click="decline">
                                    <MinusOutlined class="w-4 h-4" />
                                </vort-button>
                                <vort-button @click="increase">
                                    <PlusOutlined class="w-4 h-4" />
                                </vort-button>
                                <vort-button @click="random">随机</vort-button>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <vort-badge :count="count" dot :show-zero="show">
                                <div class="avatar-item" />
                            </vort-badge>
                            <vort-switch v-model="show" />
                            <span class="text-sm text-[var(--vort-text-secondary)]">显示小红点</span>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="偏移" description="设置状态点的位置偏移，格式为 [x, y]。" :code="offsetCode">
                    <div class="flex flex-wrap items-center gap-6">
                        <vort-badge :count="5" :offset="[10, 10]">
                            <div class="avatar-item" />
                        </vort-badge>
                    </div>
                </DemoBox>

                <DemoBox title="缎带" description="使用 Badge.Ribbon 实现缎带徽标效果。" :code="ribbonCode">
                    <div class="grid grid-cols-2 gap-4 w-full">
                        <vort-badge-ribbon text="Hippie">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                        <vort-badge-ribbon text="Hippie" color="pink">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                        <vort-badge-ribbon text="Hippie" color="red">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                        <vort-badge-ribbon text="Hippie" color="cyan">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                        <vort-badge-ribbon text="Hippie" color="green">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                        <vort-badge-ribbon text="Hippie" color="purple">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                        <vort-badge-ribbon text="Hippie" color="volcano">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                        <vort-badge-ribbon text="Hippie" color="magenta">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                    </div>
                </DemoBox>

                <DemoBox title="缎带位置" description="通过 placement 属性设置缎带的位置。" :code="ribbonPlacementCode">
                    <div class="grid grid-cols-2 gap-4 w-full">
                        <vort-badge-ribbon text="Hippie" placement="start">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                        <vort-badge-ribbon text="Hippie" placement="end">
                            <div class="card-item">Pushes open the window and looks at the stars.</div>
                        </vort-badge-ribbon>
                    </div>
                </DemoBox>

                <!-- StatusDot 状态点组件 -->
                <h3 class="text-lg font-semibold text-[var(--vort-text)] mt-8 mb-4">StatusDot 状态点</h3>

                <DemoBox title="基础用法" description="用于表示状态的小圆点，支持多种预设状态。" :code="statusDotBasicCode">
                    <div class="flex flex-col gap-2">
                        <vort-status-dot status="success" text="Success" />
                        <vort-status-dot status="error" text="Error" />
                        <vort-status-dot status="default" text="Default" />
                        <vort-status-dot status="processing" text="Processing" />
                        <vort-status-dot status="warning" text="Warning" />
                    </div>
                </DemoBox>

                <DemoBox title="发光动画" description="通过 pulse 参数开启发光动画效果，适用于需要吸引注意力的状态。" :code="statusDotPulseCode">
                    <div class="flex flex-col gap-2">
                        <vort-status-dot status="processing" text="Processing" pulse />
                        <vort-status-dot status="success" text="Online" pulse />
                        <vort-status-dot status="error" text="Error" pulse />
                        <vort-status-dot status="warning" text="Warning" pulse />
                        <vort-status-dot color="#722ed1" text="Custom" pulse />
                    </div>
                </DemoBox>

                <DemoBox title="不同尺寸" description="提供三种尺寸：small、default、large。" :code="statusDotSizeCode">
                    <div class="flex flex-col gap-2">
                        <vort-status-dot status="success" size="small" text="Small" />
                        <vort-status-dot status="success" size="default" text="Default" />
                        <vort-status-dot status="success" size="large" text="Large" />
                    </div>
                </DemoBox>

                <DemoBox title="自定义颜色" description="支持预设颜色和自定义颜色值。" :code="statusDotColorCode">
                    <div class="flex flex-col gap-2">
                        <vort-status-dot color="pink" text="pink" />
                        <vort-status-dot color="cyan" text="cyan" />
                        <vort-status-dot color="purple" text="purple" />
                        <vort-status-dot color="#f50" text="#f50" />
                        <vort-status-dot color="#2db7f5" text="#2db7f5" />
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Badge Props</h3>
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

            <h3 class="demo-api-title">Badge Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in slotsData" :key="item.name">
                        <td>
                            <code>{{ item.name }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Badge.Ribbon Props</h3>
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
                    <tr v-for="item in ribbonPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">Badge.Ribbon Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in ribbonSlotsData" :key="item.name">
                        <td>
                            <code>{{ item.name }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">StatusDot Props</h3>
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
                    <tr v-for="item in statusDotPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">PresetColor 预设颜色</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>颜色名</th>
                        <th>色值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in presetColorData" :key="item.color">
                        <td>
                            <code>{{ item.color }}</code>
                        </td>
                        <td>
                            <span class="inline-flex items-center gap-2">
                                <span class="w-4 h-4 rounded" :style="{ backgroundColor: item.desc }" />
                                <code>{{ item.desc }}</code>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* Demo 示例元素 - 特有样式 */
.avatar-item {
    width: 42px;
    height: 42px;
    border-radius: 6px;
    background: #eee
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E")
        center center no-repeat;
    background-size: 24px 24px;
}

.card-item {
    width: 100%;
    padding: 24px;
    background: #fff;
    border: 1px solid var(--vort-border-secondary);
    border-radius: 8px;
    color: var(--vort-text-secondary);
    font-size: 14px;
}
</style>
