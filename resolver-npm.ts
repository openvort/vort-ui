/**
 * Vort UI 组件解析器（npm 版本）
 *
 * 用于 unplugin-vue-components 自动导入
 * 支持 <vort-button> 或 <VortButton> 两种写法
 *
 * 注意：所有组件都从主入口 @openvort/vort-ui 导入
 */

import type { ComponentResolver } from "unplugin-vue-components/types";

// 组件名列表（所有组件都从主入口导入）
const componentNames = new Set([
    // ConfigProvider
    "VortConfigProvider",

    // Anchor
    "Anchor",
    "AnchorLink",

    // AutoComplete
    "AutoComplete",

    // Button
    "Button",

    // Card
    "Card",

    // Input
    "Input",
    "InputNumber",
    "InputPassword",
    "InputSearch",

    // Textarea
    "Textarea",

    // Checkbox
    "Checkbox",
    "CheckboxGroup",

    // Radio
    "Radio",
    "RadioGroup",
    "RadioButton",

    // Select
    "Select",
    "SelectOption",

    // Cascader
    "Cascader",

    // Switch
    "Switch",

    // Dialog
    "Dialog",

    // Divider
    "Divider",

    // Drawer
    "Drawer",

    // Dropdown
    "Dropdown",
    "DropdownButton",
    "DropdownMenuItem",
    "DropdownMenuSeparator",
    "DropdownMenuLabel",
    "DropdownMenuGroup",
    "DropdownMenuSub",
    "DropdownMenuCheckboxItem",
    "DropdownMenuRadioGroup",
    "DropdownMenuRadioItem",

    // Alert
    "Alert",

    // Badge
    "Badge",
    "BadgeRibbon",
    "StatusDot",

    // Form
    "Form",
    "FormItem",

    // Grid
    "Row",
    "Col",

    // Table
    "Table",
    "TableColumn",

    // Pagination
    "Pagination",

    // Image
    "Image",
    "ImagePreviewGroup",

    // Popover
    "Popover",

    // Popconfirm
    "Popconfirm",

    // Tooltip
    "Tooltip",

    // Tag
    "Tag",
    "CheckableTag",
    "DraggableTags",

    // DatePicker
    "DatePicker",
    "RangePicker",

    // TimePicker
    "TimePicker",

    // Upload
    "Upload",
    "UploadDragger",

    // Tabs
    "Tabs",
    "TabPane",

    // Scrollbar
    "Scrollbar",

    // Slider
    "Slider",

    // ColorPicker
    "ColorPicker",

    // Steps
    "Steps",

    // Spin
    "Spin",

    // Skeleton
    "Skeleton",
    "SkeletonAvatar",
    "SkeletonButton",
    "SkeletonInput",
    "SkeletonImage",
    "SkeletonNode",

    // Statistic
    "Statistic",
    "StatisticCountdown",

    // Timeline
    "Timeline",
    "TimelineItem",

    // Segmented
    "Segmented",

    // Menu
    "Menu",
    "MenuItem",
    "MenuItemGroup",
    "SubMenu",

    // Icon
    "VortIcon",

    // SearchToolbar
    "SearchToolbar",
    "SearchForm",
    "SearchFormItem",
    "SearchFormActions",

    // DialogForm
    "DialogForm",

    // PopForm
    "PopForm",

    // TableActions
    "TableActions",
    "TableActionsItem",
    "TableActionsMoreItem",

    // DeleteRecord
    "DeleteRecord",

    // BatchActions
    "BatchActions"
]);

/**
 * Vort UI 组件解析器
 *
 * @example
 * // vite.config.ts
 * import Components from 'unplugin-vue-components/vite';
 * import { VortResolver } from '@openvort/vort-ui/resolver';
 *
 * export default defineConfig({
 *   plugins: [
 *     Components({
 *       resolvers: [VortResolver()]
 *     })
 *   ]
 * });
 *
 * @example
 * // 使用组件（无需手动导入）
 * <vort-button type="primary">按钮</vort-button>
 * <VortButton type="primary">按钮</VortButton>
 */
export function VortResolver(): ComponentResolver {
    return {
        type: "component",
        resolve: (name: string) => {
            // 处理 Vort 前缀的组件名
            let componentName = name;
            if (name.startsWith("Vort")) {
                // VortButton -> Button
                componentName = name.slice(4);
            }

            // 检查是否是支持的组件
            if (componentNames.has(componentName) || componentNames.has(name)) {
                return {
                    name: componentNames.has(name) ? name : componentName,
                    from: "@openvort/vort-ui"
                };
            }

            return undefined;
        }
    };
}

// 导出组件名列表（用于类型声明）
export const vortComponentNames = Array.from(componentNames);
