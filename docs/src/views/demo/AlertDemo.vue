<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 可关闭演示
const showAlert1 = ref(true);
const showAlert2 = ref(true);

const resetAlerts = () => {
    showAlert1.value = true;
    showAlert2.value = true;
};

// 示例代码
const basicCode = `<template>
  <vort-alert message="Success Tips" type="success" />
</template>`;

const typeCode = `<template>
  <vort-alert message="Success Text" type="success" />
  <vort-alert message="Info Text" type="info" />
  <vort-alert message="Warning Text" type="warning" />
  <vort-alert message="Error Text" type="error" />
</template>`;

const closableCode = `<template>
  <vort-alert
    message="Warning Text Warning Text Warning TextW arning Text"
    type="warning"
    closable
    @close="onClose"
  />
  <vort-alert
    message="Error Text"
    description="Error Description Error Description Error Description Error Description"
    type="error"
    closable
    @close="onClose"
  />
</template>

<script setup>
const onClose = (e) => {
  console.log(e, 'I was closed.');
};
<\/script>`;

const iconCode = `<template>
  <vort-alert message="Success Tips" type="success" show-icon />
  <vort-alert message="Informational Notes" type="info" show-icon />
  <vort-alert message="Warning" type="warning" show-icon />
  <vort-alert message="Error" type="error" show-icon />
  <vort-alert
    message="Success Tips"
    description="Detailed description and advices about successful copywriting."
    type="success"
    show-icon
  />
  <vort-alert
    message="Informational Notes"
    description="Additional description and information about copywriting."
    type="info"
    show-icon
  />
  <vort-alert
    message="Warning"
    description="This is a warning notice about copywriting."
    type="warning"
    show-icon
  />
  <vort-alert
    message="Error"
    description="This is an error message about copywriting."
    type="error"
    show-icon
  />
</template>`;

const descriptionCode = `<template>
  <vort-alert
    message="Success Text"
    description="Success Description Success Description Success Description"
    type="success"
  />
  <vort-alert
    message="Info Text"
    description="Info Description Info Description Info Description Info Description"
    type="info"
  />
  <vort-alert
    message="Warning Text"
    description="Warning Description Warning Description Warning Description"
    type="warning"
  />
  <vort-alert
    message="Error Text"
    description="Error Description Error Description Error Description Error Description"
    type="error"
  />
</template>`;

const closeTextCode = `<template>
  <vort-alert message="Info Text" type="info" closable close-text="关闭" />
</template>`;

const bannerCode = `<template>
  <vort-alert message="Warning text" banner />
  <vort-alert
    message="Very long warning text warning text warning text text text text"
    banner
    closable
  />
  <vort-alert message="Info text" banner type="info" />
  <vort-alert message="Error text" banner type="error" />
</template>`;

const actionCode = `<template>
  <vort-alert message="Success Tips" type="success" show-icon>
    <template #action>
      <vort-button size="small" variant="text">UNDO</vort-button>
    </template>
  </vort-alert>
  <vort-alert
    message="Error Text"
    description="Error Description Error Description Error Description"
    type="error"
    show-icon
  >
    <template #action>
      <vort-button size="small" danger>Detail</vort-button>
    </template>
  </vort-alert>
</template>`;

// 关闭事件处理
const onClose = (e?: MouseEvent) => {
    console.log(e, "I was closed.");
};

const onAfterClose = () => {
    console.log("Alert closed animation finished.");
};

// Props 表格数据
const propsData = [
    {
        prop: "type",
        desc: "指定警告提示的样式",
        type: "'success' | 'info' | 'warning' | 'error'",
        default: "'info'"
    },
    {
        prop: "message",
        desc: "警告提示内容（正文）",
        type: "string",
        default: "-"
    },
    {
        prop: "description",
        desc: "警告提示的辅助性文字介绍",
        type: "string",
        default: "-"
    },
    {
        prop: "closable",
        desc: "是否显示关闭按钮",
        type: "boolean",
        default: "false"
    },
    {
        prop: "closeText",
        desc: "自定义关闭按钮文字",
        type: "string",
        default: "-"
    },
    {
        prop: "showIcon",
        desc: "是否显示辅助图标",
        type: "boolean",
        default: "false"
    },
    {
        prop: "banner",
        desc: "是否用作顶部公告（无边框、圆角为0）",
        type: "boolean",
        default: "false"
    }
];

