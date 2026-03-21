<p align="center">
  <h1 align="center">Vort UI</h1>
</p>

<p align="center">
  融合 <strong>Ant Design 5.x 精致视觉</strong>与 <strong>Element Plus 开发体验</strong>的企业级 Vue 3 组件库
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@openvort/vort-ui"><img src="https://img.shields.io/npm/v/@openvort/vort-ui?color=1677ff" alt="npm version"></a>
  <a href="https://github.com/openvort/vort-ui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@openvort/vort-ui" alt="license"></a>
  <a href="https://github.com/openvort/vort-ui/actions/workflows/ci.yml"><img src="https://github.com/openvort/vort-ui/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <img src="https://img.shields.io/badge/vue-3.4+-42b883" alt="vue">
  <img src="https://img.shields.io/badge/typescript-%E2%9C%93-3178c6" alt="typescript">
</p>

<p align="center">
  <a href="./README.en.md">English</a> | 中文
</p>

---

## 特性

- **精致设计** — 遵循 Ant Design 5.x 设计规范与动效体系
- **开发友好** — Element Plus 风格的 API 设计，上手即用
- **50+ 组件** — 覆盖常见企业级 UI 场景
- **TypeScript** — 全部组件提供完整类型定义
- **按需导入** — 支持自动导入与 Tree Shaking
- **国际化** — 内置中英文语言包
- **主题定制** — 基于 CSS 变量的主题系统

## 安装

```bash
# npm
npm install @openvort/vort-ui

# pnpm（推荐）
pnpm add @openvort/vort-ui

# yarn
yarn add @openvort/vort-ui
```

## 快速开始

### 完整引入

```typescript
// main.ts
import { createApp } from 'vue'
import VortUI from '@openvort/vort-ui'
import '@openvort/vort-ui/styles'

const app = createApp(App)
app.use(VortUI)
app.mount('#app')
```

### 按需引入

```typescript
import { Button, Input } from '@openvort/vort-ui'
import '@openvort/vort-ui/styles'
```

### 自动导入（推荐）

```typescript
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { VortResolver } from '@openvort/vort-ui/resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [VortResolver()]
    })
  ]
})
```

然后在模板中直接使用，无需手动导入：

```vue
<template>
  <vort-button type="primary">按钮</vort-button>
  <vort-input v-model="value" placeholder="请输入" />
</template>
```

## 组件列表

### 通用
Button 按钮、Dropdown 下拉菜单、Menu 导航菜单、Divider 分割线

### 布局
Card 卡片、Grid 栅格、Scrollbar 滚动条、Anchor 锚点

### 数据录入
Form 表单、Input 输入框、InputNumber 数字输入框、Textarea 文本域、Select 选择器、Cascader 级联选择、Checkbox 复选框、Radio 单选框、Switch 开关、DatePicker 日期选择器、TimePicker 时间选择器、ColorPicker 颜色选择器、Slider 滑动条、Upload 上传、AutoComplete 自动补全

### 数据展示
Table 表格、Pagination 分页、Tabs 标签页、Tag 标签、Image 图片、Statistic 统计数值、Timeline 时间线、Segmented 分段控制器、Skeleton 骨架屏、Badge 徽标

### 反馈
Dialog 对话框、Drawer 抽屉、Message 消息提示、Notification 通知、Popconfirm 气泡确认、Popover 气泡卡片、Tooltip 文字提示、Spin 加载中、Steps 步骤条、Alert 警告提示

### 配置
ConfigProvider 全局配置（国际化与主题）

## 浏览器支持

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| 最近 2 个版本 | 最近 2 个版本 | 最近 2 个版本 | 最近 2 个版本 |

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/openvort/vort-ui.git
cd vort-ui

# 安装依赖
pnpm install

# 启动开发服务器（演示站）
pnpm dev

# 构建组件库
pnpm build:lib

# 类型检查
pnpm type-check
```

## 参与贡献

欢迎所有形式的贡献！请在提交 Pull Request 之前阅读 [贡献指南](./CONTRIBUTING.md)。

## 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解完整版本历史。

## 开源协议

[MIT](./LICENSE) - Copyright (c) 2026 OpenVort Team
