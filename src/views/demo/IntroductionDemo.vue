<script setup lang="ts">
/**
 * Vort UI 介绍页面
 */
import { ref } from "vue";
import {
    Component,
    Zap,
    Palette,
    Code2,
    Layers,
    Sparkles,
    Table2,
    PanelRight,
    MousePointer2,
    Combine,
    FileInput,
    Eye,
    Settings2,
    ListTree,
    TestTube2
} from "lucide-vue-next";

// Dialog 演示
const dialogVisible = ref(false);

// Drawer 演示
const drawerVisible = ref(false);
const nestedDrawerVisible = ref(false);
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Vort UI</h1>
            <p class="demo-page-desc">融合 Ant Design 精致视觉与 Element Plus 开发体验的企业级 Vue 3 组件库</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">设计理念</h2>
            <p class="demo-section-desc">
                Vort UI 取两家之长：采用 <strong>Ant Design 5.x</strong> 的设计规范和精致动效， 同时保留 <strong>Element Plus</strong> 熟悉的 API
                设计和国内开发者的使用习惯， 为后台管理系统提供开箱即用的高质量组件。
            </p>
            <div class="design-philosophy">
                <div class="philosophy-item">
                    <div class="philosophy-label">视觉设计</div>
                    <div class="philosophy-source">Ant Design 5.x</div>
                    <div class="philosophy-desc">精致的视觉风格、优雅的色彩体系、细腻的交互动效</div>
                </div>
                <div class="philosophy-divider">+</div>
                <div class="philosophy-item">
                    <div class="philosophy-label">开发体验</div>
                    <div class="philosophy-source">Element Plus</div>
                    <div class="philosophy-desc">直观的 API 设计、模板式组件用法、符合国内开发习惯</div>
                </div>
                <div class="philosophy-divider">=</div>
                <div class="philosophy-item philosophy-result">
                    <div class="philosophy-label">Vort UI</div>
                    <div class="philosophy-desc">美观与易用兼得的企业级组件库</div>
                </div>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">核心特色</h2>
            <div class="highlight-grid">
                <!-- 来自 Element Plus 的特性 -->
                <div class="highlight-card highlight-element">
                    <div class="highlight-badge">Element Plus 风格</div>
                    <div class="highlight-icon">
                        <Table2 class="w-6 h-6" />
                    </div>
                    <h3 class="highlight-title">TableColumn 模板式配置</h3>
                    <p class="highlight-desc">
                        支持使用 <code>&lt;vort-table-column&gt;</code> 子组件配置表格列， 通过插槽自定义单元格内容，支持多级表头嵌套。
                    </p>
                    <pre class="highlight-code" v-pre><code>&lt;vort-table :data-source="data"&gt;
  &lt;vort-table-column prop="name" label="姓名" /&gt;
  &lt;vort-table-column prop="age" label="年龄"&gt;
    &lt;template #default="{ row }"&gt;
      {{ row.age }} 岁
    &lt;/template&gt;
  &lt;/vort-table-column&gt;
&lt;/vort-table&gt;</code></pre>
                </div>

                <!-- 来自 Ant Design 的特性 -->
                <div class="highlight-card highlight-antd">
                    <div class="highlight-badge">Ant Design 风格</div>
                    <div class="highlight-icon">
                        <MousePointer2 class="w-6 h-6" />
                    </div>
                    <h3 class="highlight-title">点击位置缩放动画</h3>
                    <p class="highlight-desc">Dialog 弹窗从鼠标点击位置展开/收起，带来自然流畅的交互体验。 动画 origin 跟随点击坐标，视觉焦点过渡平滑。</p>
                    <div class="highlight-demo">
                        <vort-button type="primary" @click="dialogVisible = true">体验弹窗动画</vort-button>
                        <span class="highlight-demo-tip">点击按钮，观察弹窗从点击位置展开</span>
                    </div>
                </div>

                <div class="highlight-card highlight-antd">
                    <div class="highlight-badge">Ant Design 风格</div>
                    <div class="highlight-icon">
                        <PanelRight class="w-6 h-6" />
                    </div>
                    <h3 class="highlight-title">抽屉嵌套推移动画</h3>
                    <p class="highlight-desc">打开嵌套抽屉时，父级抽屉自动向外偏移，形成层级感。 支持四个方向（上/右/下/左），偏移距离可配置。</p>
                    <div class="highlight-demo">
                        <vort-button @click="drawerVisible = true">体验嵌套抽屉</vort-button>
                        <span class="highlight-demo-tip">打开抽屉后再打开嵌套抽屉</span>
                    </div>
                </div>

                <div class="highlight-card highlight-vort">
                    <div class="highlight-badge">Vort 特色</div>
                    <div class="highlight-icon">
                        <Palette class="w-6 h-6" />
                    </div>
                    <h3 class="highlight-title">CSS 变量主题系统</h3>
                    <p class="highlight-desc">
                        通过 ConfigProvider 设置主色，自动计算 hover/active/背景等衍生色。 纯 CSS 方案，无 JS 运行时开销，支持运行时动态切换。
                    </p>
                    <pre class="highlight-code"><code>&lt;vort-config-provider :theme="{
  token: {
    colorPrimary: '#00b96b',
    borderRadius: 8
  }
}"&gt;
  &lt;!-- 子组件自动应用主题 --&gt;
