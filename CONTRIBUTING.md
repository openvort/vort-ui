# Contributing to Vort UI

Thank you for your interest in contributing to Vort UI! This guide will help you get started.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8

## Setup

```bash
git clone https://github.com/openvort/vort-ui.git
cd vort-ui
pnpm install
```

## Development

```bash
# Start the demo site with hot reload
pnpm dev

# Build the component library
pnpm build:lib

# Build everything (library + demo site)
pnpm build

# Run type checking
pnpm type-check
```

## Project Structure

```
vort-ui/
├── src/
│   ├── components/vort/     # Component source code
│   │   ├── button/          # Each component has its own directory
│   │   ├── input/
│   │   ├── styles/          # Global styles & CSS variables
│   │   ├── composables/     # Shared composables
│   │   ├── locale/          # i18n locale files
│   │   ├── icons/           # Icon components
│   │   └── index.ts         # Main entry point
│   ├── lib/                 # Utility functions
│   ├── views/demo/          # Demo pages
│   └── router/              # Demo site routing
├── scripts/                 # Build scripts
├── vite.config.ts           # Demo site Vite config
└── vite.config.lib.ts       # Library build Vite config
```

## Submitting Issues

Before creating an issue, please check if a similar issue already exists.

### Bug Reports

When reporting a bug, please include:

- Vort UI version
- Vue version
- Browser and version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Code snippet or reproduction link (if possible)

### Feature Requests

When requesting a feature, please include:

- Use case description
- Proposed API design (if applicable)
- Whether you are willing to submit a PR

## Submitting Pull Requests

1. Fork the repository and create your branch from `main`
2. Make your changes
3. Ensure `pnpm type-check` passes
4. Ensure `pnpm build:lib` succeeds
5. Write a clear PR description explaining your changes
6. Submit the pull request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
```

**Types:**
- `feat` - New feature or component
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no logic change)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Adding or updating tests
- `chore` - Build process or tooling changes

**Examples:**
```
feat(select): add virtual scroll support
fix(datepicker): correct month navigation in range mode
docs: update installation guide
```

### Code Style

- Use Vue 3 Composition API with `<script setup lang="ts">`
- Provide complete TypeScript type definitions
- Use Tailwind CSS for styling when possible
- Follow the existing code patterns in the codebase

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
