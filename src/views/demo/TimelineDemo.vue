<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { ClockCircleOutlined } from "@/components/vort/icons";

// 反转状态
const reverse = ref(false);

// 示例代码
const basicCode = `<template>
    <vort-timeline>
        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
        <vort-timeline-item>初步排除网络异常 2015-09-01</vort-timeline-item>
        <vort-timeline-item>技术测试异常 2015-09-01</vort-timeline-item>
        <vort-timeline-item>网络异常正在修复 2015-09-01</vort-timeline-item>
    </vort-timeline>
</template>`;

const colorCode = `<template>
    <vort-timeline>
        <vort-timeline-item color="green">创建服务现场 2015-09-01</vort-timeline-item>
        <vort-timeline-item color="green">初步排除网络异常 2015-09-01</vort-timeline-item>
        <vort-timeline-item color="red">
            <p>技术测试异常 2015-09-01</p>
            <p>网络异常正在修复 2015-09-01</p>
        </vort-timeline-item>
        <vort-timeline-item>
            <p>网络恢复正常 2015-09-01</p>
        </vort-timeline-item>
        <vort-timeline-item color="gray">
            <p>等待下一步处理 2015-09-01</p>
        </vort-timeline-item>
    </vort-timeline>
</template>`;

const pendingCode = `<template>
    <vort-timeline pending="录入中...">
        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
        <vort-timeline-item>初步排除网络异常 2015-09-01</vort-timeline-item>
        <vort-timeline-item>技术测试异常 2015-09-01</vort-timeline-item>
    </vort-timeline>
</template>`;

const alternateCode = `<template>
    <vort-timeline mode="alternate">
        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
        <vort-timeline-item color="green">初步排除网络异常 2015-09-01</vort-timeline-item>
        <vort-timeline-item>
            <template #dot>
                <ClockCircleOutlined style="font-size: 16px; color: var(--vort-error);" />
            </template>
            技术测试异常 2015-09-01
        </vort-timeline-item>
        <vort-timeline-item color="red">网络异常正在修复 2015-09-01</vort-timeline-item>
        <vort-timeline-item>网络恢复正常 2015-09-01</vort-timeline-item>
    </vort-timeline>
</template>`;

const customDotCode = `<template>
    <vort-timeline>
        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
        <vort-timeline-item>初步排除网络异常 2015-09-01</vort-timeline-item>
        <vort-timeline-item>
            <template #dot>
                <ClockCircleOutlined style="font-size: 16px; color: var(--vort-primary);" />
            </template>
            技术测试异常 2015-09-01
        </vort-timeline-item>
        <vort-timeline-item>网络异常正在修复 2015-09-01</vort-timeline-item>
    </vort-timeline>
</template>

<script setup>
import { ClockCircleOutlined } from "@/components/vort/icons";
<\/script>`;

const rightCode = `<template>
    <vort-timeline mode="right">
        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
        <vort-timeline-item>初步排除网络异常 2015-09-01</vort-timeline-item>
        <vort-timeline-item>技术测试异常 2015-09-01</vort-timeline-item>
        <vort-timeline-item>网络异常正在修复 2015-09-01</vort-timeline-item>
    </vort-timeline>
</template>`;

const labelCode = `<template>
    <vort-timeline mode="alternate">
        <vort-timeline-item label="2015-09-01">创建服务现场</vort-timeline-item>
        <vort-timeline-item label="2015-09-01 09:12:11">初步排除网络异常</vort-timeline-item>
        <vort-timeline-item>技术测试异常</vort-timeline-item>
        <vort-timeline-item label="2015-09-01 09:12:11">网络恢复正常</vort-timeline-item>
    </vort-timeline>
</template>`;

const reverseCode = `<template>
    <vort-timeline :reverse="reverse" pending="录入中...">
        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
        <vort-timeline-item>初步排除网络异常 2015-09-01</vort-timeline-item>
        <vort-timeline-item>技术测试异常 2015-09-01</vort-timeline-item>
    </vort-timeline>
    <vort-button @click="reverse = !reverse" style="margin-top: 16px;">
        切换排序
    </vort-button>
</template>

<script setup>
import { ref } from "vue";
const reverse = ref(false);
<\/script>`;

// Props 表格数据
const timelinePropsData = [
    { prop: "mode", desc: "通过设置 mode 可以改变时间轴和内容的相对位置", type: "'left' | 'right' | 'alternate'", default: "'left'" },
    { prop: "pending", desc: "指定最后一个幽灵节点是否存在或内容", type: "boolean | string", default: "false" },
    { prop: "reverse", desc: "节点排序", type: "boolean", default: "false" }
];

const timelineItemPropsData = [
    { prop: "color", desc: "指定圆圈颜色 blue | green | red | gray，或自定义颜色值", type: "string", default: "'blue'" },
    { prop: "label", desc: "设置标签", type: "string", default: "-" },
    { prop: "position", desc: "自定义节点位置（仅 alternate 模式有效）", type: "'left' | 'right'", default: "-" }
];

// Slots 表格数据
const timelineSlotsData = [
    { slot: "default", desc: "时间轴内容（TimelineItem）" },
    { slot: "pending", desc: "自定义 pending 内容" },
    { slot: "pendingDot", desc: "自定义 pending 节点图标" }
];

