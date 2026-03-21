<p align="center">
  <h1 align="center">Vort UI</h1>
</p>

<p align="center">
  An enterprise-grade Vue 3 component library combining <strong>Ant Design 5.x aesthetics</strong> with an <strong>Element Plus-like developer experience</strong>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@openvort/vort-ui"><img src="https://img.shields.io/npm/v/@openvort/vort-ui?color=1677ff" alt="npm version"></a>
  <a href="https://github.com/openvort/vort-ui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@openvort/vort-ui" alt="license"></a>
  <a href="https://github.com/openvort/vort-ui/actions/workflows/ci.yml"><img src="https://github.com/openvort/vort-ui/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <img src="https://img.shields.io/badge/vue-3.4+-42b883" alt="vue">
  <img src="https://img.shields.io/badge/typescript-%E2%9C%93-3178c6" alt="typescript">
</p>

---

## Features

- **Refined Design** - Follows Ant Design 5.x design specifications and motion effects
- **Developer Friendly** - Element Plus-style API design, easy to learn and use
- **50+ Components** - Covers common enterprise UI scenarios
- **TypeScript** - Full type definitions for all components
- **On-Demand Import** - Supports auto-import and tree-shaking
- **Internationalization** - Built-in Chinese and English locale support
- **Theming** - CSS variable-based theme customization system

## Installation

```bash
# npm
npm install @openvort/vort-ui

# pnpm (recommended)
pnpm add @openvort/vort-ui

# yarn
yarn add @openvort/vort-ui
```

## Quick Start

### Full Import

```typescript
// main.ts
import { createApp } from 'vue'
import VortUI from '@openvort/vort-ui'
import '@openvort/vort-ui/styles'

const app = createApp(App)
app.use(VortUI)
app.mount('#app')
```

### On-Demand Import

```typescript
import { Button, Input } from '@openvort/vort-ui'
import '@openvort/vort-ui/styles'
```

### Auto Import (Recommended)

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

Then use components directly in templates without manual imports:

```vue
<template>
  <vort-button type="primary">Button</vort-button>
  <vort-input v-model="value" placeholder="Enter text" />
</template>
```

## Components

### General
Button, Dropdown, Menu, Divider

### Layout
Card, Grid (Row/Col), Scrollbar, Anchor

### Data Entry
Form, Input, InputNumber, Textarea, Select, Cascader, Checkbox, Radio, Switch, DatePicker, TimePicker, ColorPicker, Slider, Upload, AutoComplete

### Data Display
Table, Pagination, Tabs, Tag, Image, Statistic, Timeline, Segmented, Skeleton, Badge

### Feedback
Dialog, Drawer, Message, Notification, Popconfirm, Popover, Tooltip, Spin, Steps, Alert

### Configuration
ConfigProvider (i18n & theming)

## Browser Support

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| Last 2 versions | Last 2 versions | Last 2 versions | Last 2 versions |

## Local Development

```bash
# Clone the repository
git clone https://github.com/openvort/vort-ui.git
cd vort-ui

# Install dependencies
pnpm install

# Start the development server (demo site)
pnpm dev

# Build the component library
pnpm build:lib

# Type checking
pnpm type-check
```

## Contributing

We welcome all contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting a Pull Request.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for the full release history.

## License

[MIT](./LICENSE) - Copyright (c) 2026 OpenVort Team
