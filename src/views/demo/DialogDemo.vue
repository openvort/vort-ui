<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { dialog } from "@/components/vort/dialog";

// 基础用法
const basicOpen = ref(false);

// 异步关闭
const asyncOpen = ref(false);
const confirmLoading = ref(false);
const handleAsyncOk = () => {
    confirmLoading.value = true;
    setTimeout(() => {
        confirmLoading.value = false;
        asyncOpen.value = false;
    }, 2000);
};

// 自定义宽度
const customWidthOpen = ref(false);

// 垂直居中
const centeredOpen = ref(false);

// 自定义底部
const customFooterOpen = ref(false);

// 无底部
const noFooterOpen = ref(false);

// 点击蒙层不关闭
const maskClosableOpen = ref(false);

// 确认对话框方法
const showInfo = () => {
    dialog.info({
        title: "这是一条提示信息",
        content: "一些附加内容，一些附加内容，一些附加内容。"
    });
};

const showSuccess = () => {
    dialog.success({
        title: "操作成功",
        content: "您的操作已成功完成！"
    });
};

const showError = () => {
    dialog.error({
        title: "操作失败",
        content: "很抱歉，操作过程中发生了错误，请稍后重试。"
    });
};

const showWarning = () => {
    dialog.warning({
        title: "警告",
        content: "此操作可能会带来一些风险，请谨慎操作。"
    });
};

const showConfirm = () => {
    dialog.confirm({
        title: "确认删除",
        content: "您确定要删除这条记录吗？删除后将无法恢复。",
        onOk: () => {
            console.log("用户点击了确定");
        },
        onCancel: () => {
            console.log("用户点击了取消");
        }
    });
};

const showAsyncConfirm = () => {
    dialog.confirm({
        title: "异步确认",
        content: "点击确定后会进行异步操作（2秒）。",
        onOk: () => {
            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        }
    });
};

const showDeleteConfirm = () => {
    dialog.confirm({
        title: "确认删除",
        content: "您确定要删除这条记录吗？删除后将无法恢复。",
        okText: "删除",
        okType: "danger",
        onOk: () => {
            console.log("删除成功");
        }
    });
};

// 示例代码
const basicCode = `<script setup>
import { ref } from 'vue';
import { Dialog, Button } from '@/components/vort';

const open = ref(false);
<\/script>

<template>
  <vort-button variant="primary" @click="open = true">打开对话框</vort-button>

  <vort-dialog v-model:open="open" title="基础对话框" content-bg="#fff">
    <p>这是对话框的内容。</p>
    <p>观察打开/关闭时的缩放动画效果！</p>
  </vort-dialog>
</template>`;

const asyncCode = `<script setup>
import { ref } from 'vue';
import { Dialog, Button } from '@/components/vort';

const open = ref(false);
const confirmLoading = ref(false);

const handleOk = () => {
  confirmLoading.value = true;
  setTimeout(() => {
    confirmLoading.value = false;
    open.value = false;
  }, 2000);
};
<\/script>

<template>
  <vort-button variant="primary" @click="open = true">异步关闭</vort-button>

  <vort-dialog
    v-model:open="open"
    title="异步关闭"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    content-bg="#fff"
  >
    <p>点击确定后，会进行异步操作，2秒后关闭。</p>
  </vort-dialog>
</template>`;

const customWidthCode = `<template>
  <vort-dialog v-model:open="open" title="自定义宽度" width="800px" content-bg="#fff">
    <p>这个对话框的宽度是 800px。</p>
  </vort-dialog>
</template>`;

const centeredCode = `<template>
  <vort-dialog v-model:open="open" title="垂直居中" centered content-bg="#fff">
    <p>对话框垂直居中显示。</p>
  </vort-dialog>
</template>`;

const customFooterCode = `<template>
  <vort-dialog v-model:open="open" title="自定义底部" content-bg="#fff">
    <p>自定义底部按钮。</p>
    <template #footer>
      <vort-button @click="open = false">返回</vort-button>
      <vort-button variant="primary" danger>删除</vort-button>
      <vort-button variant="primary">提交</vort-button>
    </template>
  </vort-dialog>
</template>`;

const noFooterCode = `<template>
  <vort-dialog v-model:open="open" title="无底部" :footer="false" content-bg="#fff">
    <p>这个对话框没有底部按钮区域。</p>
    <p>适合展示信息或自定义操作。</p>
  </vort-dialog>
</template>`;

const maskClosableCode = `<template>
  <vort-dialog v-model:open="open" title="禁止蒙层关闭" :mask-closable="false" content-bg="#fff">
    <p>点击蒙层不会关闭对话框。</p>
    <p>只能通过关闭按钮或 ESC 键关闭。</p>
  </vort-dialog>
</template>`;

