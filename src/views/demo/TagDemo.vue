<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { Twitter, Youtube, Facebook, Linkedin } from "lucide-vue-next";

// 可关闭标签状态
const tags = ref(["Tag 1", "Tag 2", "Tag 3"]);
const inputVisible = ref(false);
const inputValue = ref("");

const handleClose = (removedTag: string) => {
    tags.value = tags.value.filter((tag) => tag !== removedTag);
};

const showInput = () => {
    inputVisible.value = true;
};

const handleInputConfirm = () => {
    if (inputValue.value && tags.value.indexOf(inputValue.value) === -1) {
        tags.value.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = "";
};

// 可选中标签状态
const selectedTags = ref<string[]>(["Movies"]);
const tagsData = ["Movies", "Books", "Music", "Sports"];

const handleCheckChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags.value, tag] : selectedTags.value.filter((t) => t !== tag);
    selectedTags.value = nextSelectedTags;
};

// 拖拽排序标签状态
import type { TagItem } from "@/components/vort/tag";

const draggableTags = ref<TagItem[]>([
    { key: 1, label: "Tag 1", color: "magenta" },
    { key: 2, label: "Tag 2", color: "red" },
    { key: 3, label: "Tag 3", color: "volcano" },
    { key: 4, label: "Tag 4", color: "orange" },
    { key: 5, label: "Tag 5", color: "gold" }
]);

const draggableTagsWithClose = ref<TagItem[]>([
    { key: 1, label: "可关闭 1", color: "cyan", closable: true },
    { key: 2, label: "可关闭 2", color: "blue", closable: true },
    { key: 3, label: "可关闭 3", color: "geekblue", closable: true },
    { key: 4, label: "固定标签", color: "purple" }
]);

const handleDragEnd = (newTags: TagItem[]) => {
    console.log(
        "拖拽排序完成:",
        newTags.map((t) => t.label)
    );
};

const handleTagClose = (item: TagItem, index: number) => {
    console.log("关闭标签:", item.label, "索引:", index);
};

// 示例代码
const basicCode = `<template>
  <vort-tag>Tag 1</vort-tag>
  <vort-tag>
    <template #icon><Twitter class="w-3 h-3" /></template>
    Link
  </vort-tag>
  <vort-tag closable @close="log">Tag 2</vort-tag>
</template>`;

const colorCode = `<template>
  <!-- 预设状态颜色 -->
  <vort-tag color="success">success</vort-tag>
  <vort-tag color="processing">processing</vort-tag>
  <vort-tag color="error">error</vort-tag>
  <vort-tag color="warning">warning</vort-tag>
  <vort-tag color="default">default</vort-tag>

  <!-- 预设颜色 -->
  <vort-tag color="magenta">magenta</vort-tag>
  <vort-tag color="red">red</vort-tag>
  <vort-tag color="volcano">volcano</vort-tag>
  <vort-tag color="orange">orange</vort-tag>
  <vort-tag color="gold">gold</vort-tag>
  <vort-tag color="lime">lime</vort-tag>
  <vort-tag color="green">green</vort-tag>
  <vort-tag color="cyan">cyan</vort-tag>
  <vort-tag color="teal">teal</vort-tag>
  <vort-tag color="blue">blue</vort-tag>
  <vort-tag color="geekblue">geekblue</vort-tag>
  <vort-tag color="purple">purple</vort-tag>

  <!-- 自定义颜色 -->
  <vort-tag color="#f50">#f50</vort-tag>
  <vort-tag color="#2db7f5">#2db7f5</vort-tag>
  <vort-tag color="#87d068">#87d068</vort-tag>
  <vort-tag color="#108ee9">#108ee9</vort-tag>
</template>`;

