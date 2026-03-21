<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 基本用法
const current1 = ref(1);

// 切换演示
const current2 = ref(1);

// 可点击的步骤条
const current3 = ref(0);

// 错误状态
const current4 = ref(1);

// 小尺寸
const current5 = ref(1);

// 垂直步骤条
const current6 = ref(1);

// 点状步骤条
const currentDot = ref(1);

// 点状垂直步骤条
const currentDotVertical = ref(1);

// 导航类型步骤条
const currentNav = ref(1);

// 内联步骤条
const currentInline = ref(1);

// 示例代码
const basicCode = `<template>
    <vort-steps :current="current" :items="items" />
</template>

<script setup>
import { ref } from "vue";

const current = ref(1);
const items = [
    { title: "第一步", description: "这是第一步的描述" },
    { title: "第二步", description: "这是第二步的描述" },
    { title: "第三步", description: "这是第三步的描述" }
];
<\/script>`;

const withDescCode = `<template>
    <vort-steps :current="current" :items="items" />
</template>

<script setup>
import { ref } from "vue";

const current = ref(1);
const items = [
    { title: "已完成", subTitle: "00:00:05", description: "这是一段很长的描述" },
    { title: "进行中", subTitle: "00:01:02", description: "这是一段很长的描述" },
    { title: "等待中", description: "这是一段很长的描述" }
];
<\/script>`;

const smallCode = `<template>
    <vort-steps :current="current" size="small" :items="items" />
</template>`;

const verticalCode = `<template>
    <vort-steps direction="vertical" :current="current" :items="items" />
</template>`;

const dotCode = `<template>
    <vort-steps type="dot" :current="current" :items="items" />
</template>

<script setup>
import { ref } from "vue";

const current = ref(1);
const items = [
    { title: "已完成", description: "这是一段描述" },
    { title: "进行中", description: "这是一段描述" },
    { title: "待完成", description: "这是一段描述" },
    { title: "等待中", description: "这是一段描述" }
];
<\/script>`;

const dotVerticalCode = `<template>
    <vort-steps type="dot" direction="vertical" :current="current" :items="items" />
</template>`;

const navigationCode = `<template>
    <vort-steps type="navigation" :current="current" :items="items" :clickable="true" />
</template>

<script setup>
import { ref } from "vue";

const current = ref(1);
const items = [
    { title: "步骤一", description: "完成信息填写" },
    { title: "步骤二", description: "进行身份验证" },
    { title: "步骤三", description: "等待审核结果" }
];
<\/script>`;

const inlineCode = `<template>
    <vort-steps type="inline" :current="current" :items="items" :clickable="true" />
</template>

<script setup>
import { ref } from "vue";

const current = ref(1);
const items = [
    { title: "步骤一" },
    { title: "步骤二" },
    { title: "步骤三" }
];
<\/script>`;

const errorCode = `<template>
    <vort-steps :current="current" status="error" :items="items" />
</template>`;

const clickableCode = `<template>
    <vort-steps
        v-model:current="current"
        :clickable="true"
        :items="items"
        @change="onChange"
    />
</template>

<script setup>
import { ref } from "vue";

const current = ref(0);
const onChange = (step) => {
    console.log("切换到步骤:", step);
};
<\/script>`;

const switchCode = `<template>
    <vort-steps :current="current" :items="items" />
    <div style="margin-top: 24px;">
        <vort-button @click="prev" :disabled="current <= 0">上一步</vort-button>
        <vort-button @click="next" :disabled="current >= 2" style="margin-left: 8px;">下一步</vort-button>
    </div>
</template>

<script setup>
import { ref } from "vue";

const current = ref(0);
const prev = () => current.value--;
const next = () => current.value++;
<\/script>`;

// Props 表格数据
const propsData = [
    { prop: "current", desc: "当前步骤，从 0 开始", type: "number", default: "0" },
    { prop: "direction", desc: "步骤条方向", type: "'horizontal' | 'vertical'", default: "'horizontal'" },
    { prop: "initial", desc: "起始序号，默认从 0 开始计数", type: "number", default: "0" },
    { prop: "size", desc: "尺寸", type: "'default' | 'small'", default: "'default'" },
    { prop: "status", desc: "当前步骤的状态", type: "'wait' | 'process' | 'finish' | 'error'", default: "'process'" },
    { prop: "type", desc: "步骤条类型", type: "'default' | 'dot' | 'navigation' | 'inline'", default: "'default'" },
    { prop: "items", desc: "配置式步骤项", type: "StepItem[]", default: "-" },
    { prop: "clickable", desc: "是否可点击切换", type: "boolean", default: "false" },
    { prop: "labelPlacement", desc: "标签放置位置（仅 dot 类型生效）", type: "'horizontal' | 'vertical'", default: "'horizontal'" }
];