&lt;/vort-config-provider&gt;</code></pre>
                </div>

                <div class="highlight-card highlight-vort">
                    <div class="highlight-badge">Vort 特色</div>
                    <div class="highlight-icon">
                        <Settings2 class="w-6 h-6" />
                    </div>
                    <h3 class="highlight-title">50+ Design Token 配置</h3>
                    <p class="highlight-desc">
                        ConfigProvider 支持 50+ Token 配置：主题色、功能色、间距、阴影、动画时长、层级等。 设置一个主色自动生成完整色板，支持暗色模式。
                    </p>
                    <pre class="highlight-code"><code>token: {
  colorPrimary: '#722ed1',
  colorSuccess: '#13c2c2',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  motionDurationMid: 250
}</code></pre>
                </div>

                <div class="highlight-card highlight-vort">
                    <div class="highlight-badge">Vort 特色</div>
                    <div class="highlight-icon">
                        <ListTree class="w-6 h-6" />
                    </div>
                    <h3 class="highlight-title">虚拟滚动支持</h3>
                    <p class="highlight-desc">Table 组件支持虚拟滚动，轻松渲染万级数据量。基于 @tanstack/vue-virtual， 只渲染可视区域行，滚动流畅无卡顿。</p>
                    <pre class="highlight-code"><code>&lt;vort-table
  :data-source="bigData"
  :scroll="{ y: 400 }"
  virtual
  :virtual-row-height="48"
