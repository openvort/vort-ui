# 贡献指南

感谢你对 Vort UI 的关注！本指南将帮助你快速上手参与贡献。

## 环境要求

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8

## 安装

```bash
git clone https://github.com/openvort/vort-ui.git
cd vort-ui
pnpm install
```

## 开发

```bash
# 启动演示站（支持热更新）
pnpm dev

# 构建组件库
pnpm build:lib

# 构建全部（组件库 + 演示站）
pnpm build

# 类型检查
pnpm type-check
```

## 项目结构

```
vort-ui/
├── src/
│   ├── components/vort/     # 组件源码
│   │   ├── button/          # 每个组件独立目录
│   │   ├── input/
│   │   ├── styles/          # 全局样式 & CSS 变量
│   │   ├── composables/     # 公共组合式函数
│   │   ├── locale/          # 国际化语言包
│   │   ├── icons/           # 图标组件
│   │   └── index.ts         # 主入口
│   ├── lib/                 # 工具函数
│   ├── views/demo/          # 演示页面
│   └── router/              # 演示站路由
├── scripts/                 # 构建脚本
├── vite.config.ts           # 演示站 Vite 配置
└── vite.config.lib.ts       # 组件库构建 Vite 配置
```

## 提交 Issue

提交前请先搜索是否已有类似的 Issue。

### Bug 报告

报告 Bug 时请包含以下信息：

- Vort UI 版本
- Vue 版本
- 浏览器及版本
- 复现步骤
- 期望行为
- 实际行为
- 代码片段或复现链接（如有）

### 功能请求

请求新功能时请包含：

- 使用场景描述
- 建议的 API 设计（如有）
- 是否愿意提交 PR

## 提交 Pull Request

1. Fork 本仓库，从 `main` 创建你的分支
2. 进行修改
3. 确保 `pnpm type-check` 通过
4. 确保 `pnpm build:lib` 成功
5. 编写清晰的 PR 描述说明你的修改
6. 提交 Pull Request

### Commit 规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)：

```
<类型>(<范围>): <描述>
```

**类型：**
- `feat` — 新功能或新组件
- `fix` — Bug 修复
- `docs` — 文档变更
- `style` — 代码风格调整（不影响逻辑）
- `refactor` — 代码重构
- `perf` — 性能优化
- `test` — 测试相关
- `chore` — 构建/工具相关

**示例：**
```
feat(select): 添加虚拟滚动支持
fix(datepicker): 修复范围模式下月份导航错误
docs: 更新安装指南
```

### 代码规范

- 使用 Vue 3 Composition API + `<script setup lang="ts">`
- 提供完整的 TypeScript 类型定义
- 优先使用 Tailwind CSS 编写样式
- 遵循项目中已有的代码风格

## 开源协议

参与贡献即表示你同意你的贡献将按 [MIT 协议](./LICENSE) 授权。