// StepItem 表格数据
const stepItemData = [
    { prop: "title", desc: "标题", type: "string", default: "-" },
    { prop: "subTitle", desc: "副标题", type: "string", default: "-" },
    { prop: "description", desc: "步骤的详情描述", type: "string", default: "-" },
    { prop: "status", desc: "指定状态，会覆盖自动计算的状态", type: "'wait' | 'process' | 'finish' | 'error'", default: "-" },
    { prop: "disabled", desc: "禁用点击", type: "boolean", default: "false" }
];

// Events 表格数据
const eventsData = [
    { event: "update:current", desc: "当前步骤变化时触发", params: "(current: number) => void" },
    { event: "change", desc: "点击切换步骤时触发", params: "(current: number) => void" }
];
</script>

<template>
    <div class="demo-page">
        <!-- 页面头部 -->
        <header class="demo-page-header">
            <h1 class="demo-page-title">Steps 步骤条</h1>
            <p class="demo-page-desc">引导用户按照流程完成任务的导航条。</p>
        </header>

        <!-- 何时使用 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。</li>
            </ul>
        </section>

        <!-- 代码演示 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基本用法 -->
                <DemoBox title="基本用法" description="简单的步骤条。" :code="basicCode">
                    <vort-steps
                        :current="current1"
                        :items="[
                            { title: '已完成', description: '这是一段描述' },
                            { title: '进行中', description: '这是一段描述' },
                            { title: '待完成', description: '这是一段描述' }
                        ]"
                    />
                </DemoBox>

                <!-- 带副标题 -->
                <DemoBox title="带副标题" description="带有副标题的步骤条。" :code="withDescCode">
                    <vort-steps
                        :current="current1"
                        :items="[
                            { title: '已完成', subTitle: '00:00:05', description: '这是一段很长很长的描述' },
                            { title: '进行中', subTitle: '00:01:02', description: '这是一段很长很长的描述' },
                            { title: '待完成', description: '这是一段很长很长的描述' }
                        ]"
                    />
                </DemoBox>

                <!-- 切换步骤 -->
                <DemoBox title="切换步骤" description="配合按钮切换步骤。" :code="switchCode">
                    <vort-steps
                        :current="current2"
                        :items="[
                            { title: '第一步', description: '这是一段描述' },
                            { title: '第二步', description: '这是一段描述' },
                            { title: '第三步', description: '这是一段描述' }
                        ]"
                    />
                    <div style="margin-top: 24px">
                        <vort-button @click="current2--" :disabled="current2 <= 0">上一步</vort-button>
                        <vort-button @click="current2++" :disabled="current2 >= 2" style="margin-left: 8px">下一步</vort-button>
                    </div>
                </DemoBox>

                <!-- 小尺寸 -->
                <DemoBox title="小尺寸" description='迷你版的步骤条，通过设置 size="small" 启用。' :code="smallCode">
                    <vort-steps size="small" :current="current5" :items="[{ title: '已完成' }, { title: '进行中' }, { title: '待完成' }]" />
                </DemoBox>

                <!-- 错误状态 -->
                <DemoBox title="错误状态" description="使用 status 属性指定当前步骤的状态。" :code="errorCode">
                    <vort-steps
                        :current="current4"
                        status="error"
                        :items="[
                            { title: '已完成', description: '这是一段描述' },
                            { title: '进行中', description: '这是一段描述' },
                            { title: '待完成', description: '这是一段描述' }
                        ]"
                    />
                </DemoBox>

                <!-- 可点击 -->
                <DemoBox title="可点击" description="设置 clickable 后步骤条可以点击切换。" :code="clickableCode">
                    <vort-steps
                        v-model:current="current3"
                        :clickable="true"
                        :items="[
                            { title: '步骤 1', description: '点击可切换' },
                            { title: '步骤 2', description: '点击可切换' },
                            { title: '步骤 3', description: '点击可切换' }
                        ]"
                    />
                    <p style="color: var(--vort-text-secondary)">当前步骤：{{ current3 + 1 }}</p>
                </DemoBox>

                <!-- 垂直步骤条 -->
                <DemoBox title="垂直步骤条" description="简单的竖直方向的步骤条。" :code="verticalCode">
                    <vort-steps
                        direction="vertical"
                        :current="current6"
                        :items="[
                            { title: '已完成', description: '这是一段描述' },
                            { title: '进行中', description: '这是一段描述' },
                            { title: '待完成', description: '这是一段描述' }
                        ]"
                    />
                </DemoBox>

                <!-- 点状步骤条 -->
                <DemoBox title="点状步骤条" description='使用 type="dot" 启用点状步骤条。包含一个头部和一个主要内容描述。' :code="dotCode">
                    <vort-steps
                        type="dot"
                        v-model:current="currentDot"
                        :clickable="true"
                        :items="[
                            { title: '已完成', description: '这是一段描述' },
                            { title: '进行中', description: '这是一段描述' },
                            { title: '待完成', description: '这是一段描述' },
                            { title: '等待中', description: '这是一段描述' }
                        ]"
                    />
                    <p style="color: var(--vort-text-secondary)">当前步骤：{{ currentDot + 1 }}</p>
                </DemoBox>

                <!-- 点状垂直步骤条 -->
                <DemoBox title="点状垂直步骤条" description="点状步骤条的垂直方向。" :code="dotVerticalCode">
                    <vort-steps
                        type="dot"
                        direction="vertical"
                        v-model:current="currentDotVertical"
                        :clickable="true"
                        :items="[
                            { title: '创建订单', description: '用户创建了一笔新订单' },
                            { title: '支付完成', description: '用户完成支付' },
                            { title: '商家发货', description: '等待商家发货' },
                            { title: '确认收货', description: '等待用户确认收货' }
                        ]"
                    />
                </DemoBox>

                <!-- 导航类型步骤条 -->
                <DemoBox title="导航类型步骤条" description='使用 type="navigation" 启用导航类型步骤条，通常用于页面顶部的步骤导航。' :code="navigationCode">
                    <vort-steps
                        type="navigation"
                        v-model:current="currentNav"
                        :clickable="true"
                        :items="[
                            { title: '步骤一', description: '完成信息填写' },
                            { title: '步骤二', description: '进行身份验证' },
                            { title: '步骤三', description: '等待审核结果' }
                        ]"
                    />
                    <p style="color: var(--vort-text-secondary)">当前步骤：{{ currentNav + 1 }}</p>
                </DemoBox>

                <!-- 导航类型小尺寸 -->
                <DemoBox title="导航类型小尺寸" description="导航类型步骤条的小尺寸版本。" :code="navigationCode">
                    <vort-steps
                        type="navigation"
                        size="small"
                        v-model:current="currentNav"
                        :clickable="true"
                        :items="[{ title: '基本信息' }, { title: '详细设置' }, { title: '确认提交' }]"
                    />
                </DemoBox>

                <!-- 内联步骤条 -->
                <DemoBox title="内联步骤条" description='使用 type="inline" 启用内联步骤条，适合在页面中展示简洁的步骤切换。' :code="inlineCode">
                    <vort-steps
                        type="inline"
                        v-model:current="currentInline"
                        :clickable="true"
                        :items="[{ title: '全部' }, { title: '待付款' }, { title: '待发货' }, { title: '已完成' }]"
                    />
                    <p style="color: var(--vort-text-secondary)">当前选中：{{ currentInline + 1 }}</p>
                </DemoBox>

                <!-- 内联步骤条小尺寸 -->
                <DemoBox title="内联步骤条小尺寸" description="内联步骤条的小尺寸版本。" :code="inlineCode">
                    <vort-steps
                        type="inline"
                        size="small"
                        v-model:current="currentInline"
                        :clickable="true"
                        :items="[{ title: '日' }, { title: '周' }, { title: '月' }, { title: '年' }]"
                    />
                </DemoBox>
            </div>
        </section>

        <!-- API 文档 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Steps Props</h3>
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

            <h3 class="demo-api-title">StepItem</h3>
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
                    <tr v-for="item in stepItemData" :key="item.prop">
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

            <h3 class="demo-api-title">Steps Events</h3>
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
