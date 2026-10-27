# `@openvort/vort-ui`

Vort UI 是面向 Vue 3.5 的 Web 通用组件库，提供组件、主题样式、类型声明、自动导入和文档示例。

## 源码与协作

组件代码位于 `src/`，文档与 Demo 位于 `docs/`。公开贡献通过 [GitHub PR](https://github.com/openvort/vort-ui/pulls) 提交，开发和验证步骤见 [贡献指南](./CONTRIBUTING.md)。

## 使用

```ts
import { Button, message } from "@openvort/vort-ui";
import "@openvort/vort-ui/styles";
```

分页布局可通过 CSS 变量 `--vort-pagination-justify` 统一设置对齐方式，作用于 Pagination 内部内容及 Table 底部分页容器；例如管理后台设置为 `flex-end`。未设置时保留各组件的默认对齐方式。

自动导入场景可使用 `@openvort/vort-ui/resolver`。resolver 属于构建期入口，不从运行时根入口重复导出；业务应用如果还有业务组件，需要在应用侧追加自己的 resolver。

组件值与同名数据类型可能同时存在时，公共入口使用明确的类型别名，例如
`SelectOptionType`、`SelectOptionData` 和 `TableColumnType`；组件值仍分别是
`SelectOption` 与 `TableColumn`。

## 文档与演示

文档演示站与组件源码位于同一个 package：

- `src` 是唯一组件源码；
- `docs/src/views/demo` 保存通用组件的交互式示例；
- `docs/src/demo-catalog.ts` 是路由、侧边栏和后续搜索索引共用的 Demo 清单；
- Demo 只从 `@openvort/vort-ui`、`@openvort/vort-ui/styles` 和 `@openvort/vort-ui/resolver` 的公开入口消费组件；
- `docs-dist` 是独立的静态站产物，不会进入 npm 包的 `dist`。

本地启动和构建文档站：

```bash
pnpm dev:docs
pnpm build:docs
pnpm preview:docs
```

默认站点路径为 `/components/`，以便兼容现有 `vortui.com/components/*` 文档地址。部署静态产物时需为该前缀配置 history fallback。

## 依赖约束

Form 的 schema 类型按 Zod 3 维护；使用 Zod 4 的应用升级前需核对 Form `rules` 的类型与运行兼容性。

Form 的 `keepValuesOnUnmount` 默认是 `false`。分页或分步表单可以显式设置 `:keep-values-on-unmount="true"`，保留 FormItem 卸载前的内部字段值；整表 schema 仍负责验证全部数据，条件字段仍须按当前模式判断。该属性不保留已卸载字段的局部验证器，也不改变 model 的合并同步策略。完整示例见文档站的 Form Demo。

## 构建与发布

源码开发通过 `exports` 消费 `src`，组件与文档站保持同源。运行 `pnpm build` 生成 `dist` 中的 JavaScript、CSS、resolver、声明文件与 web-types；`pnpm build:docs` 生成独立的 `docs-dist`。`prepack` 只构建 npm 产物，不把文档站打进包内。

`prepack` 会自动执行同一构建，避免打包时使用过期产物。实际包验收使用 `pnpm pack`，它会应用 `publishConfig` 并将 workspace 的 `catalog:` 依赖转换为发布版本；不要只依据 `npm pack --dry-run` 判断发布入口。声明生成使用 `vue-tsc`，并移除仅用于运行时的 CSS 副作用导入，避免发布包的类型入口依赖未发布的源码样式路径。

正式版本由维护者从统一发布源导出，公开 PR 合入后不会直接触发 npm 发布。内部工作区包保留 `private: true`；正式 tarball 仅在独立导出的公开工程中打包，上传使用同一个已验收的 tgz。
