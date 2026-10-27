/**
 * 文档站的唯一 Demo 清单。
 *
 * 路由、侧边栏和后续搜索索引都从这里派生，新增或重命名 Demo 时只需要
 * 修改这一处，避免页面已经存在但没有路由或导航入口的情况。
 */
export interface DemoPage {
    name: string;
    path: string;
    file: string;
    title: string;
}

export interface DemoGroup {
    name: string;
    icon?: "component";
    components: readonly DemoPage[];
}

export const demoGroups = [
    {
        name: "开发指南",
        components: [
            { name: "介绍", path: "introduction", file: "IntroductionDemo.vue", title: "介绍" },
            { name: "使用指南", path: "installation", file: "InstallationDemo.vue", title: "使用指南" },
            { name: "ConfigProvider 全局配置", path: "config-provider", file: "ConfigProviderDemo.vue", title: "ConfigProvider 全局配置" }
        ]
    },
    {
        name: "通用",
        components: [
            { name: "Button 按钮", path: "button", file: "ButtonDemo.vue", title: "Button 按钮" },
            { name: "Dropdown 下拉菜单", path: "dropdown", file: "DropdownDemo.vue", title: "Dropdown 下拉菜单" },
            { name: "Menu 导航菜单", path: "menu", file: "MenuDemo.vue", title: "Menu 导航菜单" },
            { name: "Divider 分割线", path: "divider", file: "DividerDemo.vue", title: "Divider 分割线" }
        ]
    },
    {
        name: "布局",
        components: [
            { name: "Card 卡片", path: "card", file: "CardDemo.vue", title: "Card 卡片" },
            { name: "Grid 栅格", path: "grid", file: "GridDemo.vue", title: "Grid 栅格" },
            { name: "Scrollbar 滚动条", path: "scrollbar", file: "ScrollbarDemo.vue", title: "Scrollbar 滚动条" },
            { name: "Anchor 锚点", path: "anchor", file: "AnchorDemo.vue", title: "Anchor 锚点" }
        ]
    },
    {
        name: "数据录入",
        components: [
            { name: "AutoComplete 自动完成", path: "auto-complete", file: "AutoCompleteDemo.vue", title: "AutoComplete 自动完成" },
            { name: "Cascader 级联选择", path: "cascader", file: "CascaderDemo.vue", title: "Cascader 级联选择" },
            { name: "Checkbox 复选框", path: "checkbox", file: "CheckboxDemo.vue", title: "Checkbox 复选框" },
            { name: "ColorPicker 颜色选择器", path: "color-picker", file: "ColorPickerDemo.vue", title: "ColorPicker 颜色选择器" },
            { name: "DatePicker 日期选择器", path: "date-picker", file: "DatePickerDemo.vue", title: "DatePicker 日期选择器" },
            { name: "TimePicker 时间选择器", path: "time-picker", file: "TimePickerDemo.vue", title: "TimePicker 时间选择器" },
            { name: "Form 表单", path: "form", file: "FormDemo.vue", title: "Form 表单" },
            { name: "Input 输入框", path: "input", file: "InputDemo.vue", title: "Input 输入框" },
            { name: "InputNumber 数字输入框", path: "input-number", file: "InputNumberDemo.vue", title: "InputNumber 数字输入框" },
            { name: "Radio 单选框", path: "radio", file: "RadioDemo.vue", title: "Radio 单选框" },
            { name: "Select 选择器", path: "select", file: "SelectDemo.vue", title: "Select 选择器" },
            { name: "Slider 滑动输入条", path: "slider", file: "SliderDemo.vue", title: "Slider 滑动输入条" },
            { name: "Switch 开关", path: "switch", file: "SwitchDemo.vue", title: "Switch 开关" },
            { name: "Upload 上传", path: "upload", file: "UploadDemo.vue", title: "Upload 上传" }
        ]
    },
    {
        name: "数据展示",
        components: [
            { name: "Badge 徽标数", path: "badge", file: "BadgeDemo.vue", title: "Badge 徽标数" },
            { name: "Image 图片", path: "image", file: "ImageDemo.vue", title: "Image 图片" },
            { name: "Pagination 分页", path: "pagination", file: "PaginationDemo.vue", title: "Pagination 分页" },
            { name: "Segmented 分段控制器", path: "segmented", file: "SegmentedDemo.vue", title: "Segmented 分段控制器" },
            { name: "Statistic 统计数值", path: "statistic", file: "StatisticDemo.vue", title: "Statistic 统计数值" },
            { name: "Steps 步骤条", path: "steps", file: "StepsDemo.vue", title: "Steps 步骤条" },
            { name: "Table 表格", path: "table", file: "TableDemo.vue", title: "Table 表格" },
            { name: "Tabs 标签页", path: "tabs", file: "TabsDemo.vue", title: "Tabs 标签页" },
            { name: "Tag 标签", path: "tag", file: "TagDemo.vue", title: "Tag 标签" },
            { name: "Timeline 时间轴", path: "timeline", file: "TimelineDemo.vue", title: "Timeline 时间轴" }
        ]
    },
    {
        name: "反馈",
        components: [
            { name: "Alert 警告提示", path: "alert", file: "AlertDemo.vue", title: "Alert 警告提示" },
            { name: "Dialog 对话框", path: "dialog", file: "DialogDemo.vue", title: "Dialog 对话框" },
            { name: "Drawer 抽屉", path: "drawer", file: "DrawerDemo.vue", title: "Drawer 抽屉" },
            { name: "Message 全局提示", path: "message", file: "MessageDemo.vue", title: "Message 全局提示" },
            { name: "Notification 通知提醒框", path: "notification", file: "NotificationDemo.vue", title: "Notification 通知提醒框" },
            { name: "Popover 气泡卡片", path: "popover", file: "PopoverDemo.vue", title: "Popover 气泡卡片" },
            { name: "Popconfirm 气泡确认框", path: "popconfirm", file: "PopconfirmDemo.vue", title: "Popconfirm 气泡确认框" },
            { name: "Skeleton 骨架屏", path: "skeleton", file: "SkeletonDemo.vue", title: "Skeleton 骨架屏" },
            { name: "Spin 加载中", path: "spin", file: "SpinDemo.vue", title: "Spin 加载中" },
            { name: "Tooltip 文字提示", path: "tooltip", file: "TooltipDemo.vue", title: "Tooltip 文字提示" }
        ]
    },
    {
        name: "业务组件",
        icon: "component",
        components: [{ name: "Icon 图标", path: "icon", file: "IconDemo.vue", title: "Icon 图标" }]
    }
] satisfies readonly DemoGroup[];

export const demoPages: readonly DemoPage[] = demoGroups.flatMap((group) => group.components);