const borderedCode = `<template>
  <vort-tag :bordered="false">Tag 1</vort-tag>
  <vort-tag :bordered="false" color="magenta">magenta</vort-tag>
  <vort-tag :bordered="false" color="red">red</vort-tag>
  <vort-tag :bordered="false" color="volcano">volcano</vort-tag>
  <vort-tag :bordered="false" color="orange">orange</vort-tag>
  <vort-tag :bordered="false" color="gold">gold</vort-tag>
  <vort-tag :bordered="false" color="lime">lime</vort-tag>
  <vort-tag :bordered="false" color="green">green</vort-tag>
  <vort-tag :bordered="false" color="cyan">cyan</vort-tag>
  <vort-tag :bordered="false" color="blue">blue</vort-tag>
  <vort-tag :bordered="false" color="geekblue">geekblue</vort-tag>
  <vort-tag :bordered="false" color="purple">purple</vort-tag>
</template>`;

const plainCode = `<template>
  <!-- 简易样式（无背景色，边框与文字同色） -->
  <vort-tag plain>plain</vort-tag>
  <vort-tag plain color="success">success</vort-tag>
  <vort-tag plain color="processing">processing</vort-tag>
  <vort-tag plain color="error">error</vort-tag>

  <!-- 白色背景（可搭配 color，边框与文字同色） -->
  <vort-tag white>white</vort-tag>
  <vort-tag white color="success">success</vort-tag>
  <vort-tag white color="processing">processing</vort-tag>
  <vort-tag white color="error">error</vort-tag>
</template>`;

const solidCode = `<template>
  <!-- 实心模式（color 作为背景和边框色，文字白色） -->
  <vort-tag solid color="success">success</vort-tag>
  <vort-tag solid color="processing">processing</vort-tag>
  <vort-tag solid color="error">error</vort-tag>
  <vort-tag solid color="warning">warning</vort-tag>
  <vort-tag solid color="teal">teal</vort-tag>
  <vort-tag solid color="blue">blue</vort-tag>
  <vort-tag solid color="#f50">#f50</vort-tag>
</template>`;

const sizeCode = `<template>
  <!-- 默认尺寸 -->
  <vort-tag>Default</vort-tag>
  <vort-tag color="processing">Processing</vort-tag>
  <vort-tag color="success" closable>Success</vort-tag>

  <!-- 小尺寸 -->
  <vort-tag size="small">Small</vort-tag>
  <vort-tag size="small" color="processing">Processing</vort-tag>
  <vort-tag size="small" color="success" closable>Success</vort-tag>
</template>`;

const dynamicCode = `<template>
  <vort-tag
    v-for="tag in tags"
    :key="tag"
    closable
    @close="handleClose(tag)"
  >
    {{ tag }}
  </vort-tag>
  <vort-input
    v-if="inputVisible"
    v-model="inputValue"
    size="small"
    style="width: 78px"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
  <vort-tag v-else @click="showInput" style="cursor: pointer">
    + New Tag
  </vort-tag>
</template>

<script setup>
const tags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
const inputVisible = ref(false);
const inputValue = ref('');

const handleClose = (removedTag) => {
  tags.value = tags.value.filter(tag => tag !== removedTag);
};

const showInput = () => {
  inputVisible.value = true;
};

const handleInputConfirm = () => {
  if (inputValue.value && tags.value.indexOf(inputValue.value) === -1) {
    tags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};
<\/script>`;

const checkableCode = `<template>
  <span class="mr-2">Categories:</span>
  <vort-checkable-tag
    v-for="tag in tagsData"
    :key="tag"
    :checked="selectedTags.includes(tag)"
    @change="(checked) => handleCheckChange(tag, checked)"
  >
    {{ tag }}
  </vort-checkable-tag>
</template>

<script setup>
const selectedTags = ref(['Movies']);
const tagsData = ['Movies', 'Books', 'Music', 'Sports'];

const handleCheckChange = (tag, checked) => {
  const nextSelectedTags = checked
    ? [...selectedTags.value, tag]
    : selectedTags.value.filter((t) => t !== tag);
  selectedTags.value = nextSelectedTags;
};
<\/script>`;