const confirmMethodCode = `<script setup>
import { dialog } from '@/components/vort/dialog';

// 信息提示
const showInfo = () => {
  dialog.info({
    title: '这是一条提示信息',
    content: '一些附加内容，一些附加内容。'
  });
};

// 成功提示
const showSuccess = () => {
  dialog.success({
    title: '操作成功',
    content: '您的操作已成功完成！'
  });
};

// 错误提示
const showError = () => {
  dialog.error({
    title: '操作失败',
    content: '很抱歉，操作过程中发生了错误。'
  });
};

// 警告提示
const showWarning = () => {
  dialog.warning({
    title: '警告',
    content: '此操作可能会带来一些风险。'
  });
};

// 确认对话框
const showConfirm = () => {
  dialog.confirm({
    title: '确认删除',
    content: '您确定要删除这条记录吗？',
    onOk: () => {
      console.log('用户点击了确定');
    },
    onCancel: () => {
      console.log('用户点击了取消');
    }
  });
};
<\/script>`;

const asyncConfirmCode = `<script setup>
import { dialog } from '@/components/vort/dialog';

const showAsyncConfirm = () => {
  dialog.confirm({
    title: '异步确认',
    content: '点击确定后会进行异步操作。',
    onOk: () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    }
  });
};
<\/script>`;

const deleteConfirmCode = `<script setup>
import { dialog } from '@/components/vort/dialog';

const showDeleteConfirm = () => {
  dialog.confirm({
    title: '确认删除',
    content: '您确定要删除这条记录吗？删除后将无法恢复。',
    okText: '删除',
    okType: 'danger',
    onOk: () => {
      console.log('删除成功');
    }
  });
};
<\/script>`;

// Props 表格数据
const propsData = [
    {
        prop: "v-model:open",
        desc: "对话框是否可见",
        type: "boolean",
        default: "false"
    },
    {
        prop: "title",
        desc: "标题",
        type: "string",
        default: "-"
    },
    {
        prop: "width",
        desc: "对话框宽度",
        type: "'small' | 'default' | 'large' | number | string",
        default: "'default' (520px)"
    },
    {
        prop: "closable",
        desc: "是否显示右上角关闭按钮",
        type: "boolean",
        default: "true"
    },
    {
        prop: "maskClosable",
        desc: "点击蒙层是否允许关闭",
        type: "boolean",
        default: "true"
    },
    {
        prop: "keyboard",
        desc: "是否支持键盘 ESC 关闭",
        type: "boolean",
        default: "true"
    },
    {
        prop: "mask",
        desc: "是否显示遮罩",
        type: "boolean",
        default: "true"
    },
    {
        prop: "centered",
        desc: "垂直居中展示",
        type: "boolean",
        default: "false"
    },
    {
        prop: "okText",
        desc: "确定按钮文字",
        type: "string",
        default: "'确定'"
    },
    {
        prop: "cancelText",
        desc: "取消按钮文字",
        type: "string",
        default: "'取消'"
    },
    {
        prop: "confirmLoading",
        desc: "确定按钮 loading 状态",
        type: "boolean",
        default: "false"
    },
    {
        prop: "footer",
        desc: "是否显示底部按钮区域",
        type: "boolean",
        default: "true"
    },
    {
        prop: "zIndex",
        desc: "对话框的 z-index",
        type: "number",
        default: "1000"
    },
    {
        prop: "contentBg",
        desc: "内容区域背景色（仅 body 区域）",
        type: "string",
        default: '"#fff"'
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "update:open",
        desc: "对话框打开/关闭状态变化时触发（v-model）",
        params: "(open: boolean) => void"
    },
    {
        event: "ok",
        desc: "点击确定按钮时触发",
        params: "() => void"
    },
    {
        event: "cancel",
        desc: "点击取消按钮或关闭图标时触发",
        params: "() => void"
    },
    {
        event: "afterClose",
        desc: "对话框完全关闭后触发",
        params: "() => void"
    }
];

// Slots 表格数据
const slotsData = [
    {
        slot: "default",
        desc: "对话框内容"
    },
    {
        slot: "title",
        desc: "自定义标题"
    },
    {
        slot: "footer",
        desc: "自定义底部按钮区域"
    }
];

// 函数式调用方法表格数据
const methodsData = [
    {
        method: "dialog.info(config)",
        desc: "信息提示对话框，单按钮（知道了）",
        return: "DialogInstance"
    },
    {
        method: "dialog.success(config)",
        desc: "成功提示对话框，单按钮（知道了）",
        return: "DialogInstance"
    },
    {
        method: "dialog.error(config)",
        desc: "错误提示对话框，单按钮（知道了）",
        return: "DialogInstance"
    },
    {
        method: "dialog.warning(config)",
        desc: "警告提示对话框，单按钮（知道了）",
        return: "DialogInstance"
    },
    {
        method: "dialog.confirm(config)",
        desc: "确认对话框，双按钮（确定/取消）",
        return: "DialogInstance"
    }
];

