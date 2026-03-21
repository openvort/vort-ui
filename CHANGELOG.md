# 更新日志

本文件记录项目的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/)，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

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
