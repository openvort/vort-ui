<script setup lang="ts">
import { ref, computed } from "vue";
import { Copy, Check } from "lucide-vue-next";
import DemoBox from "./components/DemoBox.vue";

// 导入所有 vort 图标
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CalendarOutlined,
    CaretDownFilled,
    CaretUpFilled,
    CheckCircleFilled,
    CheckOutlined,
    ChevronLeftOutlined,
    ChevronRightOutlined,
    ClockCircleOutlined,
    CloseCircleFilled,
    CloseOutlined,
    DeleteOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    DownloadOutlined,
    DownOutlined,
    EditOutlined,
    EmptyOutlined,
    ExclamationCircleFilled,
    EyeInvisibleOutlined,
    EyeOutlined,
    FileOutlined,
    ImageBrokenOutlined,
    ImageOutlined,
    InboxOutlined,
    InfoCircleFilled,
    LeftOutlined,
    LikeOutlined,
    LoadingOutlined,
    MinusOutlined,
    PaperClipOutlined,
    PictureOutlined,
    PlusOutlined,
    QuestionOutlined,
    RightOutlined,
    SearchOutlined,
    UpOutlined,
    UploadOutlined
} from "@/components/vort/icons";

// 图标分类配置
const iconCategories = [
    {
        title: "方向类图标",
        desc: "用于表示方向、导航的图标",
        icons: [
            { name: "ArrowDownOutlined", component: ArrowDownOutlined },
            { name: "ArrowUpOutlined", component: ArrowUpOutlined },
            { name: "CaretDownFilled", component: CaretDownFilled },
            { name: "CaretUpFilled", component: CaretUpFilled },
            { name: "ChevronLeftOutlined", component: ChevronLeftOutlined },
            { name: "ChevronRightOutlined", component: ChevronRightOutlined },
            { name: "DoubleLeftOutlined", component: DoubleLeftOutlined },
            { name: "DoubleRightOutlined", component: DoubleRightOutlined },
            { name: "DownOutlined", component: DownOutlined },
            { name: "LeftOutlined", component: LeftOutlined },
            { name: "RightOutlined", component: RightOutlined },
            { name: "UpOutlined", component: UpOutlined }
        ]
    },
    {
        title: "操作类图标",
        desc: "用于表示用户操作的图标",
        icons: [
            { name: "CheckOutlined", component: CheckOutlined },
            { name: "CloseOutlined", component: CloseOutlined },
            { name: "DeleteOutlined", component: DeleteOutlined },
            { name: "EditOutlined", component: EditOutlined },
            { name: "MinusOutlined", component: MinusOutlined },
            { name: "PlusOutlined", component: PlusOutlined },
            { name: "SearchOutlined", component: SearchOutlined }
        ]
    },
    {
        title: "反馈类图标",
        desc: "用于表示状态反馈的图标",
        icons: [
            { name: "CheckCircleFilled", component: CheckCircleFilled },
            { name: "CloseCircleFilled", component: CloseCircleFilled },
            { name: "ExclamationCircleFilled", component: ExclamationCircleFilled },
            { name: "InfoCircleFilled", component: InfoCircleFilled },
            { name: "LoadingOutlined", component: LoadingOutlined },
            { name: "QuestionOutlined", component: QuestionOutlined }
        ]
    },
    {
        title: "文件类图标",
        desc: "用于表示文件、上传下载的图标",
        icons: [
            { name: "DownloadOutlined", component: DownloadOutlined },
            { name: "FileOutlined", component: FileOutlined },
            { name: "ImageBrokenOutlined", component: ImageBrokenOutlined },
            { name: "ImageOutlined", component: ImageOutlined },
            { name: "InboxOutlined", component: InboxOutlined },
            { name: "PaperClipOutlined", component: PaperClipOutlined },
            { name: "PictureOutlined", component: PictureOutlined },
            { name: "UploadOutlined", component: UploadOutlined }
        ]
    },
    {
        title: "其他图标",
        desc: "其他通用图标",
        icons: [
            { name: "CalendarOutlined", component: CalendarOutlined },
            { name: "ClockCircleOutlined", component: ClockCircleOutlined },
            { name: "EmptyOutlined", component: EmptyOutlined },
            { name: "EyeInvisibleOutlined", component: EyeInvisibleOutlined },
            { name: "EyeOutlined", component: EyeOutlined },
            { name: "LikeOutlined", component: LikeOutlined }
        ]
    }
];