// DialogConfig 配置表格数据
const configData = [
    {
        prop: "title",
        desc: "标题",
        type: "string",
        default: "-"
    },
    {
        prop: "content",
        desc: "内容",
        type: "string",
        default: "-"
    },
    {
        prop: "contentBg",
        desc: "内容区域背景色（仅 body 区域）",
        type: "string",
        default: '"#fff"'
    },
    {
        prop: "width",
        desc: "对话框宽度",
        type: "number | string",
        default: "416"
    },
    {
        prop: "closable",
        desc: "是否显示关闭按钮",
        type: "boolean",
        default: "false"
    },
    {
        prop: "maskClosable",
        desc: "点击蒙层是否关闭",
        type: "boolean",
        default: "false"
    },
    {
        prop: "keyboard",
        desc: "是否支持 ESC 关闭",
        type: "boolean",
        default: "true"
    },
    {
        prop: "okText",
        desc: "确定按钮文字",
        type: "string",
        default: "'确定'"
    },
    {
        prop: "cancelText",
        desc: "取消按钮文字",
        type: "string",
        default: "'取消'"
    },
    {
        prop: "okType",
        desc: "确定按钮类型",
        type: "'primary' | 'danger'",
        default: "'primary'"
    },
    {
        prop: "centered",
        desc: "垂直居中展示",
        type: "boolean",
        default: "true"
    },
    {
        prop: "zIndex",
        desc: "z-index",
        type: "number",
        default: "1000"
    },
    {
        prop: "onOk",
        desc: "点击确定回调，返回 Promise 时显示加载状态",
        type: "() => void | Promise<void>",
        default: "-"
    },
    {
        prop: "onCancel",
        desc: "点击取消回调",
        type: "() => void",
        default: "-"
    },
    {
        prop: "afterClose",
        desc: "完全关闭后回调",
        type: "() => void",
        default: "-"
    }
];

