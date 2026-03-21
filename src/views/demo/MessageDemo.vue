<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/components/vort";
import DemoBox from "./components/DemoBox.vue";

// 示例代码
const basicCode = `<template>
  <vort-button @click="info">Display normal message</vort-button>
</template>

<script setup>
import { message } from "@/components/vort";

const info = () => {
  message.info("This is a normal message");
};
<\/script>`;

const typeCode = `<template>
  <vort-button @click="success">Success</vort-button>
  <vort-button @click="error">Error</vort-button>
  <vort-button @click="warning">Warning</vort-button>
</template>

<script setup>
import { message } from "@/components/vort";

const success = () => {
  message.success("This is a success message");
};

const error = () => {
  message.error("This is an error message");
};

const warning = () => {
  message.warning("This is a warning message");
};
<\/script>`;

const durationCode = `<template>
  <vort-button @click="customDuration">Customized display duration</vort-button>
</template>

<script setup>
import { message } from "@/components/vort";

const customDuration = () => {
  message.success({
    content: "This is a prompt message for success, and it will disappear in 10 seconds",
    duration: 10000,
  });
};
<\/script>`;

const loadingCode = `<template>
  <vort-button @click="loading">Display a loading indicator</vort-button>
</template>

<script setup>
import { message } from "@/components/vort";

const loading = () => {
  const hide = message.loading("Action in progress..");
  // Dismiss manually
  setTimeout(() => {
    hide.close();
  }, 2500);
};
<\/script>`;

const sequentialCode = `<template>
  <vort-button @click="sequential">Display sequential messages</vort-button>
</template>

<script setup>
import { message } from "@/components/vort";

const sequential = () => {
  message.loading("Action in progress..");
  setTimeout(() => {
    message.success("Loading finished");
  }, 1000);
  setTimeout(() => {
    message.info("Loading finished is finished");
  }, 2000);
};
<\/script>`;

const updateCode = `<template>
  <vort-button @click="update">Update message content</vort-button>
</template>

<script setup>
import { message } from "@/components/vort";

const update = () => {
  message.loading({ content: "Loading...", key: "updatable" });
  setTimeout(() => {
    message.success({ content: "Loaded!", key: "updatable" });
  }, 1000);
};
<\/script>`;

// 事件处理函数
const info = () => {
    message.info("This is a normal message");
};

const success = () => {
    message.success("This is a success message");
};

const error = () => {
    message.error("This is an error message");
};

const warning = () => {
    message.warning("This is a warning message");
};

const customDuration = () => {
    message.success({
        content: "This is a prompt message for success, and it will disappear in 10 seconds",
        duration: 10000
    });
};

const loading = () => {
    const hide = message.loading("Action in progress..");
    setTimeout(() => {
        hide.close();
    }, 2500);
};

const sequential = () => {
    message.loading("Action in progress..");
    setTimeout(() => {
        message.success("Loading finished");
    }, 1000);
    setTimeout(() => {
        message.info("Loading finished is finished");
    }, 2000);
};

const update = () => {
    message.loading({ content: "Loading...", key: "updatable" });
    setTimeout(() => {
        message.success({ content: "Loaded!", key: "updatable" });
    }, 1000);
};

// Props 表格数据 - message.config 配置
const configData = [
    {
        prop: "duration",
        desc: "默认自动关闭延时，单位毫秒",
        type: "number",
        default: "3000"
    },
    {
        prop: "top",
        desc: "消息距离顶部的位置",
        type: "number",
        default: "8"
    },
    {
        prop: "maxCount",
        desc: "最大显示数，超过限制时最早的消息会被自动关闭",
        type: "number",
        default: "-"
    }
];

// MessageConfig 参数
const messageConfigData = [
    {
        prop: "content",
        desc: "提示内容",
        type: "string",
        default: "-"
    },
    {
        prop: "duration",
        desc: "自动关闭延时，单位毫秒，设为 0 时不自动关闭",
        type: "number",
        default: "3000"
    },
    {
        prop: "onClose",
        desc: "关闭时触发的回调函数",
        type: "() => void",
        default: "-"
    },
    {
        prop: "key",
        desc: "当前提示的唯一标志，可用于更新消息内容",
        type: "string",
        default: "-"
    }
];

// 方法表格数据
const methodsData = [
    {
        method: "message.success(config)",
        desc: "成功提示"
    },
    {
        method: "message.error(config)",
        desc: "错误提示"
    },
    {
        method: "message.info(config)",
        desc: "信息提示"
    },
    {
        method: "message.warning(config)",
        desc: "警告提示"
    },
    {
        method: "message.loading(config)",
        desc: "加载中提示"
    },
    {
        method: "message.config(options)",
        desc: "全局配置"
    },
    {
        method: "message.destroy()",
        desc: "销毁所有消息"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Message 全局提示</h1>
            <p class="demo-page-desc">全局展示操作反馈信息。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>可提供成功、警告和错误等反馈信息。</li>
                <li>顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="普通提示" description="信息提醒反馈。" :code="basicCode">
                    <vort-button @click="info">Display normal message</vort-button>
                </DemoBox>

                <DemoBox title="其他提示类型" description="包括成功、失败、警告。" :code="typeCode">
                    <div class="flex gap-2">
                        <vort-button @click="success">Success</vort-button>
                        <vort-button @click="error">Error</vort-button>
                        <vort-button @click="warning">Warning</vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="修改延时" description="自定义时长 10s，默认时长为 3s。" :code="durationCode">
                    <vort-button @click="customDuration">Customized display duration</vort-button>
                </DemoBox>

                <DemoBox title="加载中" description="进行全局 loading，异步自行移除。" :code="loadingCode">
                    <vort-button @click="loading">Display a loading indicator</vort-button>
                </DemoBox>

                <DemoBox title="Promise 接口" description="可以通过 then 接口在关闭后运行 callback。" :code="sequentialCode">
                    <vort-button @click="sequential">Display sequential messages</vort-button>
                </DemoBox>

                <DemoBox title="更新消息内容" description="可以通过唯一的 key 来更新内容。" :code="updateCode">
                    <vort-button @click="update">Update message content</vort-button>
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

            <h3 class="demo-api-title">MessageConfig</h3>
            <p class="demo-section-desc">
                组件方法可以接受字符串或配置对象：
                <code>message.success('content')</code> 或
                <code>message.success({ content: 'content', duration: 5000 })</code>
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
                    <tr v-for="item in messageConfigData" :key="item.prop">
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

            <h3 class="demo-api-title">message.config</h3>
            <p class="demo-section-desc">全局配置方法：<code>message.config(options)</code></p>
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
