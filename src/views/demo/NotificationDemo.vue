<script setup lang="ts">
import { ref } from "vue";
import { notification } from "@/components/vort";
import DemoBox from "./components/DemoBox.vue";

// 示例代码
const basicCode = `<template>
  <vort-button @click="openNotification">Open the notification box</vort-button>
</template>

<script setup>
import { notification } from "@/components/vort";

const openNotification = () => {
  notification.open({
    message: "Notification Title",
    description: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  });
};
<\/script>`;

const typeCode = `<template>
  <div class="flex gap-2">
    <vort-button @click="success">Success</vort-button>
    <vort-button @click="info">Info</vort-button>
    <vort-button @click="warning">Warning</vort-button>
    <vort-button @click="error">Error</vort-button>
  </div>
</template>

<script setup>
import { notification } from "@/components/vort";

const success = () => {
  notification.success({
    message: "Success",
    description: "This is the content of the notification.",
  });
};

const info = () => {
  notification.info({
    message: "Info",
    description: "This is the content of the notification.",
  });
};

const warning = () => {
  notification.warning({
    message: "Warning",
    description: "This is the content of the notification.",
  });
};

const error = () => {
  notification.error({
    message: "Error",
    description: "This is the content of the notification.",
  });
};
<\/script>`;

const placementCode = `<template>
  <div class="flex gap-2 flex-wrap">
    <vort-button @click="() => openPlacement('top')">top</vort-button>
    <vort-button @click="() => openPlacement('topLeft')">topLeft</vort-button>
    <vort-button @click="() => openPlacement('topRight')">topRight</vort-button>
    <vort-button @click="() => openPlacement('bottom')">bottom</vort-button>
    <vort-button @click="() => openPlacement('bottomLeft')">bottomLeft</vort-button>
    <vort-button @click="() => openPlacement('bottomRight')">bottomRight</vort-button>
  </div>
</template>

<script setup>
import { notification } from "@/components/vort";

const openPlacement = (placement) => {
  notification.info({
    message: "Notification Title",
    description: \`This notification is placed at \${placement}.\`,
    placement,
  });
};
<\/script>`;

const durationCode = `<template>
  <vort-button @click="openNotification">
    Open the notification box (10 seconds)
  </vort-button>
</template>

<script setup>
import { notification } from "@/components/vort";

const openNotification = () => {
  notification.open({
    message: "Notification Title",
    description: "This notification will be closed after 10 seconds.",
    duration: 10000,
  });
};
<\/script>`;

const manualCloseCode = `<template>
  <vort-button @click="openNotification">
    Open notification (will not auto close)
  </vort-button>
</template>

<script setup>
import { notification } from "@/components/vort";

const openNotification = () => {
  notification.open({
    message: "Notification Title",
    description: "I will not close automatically. Click the close button to close me.",
    duration: 0,
  });
};
<\/script>`;

const updateCode = `<template>
  <vort-button @click="openNotification">
    Open the notification box
  </vort-button>
</template>

<script setup>
import { notification } from "@/components/vort";

const openNotification = () => {
  notification.open({
    key: "updatable",
    message: "Notification Title",
    description: "description.",
  });

  setTimeout(() => {
    notification.success({
      key: "updatable",
      message: "New Title",
      description: "New description.",
    });
  }, 1000);
};
<\/script>`;

// 事件处理函数
const openNotification = () => {
    notification.open({
        message: "Notification Title",
        description: "This is the content of the notification. This is the content of the notification. This is the content of the notification."
    });
};

const success = () => {
    notification.success({
        message: "Success",
        description: "This is the content of the notification."
    });
};

const info = () => {
    notification.info({
        message: "Info",
        description: "This is the content of the notification."
    });
};

const warning = () => {
    notification.warning({
        message: "Warning",
        description: "This is the content of the notification."
    });
};

const error = () => {
    notification.error({
        message: "Error",
        description: "This is the content of the notification."
    });
};

const openPlacement = (placement: "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight") => {
    notification.info({
        message: "Notification Title",
        description: `This notification is placed at ${placement}.`,
        placement
    });
};

const openDuration = () => {
    notification.open({
        message: "Notification Title",
        description: "This notification will be closed after 10 seconds.",
        duration: 10000
    });
};

const openManual = () => {
    notification.open({
        message: "Notification Title",
        description: "I will not close automatically. Click the close button to close me.",
        duration: 0
    });
};

const openUpdate = () => {
    notification.open({
        key: "updatable",
        message: "Notification Title",
        description: "description."
    });

    setTimeout(() => {
        notification.success({
            key: "updatable",
            message: "New Title",
            description: "New description."
        });
    }, 1000);
};

