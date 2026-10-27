# 更新日志

本文件记录项目的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/)，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.4.0] - 2026-10-27

本版本起，Vort UI 由统一源码导出发布，组件库工程结构随之调整：组件源码仍在 `src/`，文档与 Demo 移至 `docs/`。

### 升级须知
- **zod 改为 peer 依赖，范围 `^3.25.0`**：1.3.0 内置 zod 4，现需由应用自行安装 zod 3。Form 的 `rules` 类型基于 zod 3 的 `ZodType`，使用 zod 4 schema 的项目升级前需调整校验代码，或暂时停留在 1.3.0
- **Vue peer 依赖调整为 `^3.5.0`**（此前为 `^3.4.0`），`vue` 不再列在 dependencies
- **移除未使用的运行依赖**：reka-ui、lucide-vue-next、@vueuse/core、clsx、tailwind-merge、dayjs、vue-router 不再随组件库安装；若项目代码直接使用了这些包，请在项目中自行声明
- **ConfirmDialog 默认 z-index 由 1000 调整为 2000**，确保确认框位于普通对话框及其浮层之上
- package.json 新增 `engines`（Node `^20.19.0 || >=22.12.0`），仅影响组件库本身的开发与构建

### 新增
- 新增 Result 结果组件，新增 HolderOutlined、RedoOutlined、UndoOutlined 图标，导出 `FloatingPlacement`、`FloatingTrigger` 类型
- AutoComplete、DatePicker、RangePicker、TimePicker、Textarea、Form 新增 `variant`
- AutoComplete 新增 `loading`、`loadingDelay`、`openOnFocus`
- Form 新增 `keepValuesOnUnmount`，分页或分步表单可保留已卸载 FormItem 的字段值
- Dialog 新增 `destroyOnClose`（默认 `true`）、`forceRender`、`dividers`（默认 `true`）、`mousePosition`；默认值与此前的渲染表现一致
- Drawer 新增 `forceRender`、`bodyNoPadding`；`destroyOnClose` 默认改为 `true`，与此前关闭后移除内容的实际表现一致，需要保留内容时可设为 `false`
- Popover 新增 `offset`；Scrollbar 新增 `verticalTrackOffset`；Table 新增 `sortState`；Textarea 新增 `countStrategy`
- Notification 新增 `clickable` 与 `bodyClick` 事件；Message 新增 `resetAt`
- Select 新增 `option` 插槽；ConfirmDialog 支持默认插槽
- Image 新增 `loading`、`decoding`、`fetchpriority` 属性，直接作用于原生 img；不传时保持原有行为
- Tag 的 `class` 类型放宽为 Vue 标准 class 写法
- 文档站新增 ⌘K / Ctrl+K 全局搜索
- 提供 IDE 补全用的 web-types

### 修复
- 修复 Image 在 `loading="lazy"` 时因加载中隐藏而始终不发起请求的问题
- 修复 Image 加载失败后更换 `src` 仍停留在错误或 fallback 状态的问题（含初始空地址后异步赋值）

## [1.3.0] - 2026-04-24

### 新增
- Cascader 新增 `selectOnItemClickInMultiple` Props（默认 `true`），多选模式下支持点击整行直接选中
- Input 组件 `clear` 操作新增 emit `change` 合成事件，业务方监听 `@change` 时可读到清空后的值，对齐 Ant Design / Element Plus 行为
- Select 组件 `clear`、`removeTag` 操作新增 emit `change` 事件，对齐 Ant Design 行为
- DatePicker、Upload 的 `types.ts` 补充类型导出

### 修复
- 修复 Cascader `getOptionLabel` 对 `null` / 空值的处理，避免渲染异常
- 修复 DatePicker `selectedDate.setHours(...)` 直接修改原 Date 对象导致的状态污染问题
- 修复 Select 多选模式下标签删除、清除按钮交互的若干细节问题
- 修复 ColorPicker、Dialog、Dropdown、Slider、Switch、Tabs、TimePicker 等组件的若干小问题

### 重构
- 收紧 TypeScript 类型声明（消除 `as any`，统一使用具体类型或 `unknown` 收窄）
- Select.vue 大规模重构（+604 行），优化模板结构与多选交互逻辑
- 按 Prettier / ESLint 规范统一格式化 `components/vort/` 全量代码

## [1.2.0] - 2026-04-10

