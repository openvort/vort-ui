# Vort UI 文档演示站

这里是 `@openvort/vort-ui` 的同源文档与交互式 Demo。

## 本地开发

在项目根目录执行：

```bash
pnpm dev:docs
```

默认访问 `http://localhost:4173/components/introduction`。

部署静态产物时需要保留 `/components/` 前缀，并将 `/components/*` 的 history 路由回退到
`/components/index.html`；静态资源位于同一前缀下的 `assets/` 目录。

## 构建

```bash
pnpm build:docs
```

构建结果写入项目根目录的 `docs-dist/`，与 npm 包的 `dist/` 分开。文档应用只通过
`@openvort/vort-ui` 的公开入口使用组件，与 npm 用户的引用方式一致。

新增 Demo 时先在 `src/demo-catalog.ts` 登记页面名称、路由和文件名，路由与侧边栏会自动同步。