// 搜索关键词
const searchKeyword = ref("");

// 过滤后的图标分类
const filteredCategories = computed(() => {
    if (!searchKeyword.value) return iconCategories;

    const keyword = searchKeyword.value.toLowerCase();
    return iconCategories
        .map((category) => ({
            ...category,
            icons: category.icons.filter((icon) => icon.name.toLowerCase().includes(keyword))
        }))
        .filter((category) => category.icons.length > 0);
});

// 所有图标数量
const totalIconCount = computed(() => iconCategories.reduce((sum, cat) => sum + cat.icons.length, 0));

// 复制状态管理
const copiedIcon = ref<string | null>(null);

// 复制图标导入代码
const copyIconImport = async (iconName: string) => {
    const importCode = `import { ${iconName} } from "@/components/vort/icons";`;
    await navigator.clipboard.writeText(importCode);
    copiedIcon.value = iconName;
    setTimeout(() => {
        copiedIcon.value = null;
    }, 2000);
};

// 示例代码
const basicCode = `<script setup lang="ts">
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined } from "@/components/vort/icons";
<\/script>

<template>
    <CheckCircleFilled class="text-green-500" />
    <CloseCircleFilled class="text-red-500" />
    <LoadingOutlined class="animate-spin text-blue-500" />
</template>`;

const sizeCode = `<template>
    <!-- 使用 Tailwind 类控制大小 -->
    <CheckCircleFilled class="w-4 h-4" />
    <CheckCircleFilled class="w-6 h-6" />
    <CheckCircleFilled class="w-8 h-8" />

    <!-- 使用内联样式 -->
    <CheckCircleFilled style="width: 32px; height: 32px;" />
</template>`;

const colorCode = `<template>
    <!-- 使用 Tailwind 颜色类 -->
    <CheckCircleFilled class="text-green-500" />
    <CloseCircleFilled class="text-red-500" />
    <InfoCircleFilled class="text-blue-500" />
    <ExclamationCircleFilled class="text-yellow-500" />

    <!-- 使用 CSS 变量 -->
    <CheckCircleFilled class="text-[var(--vort-success)]" />

    <!-- 使用内联样式 -->
    <CheckCircleFilled style="color: #52c41a;" />
</template>`;

