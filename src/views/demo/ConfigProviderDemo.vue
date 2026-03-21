<script setup lang="ts">
import { ref, computed } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { VortConfigProvider } from "@/components/vort/config-provider";
import { zhCN, enUS, type Locale } from "@/components/vort/locale";

// 响应式配置
const borderRadius = ref(8);
const colorPrimary = ref("#1456f0");

// 国际化配置
const currentLocale = ref<Locale>(zhCN);
const localeOptions = [
    { label: "中文简体", value: "zh-CN", locale: zhCN },
    { label: "English", value: "en-US", locale: enUS }
];
const setLocale = (value: string | number) => {
    const option = localeOptions.find((opt) => opt.value === value);
    if (option) {
        currentLocale.value = option.locale;
    }
};

// 预设主题色
const presetColors = [
    { name: "默认蓝", value: "#1456f0" },
    { name: "极光绿", value: "#00b96b" },
    { name: "酱紫", value: "#722ed1" },
    { name: "日落橙", value: "#fa8c16" },
    { name: "火山红", value: "#f5222d" },
    { name: "极客蓝", value: "#2f54eb" }
];

// 自动计算的圆角值
const autoRadiusSM = computed(() => Math.max(2, Math.round(borderRadius.value / 2)));
const autoRadiusLG = computed(() => Math.round(borderRadius.value * 1.5));

// 示例代码
const basicCode = `<template>
  <vort-config-provider
    :theme="{
      token: {
        borderRadius: 6,
      },
    }"
  >
    <vort-button variant="primary">按钮</vort-button>
    <vort-button>默认按钮</vort-button>
    <vort-input placeholder="输入框" style="width: 200px" />
  </vort-config-provider>
</template>`;

const colorCode = `<template>
  <vort-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
      },
    }"
  >
    <vort-button variant="primary">绿色主题</vort-button>
    <vort-button>默认按钮</vort-button>
  </vort-config-provider>
</template>`;

const radiusCode = `<script setup>
import { ref } from "vue";
const borderRadius = ref(6);
<\/script>

<template>
  <div>
    <label>圆角大小: {{ borderRadius }}px</label>
    <input type="range" v-model="borderRadius" min="0" max="20" />
  </div>

  <vort-config-provider
    :theme="{
      token: {
        borderRadius: borderRadius,
      },
    }"
  >
    <vort-button variant="primary">按钮</vort-button>
    <vort-input placeholder="输入框" />
    <vort-select :options="[{ value: '1', label: '选项一' }]" />
  </vort-config-provider>
</template>`;

const nestedCode = `<template>
  <vort-config-provider
    :theme="{
      token: {
        borderRadius: 8,
        colorPrimary: '#1677ff',
      },
    }"
  >
    <vort-button variant="primary">外层蓝色 8px</vort-button>

    <!-- 嵌套 ConfigProvider -->
    <vort-config-provider
      :theme="{
        token: {
          borderRadius: 16,
          colorPrimary: '#52c41a',
        },
      }"
    >
      <vort-button variant="primary">内层绿色 16px</vort-button>
    </vort-config-provider>
  </vort-config-provider>
</template>`;