/&gt;</code></pre>
                </div>

                <div class="highlight-card highlight-vort">
                    <div class="highlight-badge">Vort 特色</div>
                    <div class="highlight-icon">
                        <TestTube2 class="w-6 h-6" />
                    </div>
                    <h3 class="highlight-title">635+ 单元测试</h3>
                    <p class="highlight-desc">
                        核心组件 100% 测试覆盖，包含 Button、Input、Select、Form、Table、Dialog 等 15+ 组件。 使用 Vitest + Vue Test Utils，确保代码质量。
                    </p>
                    <div class="highlight-stats">
                        <div class="stat-item">
                            <span class="stat-value">635+</span>
                            <span class="stat-label">测试用例</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">15+</span>
                            <span class="stat-label">已测组件</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">100%</span>
                            <span class="stat-label">类型覆盖</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">更多特性</h2>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <Component class="w-6 h-6" />
                    </div>
                    <h3 class="feature-title">40+ 高质量组件</h3>
                    <p class="feature-desc">覆盖表单、数据展示、导航、反馈等场景，满足后台管理系统的各种需求</p>
                </div>

                <div class="feature-card">
                    <div class="feature-icon">
                        <Zap class="w-6 h-6" />
                    </div>
                    <h3 class="feature-title">自动按需导入</h3>
                    <p class="feature-desc">配合 unplugin-vue-components，组件自动按需引入，无需手动 import</p>
                </div>

                <div class="feature-card">
                    <div class="feature-icon">
                        <Code2 class="w-6 h-6" />
                    </div>
                    <h3 class="feature-title">完整 TypeScript 支持</h3>
                    <p class="feature-desc">所有组件使用 TypeScript 编写，提供完整的类型定义和 IDE 智能提示</p>
                </div>

                <div class="feature-card">
                    <div class="feature-icon">
                        <Layers class="w-6 h-6" />
                    </div>
                    <h3 class="feature-title">基于 Radix Vue</h3>
                    <p class="feature-desc">底层使用 Radix Vue 无样式组件，确保可访问性和键盘导航支持</p>
                </div>

                <div class="feature-card">
                    <div class="feature-icon">
                        <Sparkles class="w-6 h-6" />
                    </div>
                    <h3 class="feature-title">系统化动画令牌</h3>
                    <p class="feature-desc">统一的动画时长、缓动曲线、关键帧定义，确保全局动效体验一致</p>
                </div>

                <div class="feature-card">
                    <div class="feature-icon">
                        <Eye class="w-6 h-6" />
                    </div>
                    <h3 class="feature-title">无障碍访问</h3>
                    <p class="feature-desc">支持键盘导航、屏幕阅读器，尊重用户「减少动画」偏好设置</p>
                </div>

                <div class="feature-card">
                    <div class="feature-icon">
                        <FileInput class="w-6 h-6" />
                    </div>
                    <h3 class="feature-title">响应式表单布局</h3>
                    <p class="feature-desc">表单支持 labelWidth="auto" 自动对齐，小屏自动切换为垂直布局</p>
                </div>

                <div class="feature-card">
                    <div class="feature-icon">
                        <Combine class="w-6 h-6" />
                    </div>
                    <h3 class="feature-title">智能 z-index 管理</h3>
                    <p class="feature-desc">弹窗内的 Select/Dropdown 自动获取正确层级，无需手动设置 z-index</p>
                </div>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">技术栈</h2>
            <div class="tech-list">
                <div class="tech-item">
                    <span class="tech-name">Vue 3</span>
                    <span class="tech-desc">Composition API + Script Setup</span>
                </div>
                <div class="tech-item">
                    <span class="tech-name">TypeScript</span>
                    <span class="tech-desc">完整的类型定义与推导</span>
                </div>
                <div class="tech-item">
                    <span class="tech-name">Radix Vue</span>
                    <span class="tech-desc">无样式、可访问的组件基础</span>
                </div>
                <div class="tech-item">
                    <span class="tech-name">CSS Variables</span>
                    <span class="tech-desc">纯 CSS 主题系统，无运行时</span>
                </div>
                <div class="tech-item">
                    <span class="tech-name">VeeValidate + Zod</span>
                    <span class="tech-desc">类型安全的表单验证</span>
                </div>
                <div class="tech-item">
                    <span class="tech-name">Lucide Icons</span>
                    <span class="tech-desc">精美的开源图标库</span>
                </div>
                <div class="tech-item">
                    <span class="tech-name">TanStack Virtual</span>
                    <span class="tech-desc">高性能虚拟滚动</span>
                </div>
                <div class="tech-item">
                    <span class="tech-name">Vitest</span>
                    <span class="tech-desc">下一代测试框架</span>
                </div>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">设计原则</h2>
            <ul class="demo-section-list">
                <li><strong>取长补短</strong> - 融合 Ant Design 视觉与 Element Plus 体验的最佳实践</li>
                <li><strong>一致性</strong> - 统一的设计语言与交互模式，降低用户学习成本</li>
                <li><strong>高效性</strong> - 简化 API 设计，提升开发效率</li>
                <li><strong>可访问性</strong> - 关注键盘导航、屏幕阅读器和减少动画偏好</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">开始使用</h2>
            <p class="demo-section-desc">
                查看 <router-link to="/components/installation" class="demo-link">使用指南</router-link>
                了解如何在项目中使用 Vort UI，或直接浏览左侧组件列表查看具体组件的用法。
            </p>
        </section>

        <!-- Dialog 演示 -->
        <vort-dialog v-model:open="dialogVisible" title="点击位置缩放动画" width="480">
            <p style="margin: 0 0 16px; color: var(--vort-text-secondary); line-height: 1.6">注意观察：弹窗从你的鼠标点击位置展开，关闭时也会收缩回原点。</p>
            <p style="margin: 0; color: var(--vort-text-secondary); line-height: 1.6">
                这种动画效果源自 Ant Design，通过追踪鼠标点击坐标并设置 <code>transform-origin</code>， 让动画的视觉焦点始终与用户的注意力保持一致。
            </p>
            <template #footer>
                <vort-button @click="dialogVisible = false">关闭</vort-button>
                <vort-button type="primary" @click="dialogVisible = false">我明白了</vort-button>
            </template>
        </vort-dialog>

        <!-- Drawer 演示 -->
        <vort-drawer v-model:open="drawerVisible" title="父级抽屉" :width="500">
            <p style="margin: 0 0 16px; color: var(--vort-text-secondary); line-height: 1.6">
                这是父级抽屉。点击下方按钮打开嵌套抽屉，观察父级抽屉的推移效果。
            </p>
            <vort-button type="primary" @click="nestedDrawerVisible = true">打开嵌套抽屉</vort-button>

            <!-- 嵌套抽屉 -->
            <vort-drawer v-model:open="nestedDrawerVisible" title="嵌套抽屉" :width="400">
                <p style="margin: 0 0 16px; color: var(--vort-text-secondary); line-height: 1.6">注意观察：父级抽屉向左偏移了一段距离，形成了层级感。</p>
                <p style="margin: 0; color: var(--vort-text-secondary); line-height: 1.6">
                    这种嵌套推移动画也是 Ant Design 的经典交互，偏移距离可通过 <code>push</code> 属性配置。
                </p>
            </vort-drawer>
        </vort-drawer>
    </div>