const animationCode = `<template>
    <!-- 旋转动画（用于 loading） -->
    <LoadingOutlined class="animate-spin" />

    <!-- 脉冲动画 -->
    <CheckCircleFilled class="animate-pulse text-green-500" />

    <!-- 弹跳动画 -->
    <ExclamationCircleFilled class="animate-bounce text-yellow-500" />
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "class",
        desc: "自定义类名，可使用 Tailwind 工具类控制大小和颜色",
        type: "string",
        default: "-"
    },
    {
        prop: "style",
        desc: "自定义内联样式",
        type: "CSSProperties",
        default: "-"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Vort Icons 图标库</h1>
            <p class="demo-page-desc">
                Vort 组件库内置的 SVG 图标集合，共
                <strong>{{ totalIconCount }}</strong>
                个图标。所有图标均为 Vue 组件形式，支持通过 class 和 style 自定义样式。
            </p>
        </header>

        <!-- 搜索栏 -->
        <section class="demo-page-section">
            <div class="icon-search-box">
                <SearchOutlined class="icon-search-icon" />
                <input v-model="searchKeyword" type="text" class="icon-search-input" placeholder="搜索图标名称..." />
            </div>
        </section>

        <!-- 图标展示 -->
        <section v-for="category in filteredCategories" :key="category.title" class="demo-page-section">
            <h2 class="demo-section-title">{{ category.title }}</h2>
            <p class="demo-section-desc">{{ category.desc }}</p>

            <div class="icon-grid">
                <div v-for="icon in category.icons" :key="icon.name" class="icon-card" @click="copyIconImport(icon.name)">
                    <div class="icon-card-preview">
                        <component :is="icon.component" class="icon-preview" :class="{ 'animate-spin': icon.name === 'LoadingOutlined' }" />
                    </div>
                    <div class="icon-card-name">{{ icon.name }}</div>
                    <div class="icon-card-copy">
                        <Check v-if="copiedIcon === icon.name" class="w-3.5 h-3.5 text-green-500" />
                        <Copy v-else class="w-3.5 h-3.5" />
                    </div>
                </div>
            </div>
        </section>

        <!-- 无搜索结果 -->
        <section v-if="filteredCategories.length === 0" class="demo-page-section">
            <div class="icon-empty">
                <EmptyOutlined class="icon-empty-icon" />
                <p>没有找到匹配的图标</p>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基础用法" description="导入图标组件后直接使用，可通过 class 设置颜色。" :code="basicCode">
                    <div class="flex items-center gap-4">
                        <CheckCircleFilled class="w-6 h-6 text-green-500" />
                        <CloseCircleFilled class="w-6 h-6 text-red-500" />
                        <LoadingOutlined class="w-6 h-6 animate-spin text-blue-500" />
                    </div>
                </DemoBox>

                <DemoBox title="图标尺寸" description="通过 Tailwind 类或内联样式控制图标大小。" :code="sizeCode">
                    <div class="flex items-center gap-4">
                        <CheckCircleFilled class="w-4 h-4 text-green-500" />
                        <CheckCircleFilled class="w-6 h-6 text-green-500" />
                        <CheckCircleFilled class="w-8 h-8 text-green-500" />
                        <CheckCircleFilled style="width: 40px; height: 40px" class="text-green-500" />
                    </div>
                </DemoBox>

                <DemoBox title="图标颜色" description="使用 Tailwind 颜色类、CSS 变量或内联样式设置颜色。" :code="colorCode">
                    <div class="flex items-center gap-4">
                        <CheckCircleFilled class="w-6 h-6 text-green-500" />
                        <CloseCircleFilled class="w-6 h-6 text-red-500" />
                        <InfoCircleFilled class="w-6 h-6 text-blue-500" />
                        <ExclamationCircleFilled class="w-6 h-6 text-yellow-500" />
                        <QuestionOutlined class="w-6 h-6 text-gray-500" />
                    </div>
                </DemoBox>

                <DemoBox title="动画效果" description="结合 Tailwind 动画类创建动画效果。" :code="animationCode">
                    <div class="flex items-center gap-6">
                        <div class="flex flex-col items-center gap-2">
                            <LoadingOutlined class="w-6 h-6 animate-spin text-blue-500" />
                            <span class="text-xs text-gray-500">spin</span>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <CheckCircleFilled class="w-6 h-6 animate-pulse text-green-500" />
                            <span class="text-xs text-gray-500">pulse</span>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <ExclamationCircleFilled class="w-6 h-6 animate-bounce text-yellow-500" />
                            <span class="text-xs text-gray-500">bounce</span>
                        </div>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Props</h3>
            <p class="demo-section-desc">所有图标组件都是标准的 SVG 组件，支持所有 SVG 元素的原生属性。</p>
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
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">图标使用场景</h2>
            <div class="usage-table">
                <table class="demo-api-table">
                    <thead>
                        <tr>
                            <th>图标</th>
                            <th>名称</th>
                            <th>使用场景</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <LoadingOutlined class="w-4 h-4 animate-spin" />
                            </td>
                            <td><code>LoadingOutlined</code></td>
                            <td>Button、Spin、Table 等组件的加载状态</td>
                        </tr>
                        <tr>
                            <td>
                                <CheckCircleFilled class="w-4 h-4 text-green-500" />
                            </td>
                            <td><code>CheckCircleFilled</code></td>
                            <td>Message、FormItem 成功状态</td>
                        </tr>
                        <tr>
                            <td>
                                <CloseCircleFilled class="w-4 h-4 text-red-500" />
                            </td>
                            <td><code>CloseCircleFilled</code></td>
                            <td>Message、FormItem 错误状态</td>
                        </tr>
                        <tr>
                            <td>
                                <ExclamationCircleFilled class="w-4 h-4 text-yellow-500" />
                            </td>
                            <td><code>ExclamationCircleFilled</code></td>
                            <td>Message、FormItem 警告状态</td>
                        </tr>
                        <tr>
                            <td>
                                <InfoCircleFilled class="w-4 h-4 text-blue-500" />
                            </td>
                            <td><code>InfoCircleFilled</code></td>
                            <td>Message 信息提示</td>
                        </tr>
                        <tr>
                            <td>
                                <QuestionOutlined class="w-4 h-4" />
                            </td>
                            <td><code>QuestionOutlined</code></td>
                            <td>FormItem tooltip 帮助提示</td>
                        </tr>
                        <tr>
                            <td>
                                <span class="flex gap-0.5">
                                    <CaretUpFilled class="w-3 h-3" />
                                    <CaretDownFilled class="w-3 h-3" />
                                </span>
                            </td>
                            <td><code>CaretUpFilled / CaretDownFilled</code></td>
                            <td>Table 列排序</td>
                        </tr>
                        <tr>
                            <td>
                                <EmptyOutlined class="w-4 h-4" />
                            </td>
                            <td><code>EmptyOutlined</code></td>
                            <td>Table 空状态</td>
                        </tr>
                        <tr>
                            <td>
                                <ImageOutlined class="w-4 h-4" />
                            </td>
                            <td><code>ImageOutlined</code></td>
                            <td>Image 加载中占位</td>
                        </tr>
                        <tr>
                            <td>
                                <ImageBrokenOutlined class="w-4 h-4" />
                            </td>
                            <td><code>ImageBrokenOutlined</code></td>
                            <td>Image 加载失败状态</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">注意事项</h2>
            <ul class="demo-section-list">
                <li>
                    所有图标组件从
                    <code>@/components/vort/icons</code>
                    导入
                </li>
                <li>
                    图标默认使用
                    <code>currentColor</code>
                    作为填充色，会继承父元素的文字颜色
                </li>
                <li>图标组件不包含默认尺寸，需要通过 class 或 style 指定</li>
                <li>
                    推荐使用 Tailwind 工具类（如
                    <code>w-4 h-4</code>
                    ）控制图标大小
                </li>
                <li>点击上方图标卡片可快速复制 import 语句</li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
/* 特有样式 */

.demo-page-desc strong {
    color: var(--vort-primary);
    font-weight: 600;
}

.demo-section-list code {
    padding: 2px 6px;
    font-size: 13px;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    font-family: "SF Mono", "Fira Code", "Consolas", monospace;
}

/* 搜索框 */
.icon-search-box {
    position: relative;
    max-width: 400px;
}

.icon-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: var(--vort-text-tertiary);
}

.icon-search-input {
    width: 100%;
    height: 40px;
    padding: 0 16px 0 40px;
    font-size: 14px;
    border: 1px solid var(--vort-border);
    border-radius: 8px;
    outline: none;
    transition: all 0.2s;
}

.icon-search-input:focus {
    border-color: var(--vort-primary);
    box-shadow: 0 0 0 2px rgba(var(--vort-primary-rgb), 0.1);
}

/* 图标网格 */
.icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
}

.icon-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 12px 12px;
    background: var(--vort-bg-elevated);
    border: 1px solid var(--vort-border-secondary);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.icon-card:hover {
    border-color: var(--vort-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.icon-card-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
}

.icon-preview {
    width: 28px;
    height: 28px;
    color: var(--vort-text);
}

.icon-card:hover .icon-preview {
    color: var(--vort-primary);
}

.icon-card-name {
    font-size: 12px;
    color: var(--vort-text-secondary);
    text-align: center;
    word-break: break-all;
    line-height: 1.4;
}

.icon-card-copy {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: var(--vort-text-tertiary);
    opacity: 0;
    transition: opacity 0.2s;
}

.icon-card:hover .icon-card-copy {
    opacity: 1;
}

/* 空状态 */
.icon-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: var(--vort-text-tertiary);
}

.icon-empty-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
}

.usage-table {
    overflow-x: auto;
}
</style>