const localeCode = `<script setup>
import { ref } from "vue";
import { zhCN, enUS } from "@/components/vort";

const currentLocale = ref(zhCN);

const switchToEnglish = () => {
  currentLocale.value = enUS;
};

const switchToChinese = () => {
  currentLocale.value = zhCN;
};
<\/script>

<template>
  <vort-config-provider :locale="currentLocale">
    <!-- 分页组件会根据 locale 显示对应语言 -->
    <vort-pagination
      :total="100"
      show-size-changer
      show-quick-jumper
      show-total-info
    />
  </vort-config-provider>
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "theme",
        desc: "主题配置对象",
        type: "{ token?: ThemeToken }",
        default: "-"
    },
    {
        prop: "locale",
        desc: "国际化语言包",
        type: "Locale",
        default: "zhCN（中文简体）"
    }
];

const tokenData = [
    {
        prop: "colorPrimary",
        desc: "主题色",
        type: "string",
        default: "#1456f0"
    },
    {
        prop: "colorPrimaryHover",
        desc: "主题色悬停态（自动计算：亮度 +10%）",
        type: "string",
        default: "自动计算"
    },
    {
        prop: "colorPrimaryActive",
        desc: "主题色激活态（自动计算：亮度 -10%）",
        type: "string",
        default: "自动计算"
    },
    {
        prop: "colorPrimaryBg",
        desc: "主题色背景（自动计算：与白色混合 90%）",
        type: "string",
        default: "自动计算"
    },
    {
        prop: "borderRadius",
        desc: "基础圆角（Button, Input, Select 等）",
        type: "number",
        default: "2"
    },
    {
        prop: "borderRadiusSM",
        desc: "小圆角（自动计算：borderRadius / 2，最小 2）",
        type: "number",
        default: "自动计算"
    },
    {
        prop: "borderRadiusLG",
        desc: "大圆角（Card, Modal 等容器，自动计算：borderRadius × 1.5）",
        type: "number",
        default: "自动计算"
    }
];

// 选项数据
const selectOptions = [
    { value: "1", label: "选项一" },
    { value: "2", label: "选项二" },
    { value: "3", label: "选项三" }
];

// 国际化演示对话框
const localeDialogOpen = ref(false);
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">ConfigProvider 全局配置</h1>
            <p class="demo-page-desc">为组件提供统一的全局化配置，支持主题定制。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <p class="demo-section-desc">ConfigProvider 使用 Vue 的 provide / inject 特性，只需在应用外围包裹一次即可全局生效。</p>
            <ul class="demo-section-list">
                <li>修改主题色（colorPrimary）</li>
                <li>修改组件圆角（borderRadius）</li>
                <li>切换国际化语言（locale）</li>
                <li>支持嵌套，内层配置会覆盖外层</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基础用法" description="通过 theme.token 配置组件的圆角。" :code="basicCode">
                    <div class="flex gap-3 items-center flex-wrap">
                        <span class="text-sm text-gray-500 shrink-0">默认（2px 圆角）：</span>
                        <vort-button variant="primary">按钮</vort-button>
                        <vort-button>默认按钮</vort-button>
                        <vort-input placeholder="输入框" style="width: 200px" />
                    </div>
                    <vort-config-provider
                        :theme="{
                            token: {
                                borderRadius: 12
                            }
                        }"
                    >
                        <div class="flex gap-3 items-center flex-wrap">
                            <span class="text-sm text-gray-500 shrink-0">ConfigProvider（12px 圆角）：</span>
                            <vort-button variant="primary">按钮</vort-button>
                            <vort-button>默认按钮</vort-button>
                            <vort-input placeholder="输入框" style="width: 200px" />
                        </div>
                    </vort-config-provider>
                </DemoBox>

                <DemoBox title="修改主题色" description="通过 colorPrimary 配置主题色，hover、active、背景等衍生色会自动计算生成。" :code="colorCode">
                    <!-- 主题色选择器 -->
                    <div class="flex gap-2 items-center">
                        <span class="text-sm text-gray-500 shrink-0">选择主题色：</span>
                        <div class="flex gap-2">
                            <button
                                v-for="color in presetColors"
                                :key="color.value"
                                class="color-preset-btn"
                                :class="{ active: colorPrimary === color.value }"
                                :style="{ backgroundColor: color.value }"
                                :title="color.name"
                                @click="colorPrimary = color.value"
                            />
                        </div>
                        <vort-color-picker v-model="colorPrimary" size="small" :disabled-alpha="true" />
                        <code class="text-xs bg-gray-100 px-2 py-1 rounded">{{ colorPrimary }}</code>
                    </div>
                    <vort-config-provider
                        :theme="{
                            token: {
                                colorPrimary: colorPrimary
                            }
                        }"
                    >
                        <div class="flex gap-3 items-center flex-wrap">
                            <vort-button variant="primary">主按钮</vort-button>
                            <vort-button>默认按钮</vort-button>
                            <vort-button variant="plain">朴素按钮</vort-button>
                            <vort-button variant="dashed">虚线按钮</vort-button>
                            <vort-button variant="link">链接按钮</vort-button>
                        </div>
                        <div class="flex gap-3 items-center flex-wrap">
                            <vort-input placeholder="输入框" style="width: 160px" />
                            <vort-select :options="selectOptions" placeholder="选择框" style="width: 140px" />
                            <vort-checkbox>复选框</vort-checkbox>
                            <vort-switch />
                        </div>
                    </vort-config-provider>
                </DemoBox>

                <DemoBox
                    title="动态圆角"
                    description="通过滑块动态调整圆角大小，SM 和 LG 圆角会自动计算（SM = radius/2，LG = radius×1.5）。"
                    :code="radiusCode"
                >
                    <div class="flex gap-6 items-center flex-wrap">
                        <div class="flex gap-3 items-center">
                            <label class="text-sm text-gray-600 whitespace-nowrap">基础圆角:</label>
                            <vort-slider v-model="borderRadius" :min="0" :max="24" style="width: 128px; flex: none" />
                            <code class="text-xs bg-gray-100 px-2 py-1 rounded">{{ borderRadius }}px</code>
                        </div>
                        <div class="flex gap-4 text-xs text-gray-500">
                            <span
                                >SM: <code class="bg-gray-100 px-1.5 py-0.5 rounded">{{ autoRadiusSM }}px</code></span
                            >
                            <span
                                >LG: <code class="bg-gray-100 px-1.5 py-0.5 rounded">{{ autoRadiusLG }}px</code></span
                            >
                        </div>
                    </div>
                    <vort-config-provider
                        :theme="{
                            token: {
                                borderRadius: borderRadius
                            }
                        }"
                    >
                        <div class="flex gap-3 items-center flex-wrap">
                            <vort-button variant="primary">主按钮</vort-button>
                            <vort-button>默认按钮</vort-button>
                            <vort-button variant="dashed">虚线按钮</vort-button>
                            <vort-input placeholder="输入框" style="width: 160px" />
                            <vort-select :options="selectOptions" placeholder="选择框" style="width: 140px" />
                        </div>
                        <div class="demo-radius-showcase">
                            <div class="radius-card" :style="{ borderRadius: autoRadiusSM + 'px' }">
                                <span class="radius-label">SM 圆角</span>
                                <span class="radius-value">{{ autoRadiusSM }}px</span>
                            </div>
                            <div class="radius-card" :style="{ borderRadius: borderRadius + 'px' }">
                                <span class="radius-label">基础圆角</span>
                                <span class="radius-value">{{ borderRadius }}px</span>
                            </div>
                            <div class="radius-card radius-card-lg" :style="{ borderRadius: autoRadiusLG + 'px' }">
                                <span class="radius-label">LG 圆角</span>
                                <span class="radius-value">{{ autoRadiusLG }}px</span>
                            </div>
                        </div>
                    </vort-config-provider>
                </DemoBox>

                <DemoBox title="嵌套配置" description="ConfigProvider 支持嵌套，内层配置会覆盖外层配置。" :code="nestedCode">
                    <vort-config-provider
                        :theme="{
                            token: {
                                borderRadius: 4,
                                colorPrimary: '#1677ff'
                            }
                        }"
                    >
                        <div class="flex gap-3 items-center flex-wrap">
                            <span class="text-sm text-gray-500 shrink-0">外层（蓝色 4px）：</span>
                            <vort-button variant="primary">外层按钮</vort-button>
                            <vort-button>默认按钮</vort-button>
                            <vort-input placeholder="外层输入框" style="width: 160px" />
                        </div>

                        <!-- 嵌套 ConfigProvider -->
                        <vort-config-provider
                            :theme="{
                                token: {
                                    borderRadius: 20,
                                    colorPrimary: '#52c41a'
                                }
                            }"
                        >
                            <div class="flex gap-3 items-center flex-wrap">
                                <span class="text-sm text-gray-500 shrink-0">内层（绿色 20px）：</span>
                                <vort-button variant="primary">内层按钮</vort-button>
                                <vort-button>默认按钮</vort-button>
                                <vort-input placeholder="内层输入框" style="width: 160px" />
                            </div>
                        </vort-config-provider>
                    </vort-config-provider>
                </DemoBox>

                <DemoBox
                    title="国际化 (i18n)"
                    description="通过 locale 属性配置组件的语言。内置 zhCN（中文简体）和 enUS（英文）两种语言包。"
                    :code="localeCode"
                >
                    <div class="flex gap-3 items-center flex-wrap mb-4">
                        <span class="text-sm text-gray-500 shrink-0">选择语言：</span>
                        <vort-segmented
                            :value="currentLocale.locale"
                            :options="localeOptions.map((opt) => ({ label: opt.label, value: opt.value }))"
                            @change="setLocale"
                        />
                        <code class="text-xs bg-gray-100 px-2 py-1 rounded">{{ currentLocale.locale }}</code>
                    </div>
                    <vort-config-provider :locale="currentLocale">
                        <div class="demo-locale-showcase">
                            <div class="demo-locale-item">
                                <span class="demo-locale-label">Pagination 分页：</span>
                                <vort-pagination :total="100" show-size-changer show-quick-jumper show-total-info />
                            </div>
                            <div class="demo-locale-item">
                                <span class="demo-locale-label">Table 表格（空数据）：</span>
                                <vort-table
                                    :columns="[
                                        { title: 'ID', dataIndex: 'id' },
                                        { title: 'Name', dataIndex: 'name' }
                                    ]"
                                    :data-source="[]"
                                    :pagination="false"
                                    :min-height="120"
                                />
                            </div>
                            <div class="demo-locale-item">
                                <span class="demo-locale-label">Dialog 对话框：</span>
                                <vort-button @click="() => (localeDialogOpen = true)">打开对话框</vort-button>
                                <vort-dialog v-model:open="localeDialogOpen" title="国际化对话框">
                                    <p>对话框底部按钮文字会根据语言自动切换。</p>
                                </vort-dialog>
                            </div>
                            <div class="demo-locale-item">
                                <span class="demo-locale-label">Popconfirm 气泡确认框：</span>
                                <vort-popconfirm title="确认删除此项吗？" description="删除后不可恢复">
                                    <vort-button>删除</vort-button>
                                </vort-popconfirm>
                            </div>
                        </div>
                    </vort-config-provider>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">ConfigProvider Props</h3>
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

            <h3 class="demo-api-title">ThemeToken</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tokenData" :key="item.prop">
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

<style scoped>
/* ===== 特有样式 ===== */

/* Demo 布局辅助 */
.demo-btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

/* 主题色选择器 */
.color-preset-btn {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
}

.color-preset-btn:hover {
    transform: scale(1.1);
}

.color-preset-btn.active {
    border-color: var(--vort-text);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

/* 圆角演示卡片 */
.demo-radius-showcase {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.radius-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 80px;
    background: linear-gradient(135deg, var(--vort-primary-bg, #f0f5ff) 0%, #fff 100%);
    border: 1px solid var(--vort-border-secondary);
    transition: border-radius 0.2s;
}

.radius-card-lg {
    width: 140px;
    height: 100px;
}

.radius-label {
    font-size: 12px;
    color: var(--vort-text-secondary);
    margin-bottom: 4px;
}

.radius-value {
    font-size: 18px;
    font-weight: 600;
    color: var(--vort-primary, #1456f0);
}

/* 国际化演示 */
.demo-locale-showcase {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.demo-locale-item {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.demo-locale-label {
    font-size: 13px;
    color: var(--vort-text-secondary);
    font-weight: 500;
}
</style>