// DialogInstance 表格数据
const instanceData = [
    {
        prop: "close",
        desc: "关闭对话框",
        type: "() => void"
    },
    {
        prop: "update",
        desc: "更新对话框配置",
        type: "(config: Partial<DialogConfig>) => void"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Dialog 对话框</h1>
            <p class="demo-page-desc">
                模态对话框，在当前页面打开一个浮层，承载相关操作。
                <strong>特色：从点击位置缩放展开/收起的动画效果。</strong>
            </p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>需要用户处理事务，又不希望跳转页面以致打断工作流程时。</li>
                <li>需要展示较多内容，或需要用户输入信息时。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本用法" description="最简单的用法，从点击位置缩放展开的动画效果。" :code="basicCode">
                    <div class="demo-btn-row">
                        <vort-button variant="primary" @click="basicOpen = true">打开对话框</vort-button>
                    </div>
                    <vort-dialog v-model:open="basicOpen" title="基础对话框" content-bg="#fff">
                        <p>这是对话框的内容。</p>
                        <p>观察打开/关闭时的缩放动画效果！</p>
                        <p>动画会从点击按钮的位置展开，关闭时缩回原位置。</p>
                    </vort-dialog>
                </DemoBox>

                <DemoBox title="异步关闭" description="点击确定后异步关闭对话框，适用于需要进行异步操作的场景。" :code="asyncCode">
                    <div class="demo-btn-row">
                        <vort-button variant="primary" @click="asyncOpen = true">异步关闭</vort-button>
                    </div>
                    <vort-dialog v-model:open="asyncOpen" title="异步关闭" :confirm-loading="confirmLoading" content-bg="#fff" @ok="handleAsyncOk">
                        <p>点击确定后，会进行异步操作，2秒后关闭。</p>
                    </vort-dialog>
                </DemoBox>

                <DemoBox
                    title="自定义宽度"
                    description="使用 width 属性设置对话框宽度。支持 'small'、'default'、'large' 预设值或自定义数值/字符串。"
                    :code="customWidthCode"
                >
                    <div class="demo-btn-row">
                        <vort-button variant="primary" @click="customWidthOpen = true">宽对话框 (800px)</vort-button>
                    </div>
                    <vort-dialog v-model:open="customWidthOpen" title="自定义宽度" width="800px" content-bg="#fff">
                        <p>这个对话框的宽度是 800px。</p>
                        <p>你也可以使用预设值：'small' (416px)、'default' (520px)、'large' (800px)。</p>
                    </vort-dialog>
                </DemoBox>

                <DemoBox title="垂直居中" description="设置 centered 属性使对话框垂直居中显示。" :code="centeredCode">
                    <div class="demo-btn-row">
                        <vort-button variant="primary" @click="centeredOpen = true">垂直居中</vort-button>
                    </div>
                    <vort-dialog v-model:open="centeredOpen" title="垂直居中" centered content-bg="#fff">
                        <p>对话框垂直居中显示。</p>
                        <p>适合内容较少的对话框。</p>
                    </vort-dialog>
                </DemoBox>

                <DemoBox title="自定义底部" description="使用 footer 插槽自定义底部按钮。" :code="customFooterCode">
                    <div class="demo-btn-row">
                        <vort-button variant="primary" @click="customFooterOpen = true">自定义底部</vort-button>
                    </div>
                    <vort-dialog v-model:open="customFooterOpen" title="自定义底部" content-bg="#fff">
                        <p>自定义底部按钮区域。</p>
                        <template #footer>
                            <vort-button @click="customFooterOpen = false">返回</vort-button>
                            <vort-button variant="primary" danger>删除</vort-button>
                            <vort-button variant="primary" @click="customFooterOpen = false">提交</vort-button>
                        </template>
                    </vort-dialog>
                </DemoBox>

                <DemoBox title="无底部按钮" description='设置 :footer="false" 不显示底部按钮区域。' :code="noFooterCode">
                    <div class="demo-btn-row">
                        <vort-button variant="primary" @click="noFooterOpen = true">无底部对话框</vort-button>
                    </div>
                    <vort-dialog v-model:open="noFooterOpen" title="无底部" :footer="false" content-bg="#fff">
                        <p>这个对话框没有底部按钮区域。</p>
                        <p>适合展示信息或自定义操作。</p>
                    </vort-dialog>
                </DemoBox>

                <DemoBox title="禁止蒙层关闭" description='设置 :mask-closable="false" 禁止点击蒙层关闭对话框。' :code="maskClosableCode">
                    <div class="demo-btn-row">
                        <vort-button variant="primary" @click="maskClosableOpen = true">禁止蒙层关闭</vort-button>
                    </div>
                    <vort-dialog v-model:open="maskClosableOpen" title="禁止蒙层关闭" :mask-closable="false" content-bg="#fff">
                        <p>点击蒙层不会关闭对话框。</p>
                        <p>只能通过关闭按钮或 ESC 键关闭。</p>
                    </vort-dialog>
                </DemoBox>

                <DemoBox
                    title="确认对话框"
                    description="使用 dialog.info()、dialog.success()、dialog.error()、dialog.warning()、dialog.confirm() 可以快捷地弹出确认框。info/success/error/warning 只有一个「知道了」按钮，confirm 有「确定」和「取消」两个按钮。"
                    :code="confirmMethodCode"
                >
                    <div class="demo-btn-row">
                        <vort-button @click="showInfo">Info</vort-button>
                        <vort-button @click="showSuccess">Success</vort-button>
                        <vort-button @click="showError">Error</vort-button>
                        <vort-button @click="showWarning">Warning</vort-button>
                        <vort-button variant="primary" @click="showConfirm">Confirm</vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="异步确认对话框" description="onOk 返回 Promise 时，会自动显示加载状态，直到 Promise resolve 后关闭。" :code="asyncConfirmCode">
                    <div class="demo-btn-row">
                        <vort-button variant="primary" @click="showAsyncConfirm">异步确认</vort-button>
                    </div>
                </DemoBox>

                <DemoBox
                    title="删除确认对话框"
                    description="使用 okType: 'danger' 可以让确定按钮显示为危险（红色）样式，适合删除等危险操作。"
                    :code="deleteConfirmCode"
                >
                    <div class="demo-btn-row">
                        <vort-button variant="primary" danger @click="showDeleteConfirm">删除确认</vort-button>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Dialog Props</h3>
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

            <h3 class="demo-api-title">Dialog Events</h3>
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

            <h3 class="demo-api-title">Dialog Slots</h3>
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

            <h3 class="demo-api-title">dialog.method()</h3>
            <p class="demo-api-desc">
                包括：<code>dialog.info</code>、<code>dialog.success</code>、<code>dialog.error</code>、<code>dialog.warning</code>、<code>dialog.confirm</code>
            </p>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>方法</th>
                        <th>说明</th>
                        <th>返回值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in methodsData" :key="item.method">
                        <td>
                            <code>{{ item.method }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.return }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">DialogConfig</h3>
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

            <h3 class="demo-api-title">DialogInstance</h3>
            <p class="demo-api-desc">调用 <code>dialog.xxx()</code> 方法会返回一个引用，可以通过该引用更新和关闭对话框。</p>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>属性</th>
                        <th>说明</th>
                        <th>类型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in instanceData" :key="item.prop">
                        <td>
                            <code>{{ item.prop }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.type }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* 特有样式 - 公共样式已在 demo.css 中定义 */

.demo-btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
</style>