</template>

<style scoped>
/* Introduction Demo 特定样式 */
.demo-link {
    color: var(--vort-primary);
    text-decoration: none;
}

.demo-link:hover {
    text-decoration: underline;
}

/* 设计理念区域 */
.design-philosophy {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
    padding: 24px;
    background: var(--vort-bg-elevated);
    border: 1px solid var(--vort-border-secondary);
    border-radius: 12px;
}

.philosophy-item {
    flex: 1;
    text-align: center;
    padding: 16px;
}

.philosophy-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--vort-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
}

.philosophy-source {
    font-size: 18px;
    font-weight: 700;
    color: var(--vort-primary);
    margin-bottom: 8px;
}

.philosophy-desc {
    font-size: 13px;
    color: var(--vort-text-secondary);
    line-height: 1.6;
}

.philosophy-divider {
    font-size: 24px;
    font-weight: 300;
    color: var(--vort-text-tertiary);
}

.philosophy-result {
    background: linear-gradient(135deg, var(--vort-primary-bg) 0%, transparent 100%);
    border-radius: 8px;
}

.philosophy-result .philosophy-label {
    color: var(--vort-primary);
}

/* 核心特色网格 */
.highlight-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.highlight-card {
    position: relative;
    padding: 24px;
    background: var(--vort-bg-elevated);
    border: 1px solid var(--vort-border-secondary);
    border-radius: 12px;
    transition: all 0.2s;
}

.highlight-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.highlight-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 500;
    border-radius: 4px;
}

.highlight-element .highlight-badge {
    background: #e6f4ff;
    color: #1677ff;
}

.highlight-antd .highlight-badge {
    background: #f6ffed;
    color: #52c41a;
}

.highlight-vort .highlight-badge {
    background: var(--vort-primary-bg);
    color: var(--vort-primary);
}

.highlight-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
    background: var(--vort-primary-bg);
    border-radius: 12px;
    color: var(--vort-primary);
}

.highlight-title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
    color: var(--vort-text);
}

.highlight-desc {
    margin: 0 0 16px;
    font-size: 14px;
    color: var(--vort-text-secondary);
    line-height: 1.6;
}

.highlight-code {
    margin: 0;
    padding: 12px 16px;
    background: var(--vort-fill-quaternary, #fafafa);
    border-radius: 8px;
    font-size: 12px;
    line-height: 1.6;
    overflow-x: auto;
}

.highlight-code code {
    font-family: "SF Mono", "Fira Code", "Monaco", monospace;
    color: var(--vort-text);
}

.highlight-demo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.highlight-demo-tip {
    font-size: 12px;
    color: var(--vort-text-tertiary);
}

.highlight-stats {
    display: flex;
    gap: 24px;
    margin-top: 4px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--vort-primary);
    line-height: 1;
}

.stat-label {
    font-size: 12px;
    color: var(--vort-text-tertiary);
}

/* 特性卡片 */
.feature-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

.feature-card {
    padding: 20px;
    background: var(--vort-bg-elevated);
    border: 1px solid var(--vort-border-secondary);
    border-radius: 8px;
    transition: all 0.2s;
}

.feature-card:hover {
    border-color: var(--vort-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-bottom: 12px;
    background: var(--vort-primary-bg);
    border-radius: 8px;
    color: var(--vort-primary);
}

.feature-title {
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--vort-text);
}

.feature-desc {
    margin: 0;
    font-size: 13px;
    color: var(--vort-text-secondary);
    line-height: 1.5;
}

/* 技术栈列表 */
.tech-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.tech-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: var(--vort-bg-elevated);
    border: 1px solid var(--vort-border-secondary);
    border-radius: 8px;
}

.tech-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--vort-text);
    white-space: nowrap;
}

.tech-desc {
    font-size: 13px;
    color: var(--vort-text-secondary);
}

/* 响应式适配 */
@media (max-width: 1200px) {
    .feature-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 992px) {
    .highlight-grid {
        grid-template-columns: 1fr;
    }

    .feature-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .tech-list {
        grid-template-columns: repeat(2, 1fr);
    }

    .design-philosophy {
        flex-direction: column;
    }

    .philosophy-divider {
        transform: rotate(90deg);
    }
}

@media (max-width: 576px) {
    .feature-grid {
        grid-template-columns: 1fr;
    }

    .tech-list {
        grid-template-columns: 1fr;
    }
}
</style>