const iconCode = `<template>
  <vort-tag color="#55acee">
    <template #icon><Twitter class="w-3 h-3" /></template>
    Twitter
  </vort-tag>
  <vort-tag color="#cd201f">
    <template #icon><Youtube class="w-3 h-3" /></template>
    Youtube
  </vort-tag>
  <vort-tag color="#3b5999">
    <template #icon><Facebook class="w-3 h-3" /></template>
    Facebook
  </vort-tag>
  <vort-tag color="#55acee">
    <template #icon><Linkedin class="w-3 h-3" /></template>
    LinkedIn
  </vort-tag>
</template>`;

const draggableCode = `<template>
  <vort-draggable-tags
    v-model="draggableTags"
    @drag-end="handleDragEnd"
  />
</template>

<script setup>
import type { TagItem } from "@/components/vort/tag";

const draggableTags = ref<TagItem[]>([
  { key: 1, label: "Tag 1", color: "magenta" },
  { key: 2, label: "Tag 2", color: "red" },
  { key: 3, label: "Tag 3", color: "volcano" },
  { key: 4, label: "Tag 4", color: "orange" },
  { key: 5, label: "Tag 5", color: "gold" }
]);

const handleDragEnd = (newTags: TagItem[]) => {
  console.log("拖拽排序完成:", newTags);
};
<\/script>`;

const draggableCloseCode = `<template>
  <vort-draggable-tags
    v-model="draggableTagsWithClose"
    @drag-end="handleDragEnd"
    @close="handleTagClose"
  />
</template>

<script setup>
const draggableTagsWithClose = ref<TagItem[]>([
  { key: 1, label: "可关闭 1", color: "cyan", closable: true },
  { key: 2, label: "可关闭 2", color: "blue", closable: true },
  { key: 3, label: "可关闭 3", color: "geekblue", closable: true },
  { key: 4, label: "固定标签", color: "purple" }
]);

const handleTagClose = (item: TagItem, index: number) => {
  console.log("关闭标签:", item.label);
};
<\/script>`;

// Props 表格数据
const propsData = [
    {
        prop: "color",
        desc: "标签色：可以是预设颜色（success/processing/error/warning/default）、预设颜色名（magenta/red/volcano/orange/gold/lime/green/cyan/teal/blue/geekblue/purple）或自定义颜色值",
        type: "string",
        default: "-"
    },
    {
        prop: "closable",
        desc: "标签是否可以关闭",
        type: "boolean",
        default: "false"
    },
    {
        prop: "bordered",
        desc: "是否有边框",
        type: "boolean",
        default: "true"
    },
    {
        prop: "plain",
        desc: "简易样式（无背景色，仅文字和边框）",
        type: "boolean",
        default: "false"
    },
    {
        prop: "white",
        desc: "白色背景",
        type: "boolean",
        default: "false"
    },
    {
        prop: "solid",
        desc: "实心模式（color 作为背景和边框色，文字白色）",
        type: "boolean",
        default: "false"
    },
    {
        prop: "size",
        desc: "尺寸",
        type: "'small' | 'default'",
        default: "'default'"
    }
];

// CheckableTag Props 表格数据
const checkablePropsData = [
    {
        prop: "checked",
        desc: "设置标签的选中状态",
        type: "boolean",
        default: "false"
    }
];

// Slots 表格数据
const slotsData = [
    {
        name: "default",
        desc: "标签内容"
    },
    {
        name: "icon",
        desc: "自定义图标"
    },
    {
        name: "closeIcon",
        desc: "自定义关闭图标"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "close",
        desc: "关闭时触发的回调函数",
        params: "(e: MouseEvent) => void"
    }
];

// CheckableTag Events 表格数据
const checkableEventsData = [
    {
        event: "change",
        desc: "点击标签时触发",
        params: "(checked: boolean) => void"
    },
    {
        event: "update:checked",
        desc: "v-model 支持",
        params: "(checked: boolean) => void"
    }
];