const timelineItemSlotsData = [
    { slot: "default", desc: "节点内容" },
    { slot: "dot", desc: "自定义节点图标" },
    { slot: "label", desc: "自定义标签" }
];
</script>

<template>
    <div class="demo-page">
        <!-- 页面头部 -->
        <header class="demo-page-header">
            <h1 class="demo-page-title">Timeline 时间轴</h1>
            <p class="demo-page-desc">垂直展示的时间流信息。</p>
        </header>

        <!-- 何时使用 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当有一系列信息需按时间排列时，可正序和倒序。</li>
                <li>需要有一条时间轴进行视觉上的串联时。</li>
            </ul>
        </section>

        <!-- 代码演示 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基本用法 -->
                <DemoBox title="基本用法" description="基本的时间轴。" :code="basicCode">
                    <vort-timeline>
                        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>初步排除网络异常 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>技术测试异常 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>网络异常正在修复 2015-09-01</vort-timeline-item>
                    </vort-timeline>
                </DemoBox>

                <!-- 圆圈颜色 -->
                <DemoBox
                    title="圆圈颜色"
                    description="圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态，灰色表示未完成或失效状态。"
                    :code="colorCode"
                >
                    <vort-timeline>
                        <vort-timeline-item color="green">创建服务现场 2015-09-01</vort-timeline-item>
                        <vort-timeline-item color="green">初步排除网络异常 2015-09-01</vort-timeline-item>
                        <vort-timeline-item color="red">
                            <p>技术测试异常 2015-09-01</p>
                            <p>网络异常正在修复 2015-09-01</p>
                        </vort-timeline-item>
                        <vort-timeline-item>
                            <p>网络恢复正常 2015-09-01</p>
                        </vort-timeline-item>
                        <vort-timeline-item color="gray">
                            <p>等待下一步处理 2015-09-01</p>
                        </vort-timeline-item>
                        <vort-timeline-item color="#ff9800">
                            <p>自定义颜色 2015-09-01</p>
                        </vort-timeline-item>
                    </vort-timeline>
                </DemoBox>

                <!-- 最后一个节点 -->
                <DemoBox
                    title="最后一个及排序"
                    description="当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，同时可以通过 reverse 属性来设置排序。"
                    :code="pendingCode"
                >
                    <vort-timeline :reverse="reverse" pending="录入中...">
                        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>初步排除网络异常 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>技术测试异常 2015-09-01</vort-timeline-item>
                    </vort-timeline>
                    <vort-button @click="reverse = !reverse" style="margin-top: 16px"> 切换排序 </vort-button>
                </DemoBox>

                <!-- 自定义时间轴点 -->
                <DemoBox title="自定义时间轴点" description="可以设置为图标或其他自定义元素。" :code="customDotCode">
                    <vort-timeline>
                        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>初步排除网络异常 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>
                            <template #dot>
                                <ClockCircleOutlined style="font-size: 16px; color: var(--vort-primary)" />
                            </template>
                            技术测试异常 2015-09-01
                        </vort-timeline-item>
                        <vort-timeline-item>网络异常正在修复 2015-09-01</vort-timeline-item>
                    </vort-timeline>
                </DemoBox>

                <!-- 右侧时间轴 -->
                <DemoBox title="右侧时间轴点" description="时间轴点可以设置在右边。" :code="rightCode">
                    <vort-timeline mode="right">
                        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>初步排除网络异常 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>技术测试异常 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>网络异常正在修复 2015-09-01</vort-timeline-item>
                    </vort-timeline>
                </DemoBox>

                <!-- 交替展现 -->
                <DemoBox title="交替展现" description="内容在时间轴两侧轮流出现。" :code="alternateCode">
                    <vort-timeline mode="alternate" style="width: 100%">
                        <vort-timeline-item>创建服务现场 2015-09-01</vort-timeline-item>
                        <vort-timeline-item color="green">初步排除网络异常 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>
                            <template #dot>
                                <ClockCircleOutlined style="font-size: 16px; color: var(--vort-error)" />
                            </template>
                            技术测试异常 2015-09-01
                        </vort-timeline-item>
                        <vort-timeline-item color="red">网络异常正在修复 2015-09-01</vort-timeline-item>
                        <vort-timeline-item>网络恢复正常 2015-09-01</vort-timeline-item>
                    </vort-timeline>
                </DemoBox>

                <!-- 标签 -->
                <DemoBox title="标签" description="使用 label 标签单独展示时间。" :code="labelCode">
                    <vort-timeline mode="alternate" style="width: 100%">
                        <vort-timeline-item label="2015-09-01">创建服务现场</vort-timeline-item>
                        <vort-timeline-item label="2015-09-01 09:12:11">初步排除网络异常</vort-timeline-item>
                        <vort-timeline-item>技术测试异常</vort-timeline-item>
                        <vort-timeline-item label="2015-09-01 09:12:11">网络恢复正常</vort-timeline-item>
                    </vort-timeline>
                </DemoBox>
            </div>
        </section>

        <!-- API 文档 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Timeline Props</h3>
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
                    <tr v-for="item in timelinePropsData" :key="item.prop">
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

            <h3 class="demo-api-title">Timeline Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in timelineSlotsData" :key="item.slot">
                        <td>
                            <code>{{ item.slot }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">TimelineItem Props</h3>
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
                    <tr v-for="item in timelineItemPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">TimelineItem Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in timelineItemSlotsData" :key="item.slot">
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