// Slots 表格数据
const slotsData = [
    {
        name: "icon",
        desc: "自定义图标"
    },
    {
        name: "message",
        desc: "自定义消息内容"
    },
    {
        name: "description",
        desc: "自定义描述内容"
    },
    {
        name: "closeIcon",
        desc: "自定义关闭图标"
    },
    {
        name: "action",
        desc: "操作区域"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "close",
        desc: "关闭时触发的回调函数",
        params: "(e: MouseEvent) => void"
    },
    {
        event: "afterClose",
        desc: "关闭动画结束后触发的回调函数",
        params: "() => void"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Alert 警告提示</h1>
            <p class="demo-page-desc">警告提示，展现需要关注的信息。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当某个页面需要向用户显示警告的信息时。</li>
                <li>非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本" description="最简单的用法，适用于简短的警告提示。" :code="basicCode">
                    <vort-alert message="Success Tips" type="success" />
                </DemoBox>

                <DemoBox title="四种样式" description="共有四种样式：success、info、warning、error。" :code="typeCode">
                    <div class="w-full flex flex-col gap-4">
                        <vort-alert message="Success Text" type="success" />
                        <vort-alert message="Info Text" type="info" />
                        <vort-alert message="Warning Text" type="warning" />
                        <vort-alert message="Error Text" type="error" />
                    </div>
                </DemoBox>

                <DemoBox title="可关闭的警告提示" description="显示关闭按钮，点击可关闭警告提示。" :code="closableCode">
                    <div class="w-full flex flex-col gap-4">
                        <vort-alert
                            v-if="showAlert1"
                            message="Warning Text Warning Text Warning Text Warning Text"
                            type="warning"
                            closable
                            @close="
                                () => {
                                    showAlert1 = false;
                                    onClose();
                                }
                            "
                        />
                        <vort-alert
                            v-if="showAlert2"
                            message="Error Text"
                            description="Error Description Error Description Error Description Error Description"
                            type="error"
                            closable
                            @close="
                                () => {
                                    showAlert2 = false;
                                    onClose();
                                }
                            "
                            @after-close="onAfterClose"
                        />
                        <vort-button v-if="!showAlert1 || !showAlert2" size="small" @click="resetAlerts">重置</vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="图标" description="可口的图标让信息类型更加醒目。" :code="iconCode">
                    <div class="w-full flex flex-col gap-4">
                        <vort-alert message="Success Tips" type="success" show-icon />
                        <vort-alert message="Informational Notes" type="info" show-icon />
                        <vort-alert message="Warning" type="warning" show-icon />
                        <vort-alert message="Error" type="error" show-icon />
                        <vort-alert
                            message="Success Tips"
                            description="Detailed description and advices about successful copywriting."
                            type="success"
                            show-icon
                        />
                        <vort-alert
                            message="Informational Notes"
                            description="Additional description and information about copywriting."
                            type="info"
                            show-icon
                        />
                        <vort-alert message="Warning" description="This is a warning notice about copywriting." type="warning" show-icon />
                        <vort-alert message="Error" description="This is an error message about copywriting." type="error" show-icon />
                    </div>
                </DemoBox>

                <DemoBox title="含有辅助性文字介绍" description="含有辅助性文字介绍的警告提示。" :code="descriptionCode">
                    <div class="w-full flex flex-col gap-4">
                        <vort-alert message="Success Text" description="Success Description Success Description Success Description" type="success" />
                        <vort-alert message="Info Text" description="Info Description Info Description Info Description Info Description" type="info" />
                        <vort-alert message="Warning Text" description="Warning Description Warning Description Warning Description" type="warning" />
                        <vort-alert message="Error Text" description="Error Description Error Description Error Description Error Description" type="error" />
                    </div>
                </DemoBox>

                <DemoBox title="自定义关闭文字" description="自定义关闭按钮为文字。" :code="closeTextCode">
                    <vort-alert message="Info Text" type="info" closable close-text="关闭" />
                </DemoBox>

                <DemoBox title="顶部公告" description="用作页面顶部公告时，默认有图标，type 为 'warning'。" :code="bannerCode">
                    <div class="w-full flex flex-col">
                        <vort-alert message="Warning text" banner />
                        <vort-alert message="Very long warning text warning text warning text text text text" banner closable />
                        <vort-alert message="Info text" banner type="info" />
                        <vort-alert message="Error text" banner type="error" />
                    </div>
                </DemoBox>

                <DemoBox title="操作" description="可以在右上角自定义操作项。" :code="actionCode">
                    <div class="w-full flex flex-col gap-4">
                        <vort-alert message="Success Tips" type="success" show-icon>
                            <template #action>
                                <vort-button size="small" variant="text">UNDO</vort-button>
                            </template>
                        </vort-alert>
                        <vort-alert message="Error Text" description="Error Description Error Description Error Description" type="error" show-icon>
                            <template #action>
                                <vort-button size="small" danger>Detail</vort-button>
                            </template>
                        </vort-alert>
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

            <h3 class="demo-api-title">Slots</h3>
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
        </section>
    </div>
</template>

<!-- 公共样式已在 demo.css 中定义 -->