// DraggableTags Props 表格数据
const draggablePropsData = [
    {
        prop: "modelValue / v-model",
        desc: "标签数据列表",
        type: "TagItem[]",
        default: "[]"
    },
    {
        prop: "draggable",
        desc: "是否可拖拽",
        type: "boolean",
        default: "true"
    },
    {
        prop: "bordered",
        desc: "标签是否有边框",
        type: "boolean",
        default: "true"
    }
];

// DraggableTags Events 表格数据
const draggableEventsData = [
    {
        event: "update:modelValue",
        desc: "标签顺序变化时触发",
        params: "(value: TagItem[]) => void"
    },
    {
        event: "dragEnd",
        desc: "拖拽结束时触发",
        params: "(value: TagItem[]) => void"
    },
    {
        event: "close",
        desc: "关闭标签时触发",
        params: "(item: TagItem, index: number) => void"
    }
];

// TagItem 类型说明
const tagItemData = [
    {
        prop: "key",
        desc: "标签唯一标识",
        type: "string | number",
        default: "-"
    },
    {
        prop: "label",
        desc: "标签内容",
        type: "string",
        default: "-"
    },
    {
        prop: "color",
        desc: "标签颜色",
        type: "string",
        default: "-"
    },
    {
        prop: "closable",
        desc: "是否可关闭",
        type: "boolean",
        default: "false"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Tag 标签</h1>
            <p class="demo-page-desc">进行标记和分类的小标签。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>用于标记事物的属性和维度。</li>
                <li>进行分类。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本" description="基本标签的用法，可以通过设置 closable 变为可关闭标签。" :code="basicCode">
                    <div class="flex flex-wrap items-center gap-2">
                        <vort-tag>Tag 1</vort-tag>
                        <vort-tag>
                            <template #icon>
                                <Twitter class="w-3 h-3" />
                            </template>
                            Link
                        </vort-tag>
                        <vort-tag closable @close="() => console.log('closed')">Tag 2</vort-tag>
                    </div>
                </DemoBox>

                <DemoBox
                    title="多彩标签"
                    description="我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。"
                    :code="colorCode"
                >
                    <div class="w-full">
                        <!-- 预设状态颜色 -->
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">预设状态颜色：</p>
                        <div class="flex flex-wrap items-center gap-2 mb-4">
                            <vort-tag color="success">success</vort-tag>
                            <vort-tag color="processing">processing</vort-tag>
                            <vort-tag color="error">error</vort-tag>
                            <vort-tag color="warning">warning</vort-tag>
                            <vort-tag color="default">default</vort-tag>
                        </div>

                        <!-- 预设颜色 -->
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">预设颜色：</p>
                        <div class="flex flex-wrap items-center gap-2 mb-4">
                            <vort-tag color="magenta">magenta</vort-tag>
                            <vort-tag color="red">red</vort-tag>
                            <vort-tag color="volcano">volcano</vort-tag>
                            <vort-tag color="orange">orange</vort-tag>
                            <vort-tag color="gold">gold</vort-tag>
                            <vort-tag color="lime">lime</vort-tag>
                            <vort-tag color="green">green</vort-tag>
                            <vort-tag color="cyan">cyan</vort-tag>
                            <vort-tag color="teal">teal</vort-tag>
                            <vort-tag color="blue">blue</vort-tag>
                            <vort-tag color="geekblue">geekblue</vort-tag>
                            <vort-tag color="purple">purple</vort-tag>
                        </div>

                        <!-- 自定义颜色 -->
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">自定义颜色：</p>
                        <div class="flex flex-wrap items-center gap-2">
                            <vort-tag color="#f50">#f50</vort-tag>
                            <vort-tag color="#2db7f5">#2db7f5</vort-tag>
                            <vort-tag color="#87d068">#87d068</vort-tag>
                            <vort-tag color="#108ee9">#108ee9</vort-tag>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="无边框" description="设置 bordered={false} 取消边框样式的标签。" :code="borderedCode">
                    <div class="flex flex-wrap items-center gap-2">
                        <vort-tag :bordered="false">Tag 1</vort-tag>
                        <vort-tag :bordered="false" color="magenta">magenta</vort-tag>
                        <vort-tag :bordered="false" color="red">red</vort-tag>
                        <vort-tag :bordered="false" color="volcano">volcano</vort-tag>
                        <vort-tag :bordered="false" color="orange">orange</vort-tag>
                        <vort-tag :bordered="false" color="gold">gold</vort-tag>
                        <vort-tag :bordered="false" color="lime">lime</vort-tag>
                        <vort-tag :bordered="false" color="green">green</vort-tag>
                        <vort-tag :bordered="false" color="cyan">cyan</vort-tag>
                        <vort-tag :bordered="false" color="blue">blue</vort-tag>
                        <vort-tag :bordered="false" color="geekblue">geekblue</vort-tag>
                        <vort-tag :bordered="false" color="purple">purple</vort-tag>
                    </div>
                </DemoBox>

                <DemoBox title="简易样式 / 白色背景" description="plain 属性设置简易样式（无背景色，仅文字和边框）；white 属性设置白色背景。" :code="plainCode">
                    <div class="w-full">
                        <!-- 简易样式 -->
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">简易样式（无背景色）：</p>
                        <div class="flex flex-wrap items-center gap-2 mb-4">
                            <vort-tag plain>plain</vort-tag>
                            <vort-tag plain color="success">success</vort-tag>
                            <vort-tag plain color="processing">processing</vort-tag>
                            <vort-tag plain color="error">error</vort-tag>
                            <vort-tag plain color="warning">warning</vort-tag>
                            <vort-tag plain color="magenta">magenta</vort-tag>
                            <vort-tag plain color="blue">blue</vort-tag>
                            <vort-tag plain color="green">green</vort-tag>
                        </div>

                        <!-- 白色背景 -->
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">白色背景（可搭配 color）：</p>
                        <div class="flex flex-wrap items-center gap-2 p-4 bg-gray-100 rounded">
                            <vort-tag white>white</vort-tag>
                            <vort-tag white color="success">success</vort-tag>
                            <vort-tag white color="processing">processing</vort-tag>
                            <vort-tag white color="error">error</vort-tag>
                            <vort-tag white color="teal">teal</vort-tag>
                            <vort-tag white color="blue" closable>可关闭</vort-tag>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="实心模式" description="solid 属性设置实心模式，color 作为背景和边框色，文字为白色。" :code="solidCode">
                    <div class="flex flex-wrap items-center gap-2">
                        <vort-tag solid color="success">success</vort-tag>
                        <vort-tag solid color="processing">processing</vort-tag>
                        <vort-tag solid color="error">error</vort-tag>
                        <vort-tag solid color="warning">warning</vort-tag>
                        <vort-tag solid color="teal">teal</vort-tag>
                        <vort-tag solid color="blue">blue</vort-tag>
                        <vort-tag solid color="purple">purple</vort-tag>
                        <vort-tag solid color="#f50">#f50</vort-tag>
                        <vort-tag solid color="#31c19e" closable>可关闭</vort-tag>
                    </div>
                </DemoBox>

                <DemoBox title="尺寸" description="通过 size 属性设置标签尺寸。small 尺寸高度为 16px（含边框）。" :code="sizeCode">
                    <div class="w-full">
                        <!-- 默认尺寸 -->
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">默认尺寸：</p>
                        <div class="flex flex-wrap items-center gap-2 mb-4">
                            <vort-tag>Default</vort-tag>
                            <vort-tag color="processing">Processing</vort-tag>
                            <vort-tag color="success" closable>Success</vort-tag>
                            <vort-tag color="teal">Teal</vort-tag>
                        </div>

                        <!-- 小尺寸 -->
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">小尺寸（16px）：</p>
                        <div class="flex flex-wrap items-center gap-2">
                            <vort-tag size="small">Small</vort-tag>
                            <vort-tag size="small" color="processing">Processing</vort-tag>
                            <vort-tag size="small" color="success" closable>Success</vort-tag>
                            <vort-tag size="small" color="teal">Teal</vort-tag>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="动态添加和删除" description="用数组生成一组标签，可以动态添加和删除。" :code="dynamicCode">
                    <div class="flex flex-wrap items-center gap-2">
                        <vort-tag v-for="tag in tags" :key="tag" closable @close="handleClose(tag)">
                            {{ tag }}
                        </vort-tag>
                        <vort-input
                            v-if="inputVisible"
                            v-model="inputValue"
                            size="small"
                            style="width: 78px"
                            @blur="handleInputConfirm"
                            @keyup.enter="handleInputConfirm"
                        />
                        <vort-tag v-else class="cursor-pointer bg-white border-dashed" @click="showInput"> + New Tag </vort-tag>
                    </div>
                </DemoBox>

                <DemoBox title="可选择标签" description="可通过 CheckableTag 实现类似 Checkbox 的效果，点击切换选中效果。" :code="checkableCode">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="text-[var(--vort-text)] mr-2">Categories:</span>
                        <vort-checkable-tag
                            v-for="tag in tagsData"
                            :key="tag"
                            :checked="selectedTags.includes(tag)"
                            @change="(checked: boolean) => handleCheckChange(tag, checked)"
                        >
                            {{ tag }}
                        </vort-checkable-tag>
                    </div>
                </DemoBox>

                <DemoBox title="图标按钮" description="当需要在 Tag 内嵌入 Icon 时，可以设置 icon 插槽。" :code="iconCode">
                    <div class="flex flex-wrap items-center gap-2">
                        <vort-tag color="#55acee">
                            <template #icon>
                                <Twitter class="w-3 h-3" />
                            </template>
                            Twitter
                        </vort-tag>
                        <vort-tag color="#cd201f">
                            <template #icon>
                                <Youtube class="w-3 h-3" />
                            </template>
                            Youtube
                        </vort-tag>
                        <vort-tag color="#3b5999">
                            <template #icon>
                                <Facebook class="w-3 h-3" />
                            </template>
                            Facebook
                        </vort-tag>
                        <vort-tag color="#55acee">
                            <template #icon>
                                <Linkedin class="w-3 h-3" />
                            </template>
                            LinkedIn
                        </vort-tag>
                    </div>
                </DemoBox>

                <DemoBox title="拖拽排序" description="使用 DraggableTags 组件实现标签的拖拽排序功能。拖动标签可以改变顺序。" :code="draggableCode">
                    <div class="w-full">
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">当前顺序: {{ draggableTags.map((t) => t.label).join(" → ") }}</p>
                        <vort-draggable-tags v-model="draggableTags" @drag-end="handleDragEnd" />
                    </div>
                </DemoBox>

                <DemoBox
                    title="拖拽排序 + 可关闭"
                    description="DraggableTags 同时支持拖拽排序和关闭功能，可以通过 closable 属性控制单个标签是否可关闭。"
                    :code="draggableCloseCode"
                >
                    <div class="w-full">
                        <p class="text-sm text-[var(--vort-text-secondary)] mb-3">当前标签数: {{ draggableTagsWithClose.length }}</p>
                        <vort-draggable-tags v-model="draggableTagsWithClose" @drag-end="handleDragEnd" @close="handleTagClose" />
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Tag Props</h3>
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

            <h3 class="demo-api-title">Tag Slots</h3>
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

            <h3 class="demo-api-title">Tag Events</h3>
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

            <h3 class="demo-api-title">CheckableTag Props</h3>
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
                    <tr v-for="item in checkablePropsData" :key="item.prop">
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

            <h3 class="demo-api-title">CheckableTag Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in checkableEventsData" :key="item.event">
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

            <h3 class="demo-api-title">DraggableTags Props</h3>
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
                    <tr v-for="item in draggablePropsData" :key="item.prop">
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

            <h3 class="demo-api-title">DraggableTags Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in draggableEventsData" :key="item.event">
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

            <h3 class="demo-api-title">TagItem 类型</h3>
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
                    <tr v-for="item in tagItemData" :key="item.prop">
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