// Props 表格数据 - notification.config 配置
const configData = [
    {
        prop: "duration",
        desc: "默认自动关闭延时，单位毫秒",
        type: "number",
        default: "4500"
    },
    {
        prop: "placement",
        desc: "弹出位置",
        type: "'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'",
        default: "'topRight'"
    },
    {
        prop: "top",
        desc: "消息从顶部弹出时，距离顶部的位置",
        type: "number",
        default: "24"
    },
    {
        prop: "bottom",
        desc: "消息从底部弹出时，距离底部的位置",
        type: "number",
        default: "24"
    },
    {
        prop: "maxCount",
        desc: "最大显示数，超过限制时最早的通知会被自动关闭",
        type: "number",
        default: "-"
    }
];

// NotificationConfig 参数
const notificationConfigData = [
    {
        prop: "message",
        desc: "通知标题",
        type: "string",
        default: "-"
    },
    {
        prop: "description",
        desc: "通知内容",
        type: "string",
        default: "-"
    },
    {
        prop: "duration",
        desc: "自动关闭延时，单位毫秒，设为 0 时不自动关闭",
        type: "number",
        default: "4500"
    },
    {
        prop: "closable",
        desc: "是否显示关闭按钮",
        type: "boolean",
        default: "true"
    },
    {
        prop: "placement",
        desc: "弹出位置",
        type: "'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'",
        default: "'topRight'"
    },
    {
        prop: "onClose",
        desc: "关闭时触发的回调函数",
        type: "() => void",
        default: "-"
    },
    {
        prop: "key",
        desc: "当前通知的唯一标志，可用于更新通知内容",
        type: "string",
        default: "-"
    }
];

// 方法表格数据
const methodsData = [
    {
        method: "notification.success(config)",
        desc: "成功通知"
    },
    {
        method: "notification.error(config)",
        desc: "错误通知"
    },
    {
        method: "notification.info(config)",
        desc: "信息通知"
    },
    {
        method: "notification.warning(config)",
        desc: "警告通知"
    },
    {
        method: "notification.open(config)",
        desc: "打开通知（通用方法）"
    },
    {
        method: "notification.config(options)",
        desc: "全局配置"
    },
    {
        method: "notification.destroy()",
        desc: "销毁所有通知"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Notification 通知提醒框</h1>
            <p class="demo-page-desc">全局展示通知提醒信息。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>在系统边缘显示通知提醒信息，支持六个位置（四角 + 顶部/底部居中）。</li>
                <li>经常用于以下情况：较为复杂的通知内容。</li>
                <li>带有交互的通知，给出用户下一步的行动点。</li>
                <li>系统主动推送。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本" description="最简单的用法，4.5 秒后自动关闭。" :code="basicCode">
                    <vort-button @click="openNotification">Open the notification box</vort-button>
                </DemoBox>

                <DemoBox title="带有图标的通知提醒框" description="通知提醒框左侧有图标。" :code="typeCode">
                    <div class="flex gap-2">
                        <vort-button @click="success">Success</vort-button>
                        <vort-button @click="info">Info</vort-button>
                        <vort-button @click="warning">Warning</vort-button>
                        <vort-button @click="error">Error</vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="位置" description="支持 6 个弹出位置：顶部居中、左上角、右上角、底部居中、左下角、右下角。" :code="placementCode">
                    <div class="flex gap-2 flex-wrap">
                        <vort-button @click="() => openPlacement('top')">top</vort-button>
                        <vort-button @click="() => openPlacement('topLeft')">topLeft</vort-button>
                        <vort-button @click="() => openPlacement('topRight')">topRight</vort-button>
                        <vort-button @click="() => openPlacement('bottom')">bottom</vort-button>
                        <vort-button @click="() => openPlacement('bottomLeft')">bottomLeft</vort-button>
                        <vort-button @click="() => openPlacement('bottomRight')">bottomRight</vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="自定义延时" description="自定义时长 10s，默认时长为 4.5s。" :code="durationCode">
                    <vort-button @click="openDuration"> Open the notification box (10 seconds) </vort-button>
                </DemoBox>

                <DemoBox title="手动关闭" description="设置 duration 为 0，则不会自动关闭，需要手动点击关闭按钮。" :code="manualCloseCode">
                    <vort-button @click="openManual"> Open notification (will not auto close) </vort-button>
                </DemoBox>

                <DemoBox title="更新通知内容" description="可以通过唯一的 key 来更新内容。" :code="updateCode">
                    <vort-button @click="openUpdate">Open the notification box</vort-button>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <p class="demo-section-desc">组件提供了一些静态方法，使用方式和参数如下：</p>

            <h3 class="demo-api-title">方法</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>方法</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in methodsData" :key="item.method">
                        <td>
                            <code>{{ item.method }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">NotificationConfig</h3>
            <p class="demo-section-desc">
                组件方法接受配置对象：
                <code>notification.success({ message: 'title', description: 'content' })</code>
            </p>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>参数</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in notificationConfigData" :key="item.prop">
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

            <h3 class="demo-api-title">notification.config</h3>
            <p class="demo-section-desc">全局配置方法：<code>notification.config(options)</code></p>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>参数</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in configData" :key="item.prop">
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
