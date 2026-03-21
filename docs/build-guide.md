# Vort UI Demo 打包操作文档

## 项目概述

Vort UI Demo 是一个独立的 UI 组件演示项目，代码来源于 `__Vort-Admin__` 目录。每次打包前会自动同步最新的组件和演示代码。

## 环境要求

- Node.js >= 22
- pnpm（项目使用 pnpm-lock.yaml 锁定依赖版本）

## 安装依赖

```bash
pnpm install
```

## 打包命令

```bash
pnpm build
```

### Q: 同步失败提示目录不存在？

确保 `__Vort-Admin__` 目录存在且包含完整的源代码：
- `__Vort-Admin__/src/views/demo` - 演示页面
- `__Vort-Admin__/src/components/vort` - UI 组件
- `__Vort-Admin__/src/lib/utils.ts` - 工具函数