### 新增
- Select 组件新增 `variant` 属性，支持 outlined、filled、borderless、underlined 四种形态变体
- Col 组件新增响应式断点属性（xs/sm/md/lg/xl/xxl），支持 CSS 变量驱动的响应式栅格布局
- Table 组件增强列宽处理逻辑，支持 `minWidth` 锁定功能（fixed 布局下智能判断是否锁定列宽）
- 文档站新增全局搜索功能（⌘K），支持按组件名、属性、事件、描述等维度检索

### 修复
- 修复 InputSearch 组件 `style` 属性未正确透传到根元素的问题
- 修复 Table 固定列偏移计算未考虑 `minWidth` 回退的问题

### 重构
- 优化 `useZIndex` 组合函数，移除冗余的 `useZIndexProvider`，统一使用 `useZIndexProviderValue`

## [1.1.1] - 2026-03-27

### 新增
- 导出内置图标组件（44 个），支持 `import { SearchOutlined, LoadingOutlined, ... } from "@openvort/vort-ui"`

## [1.1.0] - 2026-03-27

### 新增
- 新增 `useOverlayStack` 组合函数，统一管理弹出层 z-index 层级
- 新增 Menu 组件系列映射（VortMenu / VortMenuItem / VortSubMenu / VortMenuItemGroup / VortMenuDivider）
- 新增 5 个图标组件：MaximizeOutlined、RotateCcwOutlined、RotateCwOutlined、ZoomInOutlined、ZoomOutOutlined
- 新增 ImagePreviewGroup 组件类型定义
- Button 类型定义外置为独立 types.ts，支持外部引用
- 多组件新增国际化支持（Alert、AutoComplete、Cascader、DatePicker、Dialog 等）
- Locale 类型扩展，新增多个组件的 i18n 键定义

### 重构
- Select 组件完全重写：从 10 个子文件合并为高性能单文件实现
- Dropdown 组件重构：整体重写，集成动态 z-index 管理
- DropdownMenuSub 重构：改用 Vort 组件库内置图标
- Cascader 清除按钮改为 indicator 模式，与 Select 行为一致
- 移除多组件中的冗余注释，优化代码可读性

### 修复
- 修复 Dropdown 组件 watch 中 updatePosition 暂时性死区（TDZ）导致的运行时错误
- 修复多个组件 placeholder/notFoundContent 硬编码问题，改为国际化方案

## [1.0.4] - 2026-03-05

### 新增
- Web-types 支持，增强 IDE 自动补全体验

### 修复
- 组件类型定义构建错误

## [1.0.3] - 2026-03-04

### 修复
- TypeScript 类型定义构建错误
- CheckboxGroup 和 RadioGroup 脚本结构调整
- DropdownMenuRadioGroup modelValue 类型修正
- Upload 组件自定义上传按钮文字

## [1.0.2] - 2026-03-02

### 新增
- 首次公开发布
- 50+ 组件，覆盖企业级 UI 场景
- 完整的 TypeScript 类型定义
- 自动导入解析器（适配 `unplugin-vue-components`）
- 内置国际化支持（中文 & 英文）
- 基于 CSS 变量的主题定制系统
- Ant Design 5.x 视觉设计
- Element Plus 风格的 API 设计

### 组件
- **通用**：Button 按钮、Dropdown 下拉菜单、Menu 导航菜单、Divider 分割线
- **布局**：Card 卡片、Grid 栅格、Scrollbar 滚动条、Anchor 锚点
- **数据录入**：Form 表单、Input 输入框、InputNumber 数字输入框、Textarea 文本域、Select 选择器、Cascader 级联选择、Checkbox 复选框、Radio 单选框、Switch 开关、DatePicker 日期选择器、TimePicker 时间选择器、ColorPicker 颜色选择器、Slider 滑动条、Upload 上传、AutoComplete 自动补全
- **数据展示**：Table 表格、Pagination 分页、Tabs 标签页、Tag 标签、Image 图片、Statistic 统计数值、Timeline 时间线、Segmented 分段控制器、Skeleton 骨架屏、Badge 徽标
- **反馈**：Dialog 对话框、Drawer 抽屉、Message 消息提示、Notification 通知、Popconfirm 气泡确认、Popover 气泡卡片、Tooltip 文字提示、Spin 加载中、Steps 步骤条、Alert 警告提示
- **配置**：ConfigProvider 全局配置
