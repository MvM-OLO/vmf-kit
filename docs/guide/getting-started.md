# 快速开始

## 介绍

vmf-kit 是一个基于 Vue 3 的前端整合包，包含了组件库、工具库、Hooks、常量和插件等多个模块，帮助你快速构建现代化的 Web 应用。

## 安装

### 使用包管理器

```bash
# 使用 npm
npm install vmf-kit

# 使用 yarn
yarn add vmf-kit

# 使用 pnpm
pnpm add vmf-kit
```

## 使用示例

```typescript
// 方式一：从主包导入
import { Constants, Utils } from "vmf-kit";
const { PCA_CODE } = Constants;
const { merge, cn } = Utils;

// 方式二：从子包导入（推荐，tree-shaking 更友好）
import { PCA_CODE } from "vmf-kit/constants";
import { merge, cn } from "vmf-kit/utils";
```

## 模块说明

### Components

组件库提供了一系列开箱即用的 Vue 组件，包括：

- FilePreview 文件预览
- 更多组件持续开发中...

### Utils

工具库提供了常用的工具函数集合，帮助你处理常见的开发场景。

### Hooks

提供了一系列可复用的 Vue Hooks，帮助你抽象和复用组件逻辑。

### Constants

提供了项目中常用的常量定义，保证常量的统一管理和使用。

### Plugins

提供了常用的第三方插件集成，无需额外配置即可使用。

## 浏览器兼容性

vmf-kit 支持所有现代浏览器，需要：

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 版本说明

推荐的依赖版本：

- Vue >= 3.3.0
- TypeScript >= 5.0.0
- Node.js >= 16.0.0

## 下一步

- [查看组件文档](/components/)
- [了解工具函数](/utils/)
- [探索 Hooks](/hooks/)
- [常量参考](/constants/)
- [插件使用](/plugins/)
