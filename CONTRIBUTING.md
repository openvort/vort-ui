# 贡献指南

Vort UI 接受通用组件、文档和工程改进。请从公开仓库 `master` 创建分支，在同一个 PR 中追加修复，便于保留讨论与贡献记录。

## 开发环境

- Node.js `^20.19.0 || >=22.12.0`。
- pnpm 版本以公开工程 package.json 的 `packageManager` 为准。

```bash
pnpm install --frozen-lockfile
pnpm dev:docs
pnpm type-check
pnpm build
pnpm build:docs
```

组件源码位于 `src/`，Demo 位于 `docs/src/views/demo/`。组件采用 Vue Composition API 与 TypeScript，样式使用纯 CSS 和 CSS 变量。保持四空格缩进、双引号和分号。

PR 说明应包含具体问题、变更行为、兼容性影响和验证结果。提交信息采用 `feat`、`fix`、`docs`、`refactor` 等 Conventional Commits 类型。

维护者复核功能、配置和验证结果后使用 Squash 合入。首次贡献者的 CI 可能需要维护者批准；CI 基线问题与本次引入的问题分别处理。

版本号和正式发布由维护者统一完成，普通 PR 合入不会自动发布 npm。若涉及 package.json、pnpm-workspace.yaml、.npmrc 或 pnpm-lock.yaml，请说明目的，由维护者同步到正式发布源后重新生成相关配置。

参与贡献的代码按 [MIT 许可](./LICENSE) 提供。
