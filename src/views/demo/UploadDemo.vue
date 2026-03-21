<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { Upload, UploadDragger, Button, message } from "@/components/vort";
import type { UploadFile, UploadChangeInfo, UploadRequestOption } from "@/components/vort/upload/types";
import { UploadOutlined } from "@/components/vort/icons";

// 基础用法
const fileList1 = ref<UploadFile[]>([]);

// 文件列表（带默认文件）
const fileList2 = ref<UploadFile[]>([
    {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        uid: "-2",
        name: "yyy.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
]);

// 图片列表样式
const fileList3 = ref<UploadFile[]>([
    {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
]);

// 图片墙
const fileList4 = ref<UploadFile[]>([
    {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
]);

// 圆形图片墙
const fileList5 = ref<UploadFile[]>([
    {
        uid: "-1",
        name: "avatar.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
]);

// 拖拽上传
const fileList6 = ref<UploadFile[]>([]);

// 限制文件数量
const fileList7 = ref<UploadFile[]>([]);

// 上传前校验
const beforeUpload = (file: File): boolean => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("只能上传 JPG/PNG 文件!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("图片大小不能超过 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

// 自定义上传（模拟）
const customUpload = (options: UploadRequestOption) => {
    const { file, onProgress, onSuccess } = options;

    // 模拟上传进度
    let percent = 0;
    const timer = setInterval(() => {
        percent += 10;
        onProgress?.({ percent });

        if (percent >= 100) {
            clearInterval(timer);
            // 模拟成功
            setTimeout(() => {
                onSuccess?.({ url: URL.createObjectURL(file) }, file);
                message.success(`${file.name} 上传成功`);
            }, 200);
        }
    }, 100);
};

// 处理变化
const handleChange = (info: UploadChangeInfo) => {
    console.log("Upload change:", info);
    if (info.file.status === "done") {
        message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === "error") {
        message.error(`${info.file.name} 上传失败`);
    }
};

// 处理预览
const handlePreview = (file: UploadFile) => {
    if (file.url) {
        window.open(file.url);
    } else if (file.originFileObj) {
        window.open(URL.createObjectURL(file.originFileObj));
    }
};

// 示例代码
const basicCode = `<template>
  <Upload v-model:file-list="fileList" :custom-request="customUpload">
    <Button>
      <UploadOutlined />
      <span>Click to Upload</span>
    </Button>
  </Upload>
</template>`;

const fileListCode = `<script setup>
const fileList = ref([
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://example.com/xxx.png'
  }
]);
<\/script>

<template>
  <Upload
    v-model:file-list="fileList"
    :show-upload-list="{ showDownloadIcon: true }"
  >
    <Button>
      <UploadOutlined />
      <span>Upload</span>
    </Button>
  </Upload>
</template>`;

const pictureCode = `<template>
  <Upload
    v-model:file-list="fileList"
    list-type="picture"
    accept="image/*"
  >
    <Button>
      <UploadOutlined />
      <span>Upload</span>
    </Button>
  </Upload>
</template>`;

const pictureCardCode = `<template>
  <Upload
    v-model:file-list="fileList"
    list-type="picture-card"
    accept="image/*"
  />
</template>`;

const pictureCircleCode = `<template>
  <Upload
    v-model:file-list="fileList"
    list-type="picture-circle"
    accept="image/*"
    :max-count="1"
  />
</template>`;

const draggerCode = `<template>
  <UploadDragger v-model:file-list="fileList" multiple>
    <div class="dragger-content">
      <p class="dragger-icon">
        <UploadOutlined style="font-size: 48px; color: var(--vort-primary)" />
      </p>
      <p class="dragger-text">点击或拖拽文件到此区域上传</p>
      <p class="dragger-hint">支持单个或批量上传</p>
    </div>
  </UploadDragger>
</template>`;

const maxCountCode = `<template>
  <Upload
    v-model:file-list="fileList"
    :max-count="3"
    list-type="picture-card"
    accept="image/*"
  />
</template>`;

const beforeUploadCode = `<script setup>
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
<\/script>

<template>
  <Upload :before-upload="beforeUpload" accept="image/*">
    <Button>
      <UploadOutlined />
      <span>Upload (JPG/PNG, max 2MB)</span>
    </Button>
  </Upload>
</template>`;

// Props 表格数据
const propsData = [
    { prop: "accept", desc: "接受上传的文件类型", type: "string", default: "-" },
    { prop: "action", desc: "上传的地址", type: "string", default: "''" },
    {
        prop: "beforeUpload",
        desc: "上传文件之前的钩子，返回 false 则停止上传",
        type: "(file, fileList) => boolean | Promise",
        default: "-"
    },
    {
        prop: "customRequest",
        desc: "通过覆盖默认的上传行为，可以自定义自己的上传实现",
        type: "(options: UploadRequestOption) => void",
        default: "-"
    },
    { prop: "data", desc: "上传所需额外参数", type: "object | (file) => object", default: "-" },
    { prop: "defaultFileList", desc: "默认已上传的文件列表", type: "UploadFile[]", default: "[]" },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    { prop: "fileList (v-model)", desc: "已上传的文件列表（受控）", type: "UploadFile[]", default: "-" },
    { prop: "headers", desc: "设置上传的请求头部", type: "object", default: "-" },
    {
        prop: "listType",
        desc: "上传列表的内建样式",
        type: "'text' | 'picture' | 'picture-card' | 'picture-circle'",
        default: "'text'"
    },
    { prop: "maxCount", desc: "限制上传数量", type: "number", default: "-" },
    { prop: "method", desc: "上传请求的 HTTP 方法", type: "string", default: "'post'" },
    { prop: "multiple", desc: "是否支持多选文件", type: "boolean", default: "false" },
    { prop: "name", desc: "发送到后台的文件参数名", type: "string", default: "'file'" },
    {
        prop: "showUploadList",
        desc: "是否展示文件列表",
        type: "boolean | { showPreviewIcon, showRemoveIcon, showDownloadIcon }",
        default: "true"
    },
    { prop: "withCredentials", desc: "上传请求时是否携带 Cookie", type: "boolean", default: "false" },
    { prop: "directory", desc: "是否支持上传文件夹", type: "boolean", default: "false" }
];

// Events 表格数据
const eventsData = [
    { event: "change", desc: "文件状态改变的回调", params: "(info: UploadChangeInfo) => void" },
    { event: "preview", desc: "点击文件链接或预览图标时的回调", params: "(file: UploadFile) => void" },
    { event: "remove", desc: "点击移除文件时的回调", params: "(file: UploadFile) => void" },
    { event: "download", desc: "点击下载文件时的回调", params: "(file: UploadFile) => void" },
    { event: "drop", desc: "当文件被拖入上传区域时执行的回调", params: "(event: DragEvent) => void" }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Upload 上传</h1>
            <p class="demo-page-desc">文件选择上传和拖拽上传控件。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <p class="demo-section-desc">上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。</p>
            <ul class="demo-section-list">
                <li>当需要上传一个或多个文件时。</li>
                <li>当需要展现上传的进度时。</li>
                <li>当需要使用拖拽交互时。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基础用法" description="最简单的用法，点击上传文件。" :code="basicCode">
                    <Upload v-model:file-list="fileList1" :custom-request="customUpload" @change="handleChange">
                        <Button>
                            <UploadOutlined />
                            <span>Click to Upload</span>
                        </Button>
                    </Upload>
                </DemoBox>

                <DemoBox title="已上传文件列表" description="使用 defaultFileList 或 v-model:fileList 设置已上传的文件列表。" :code="fileListCode">
                    <Upload
                        v-model:file-list="fileList2"
                        :custom-request="customUpload"
                        :show-upload-list="{ showDownloadIcon: true }"
                        @change="handleChange"
                        @preview="handlePreview"
                    >
                        <Button>
                            <UploadOutlined />
                            <span>Upload</span>
                        </Button>
                    </Upload>
                </DemoBox>

                <DemoBox title="图片列表样式" description="设置 listType='picture' 显示缩略图。" :code="pictureCode">
                    <Upload
                        v-model:file-list="fileList3"
                        :custom-request="customUpload"
                        list-type="picture"
                        accept="image/*"
                        @change="handleChange"
                        @preview="handlePreview"
                    >
                        <Button>
                            <UploadOutlined />
                            <span>Upload</span>
                        </Button>
                    </Upload>
                </DemoBox>

                <DemoBox title="图片墙" description="设置 listType='picture-card' 显示上传列表为图片墙样式。" :code="pictureCardCode">
                    <Upload
                        v-model:file-list="fileList4"
                        :custom-request="customUpload"
                        list-type="picture-card"
                        accept="image/*"
                        @change="handleChange"
                        @preview="handlePreview"
                    />
                </DemoBox>

                <DemoBox title="圆形图片墙" description="设置 listType='picture-circle' 显示圆形的图片墙。" :code="pictureCircleCode">
                    <Upload
                        v-model:file-list="fileList5"
                        :custom-request="customUpload"
                        list-type="picture-circle"
                        accept="image/*"
                        :max-count="1"
                        @change="handleChange"
                        @preview="handlePreview"
                    />
                </DemoBox>

                <DemoBox title="拖拽上传" description="把文件拖入指定区域，完成上传，支持同时拖入多个文件。" :code="draggerCode">
                    <div style="width: 100%">
                        <UploadDragger v-model:file-list="fileList6" :custom-request="customUpload" multiple @change="handleChange">
                            <template #default>
                                <div class="dragger-content">
                                    <p class="dragger-icon">
                                        <UploadOutlined style="font-size: 48px; color: var(--vort-primary)" />
                                    </p>
                                    <p class="dragger-text">点击或拖拽文件到此区域上传</p>
                                    <p class="dragger-hint">支持单个或批量上传</p>
                                </div>
                            </template>
                        </UploadDragger>
                    </div>
                </DemoBox>

                <DemoBox title="限制上传数量" description="使用 maxCount 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件。" :code="maxCountCode">
                    <div>
                        <Upload
                            v-model:file-list="fileList7"
                            :custom-request="customUpload"
                            :max-count="3"
                            list-type="picture-card"
                            accept="image/*"
                            @change="handleChange"
                        />
                        <p class="demo-tip">最多上传 3 个文件</p>
                    </div>
                </DemoBox>

                <DemoBox title="上传前校验" description="使用 beforeUpload 在上传前进行校验，返回 false 阻止上传。" :code="beforeUploadCode">
                    <Upload :custom-request="customUpload" :before-upload="beforeUpload" accept="image/*">
                        <Button>
                            <UploadOutlined />
                            <span>Upload (JPG/PNG, max 2MB)</span>
                        </Button>
                    </Upload>
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

            <h3 class="demo-api-title">UploadFile</h3>
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
                        <td><code>uid</code></td>
                        <td>唯一标识</td>
                        <td><code>string</code></td>
                    </tr>
                    <tr>
                        <td><code>name</code></td>
                        <td>文件名</td>
                        <td><code>string</code></td>
                    </tr>
                    <tr>
                        <td><code>status</code></td>
                        <td>文件状态</td>
                        <td><code>'uploading' | 'done' | 'error' | 'removed'</code></td>
                    </tr>
                    <tr>
                        <td><code>percent</code></td>
                        <td>上传进度</td>
                        <td><code>number</code></td>
                    </tr>
                    <tr>
                        <td><code>url</code></td>
                        <td>文件URL（上传成功后）</td>
                        <td><code>string</code></td>
                    </tr>
                    <tr>
                        <td><code>thumbUrl</code></td>
                        <td>缩略图URL</td>
                        <td><code>string</code></td>
                    </tr>
                    <tr>
                        <td><code>originFileObj</code></td>
                        <td>原始文件对象</td>
                        <td><code>File</code></td>
                    </tr>
                    <tr>
                        <td><code>response</code></td>
                        <td>响应数据</td>
                        <td><code>any</code></td>
                    </tr>
                    <tr>
                        <td><code>error</code></td>
                        <td>错误信息</td>
                        <td><code>any</code></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* 特有样式 */
.demo-tip {
    margin: 8px 0 0;
    font-size: 12px;
    color: var(--vort-text-tertiary);
}

/* 拖拽上传内容 */
.dragger-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px;
}

.dragger-icon {
    margin: 0;
}

.dragger-text {
    margin: 0;
    font-size: 16px;
    color: var(--vort-text);
}

.dragger-hint {
    margin: 0;
    font-size: 14px;
    color: var(--vort-text-secondary);
}
</style>
