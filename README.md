<p align="center"> <span >
<img src="./public/multifunc_kit_icon.png" width = "50" height = "50" alt="图片名称" align=center />
</p>

<h1 align="center">vmf-kit VUE3 多功能前端整合包</h1>
<p align="center">一个 <span style="text-decoration:line-through;">实用</span>（开发中）的前端库。</p>

## 📦 安装

```bash
npm install vmf-kit
# 或者
pnpm add vmf-kit
# 或者
yarn add vmf-kit
```

## 🔨 模块说明

| 模块       | 描述                 | 路径               |
| :--------- | :------------------- | :----------------- |
| Constants  | 常量                 | vmf-kit/constants  |
| Plugins    | 二次封装的第三方插件 | vmf-kit/plugins    |
| Components | 通用组件             | vmf-kit/components |
| Utils      | 工具函数             | vmf-kit/utils      |
| Hooks      | Vue Hooks            | vmf-kit/hooks      |

## 📝 使用示例

```typescript
// 方式一：从主包导入
import { Constants, Utils } from "vmf-kit";
const { PCA_CODE } = Constants;
const { merge, cn } = Utils;

// 方式二：从子包导入（推荐，tree-shaking 更友好）
import { PCA_CODE } from "vmf-kit/constants";
import { merge, cn } from "vmf-kit/utils";
```

## 📚 详细说明

### 🔍 Constants 常量

- `PCA_CODE`: 行政区域编码配置，适用于级联选择

### 🔌 Plugins 插件

- **Gantt 甘特图**
  - 支持导出 PDF
  - 支持导出图片
  - 支持依赖线
  - 更多功能开发中...
- **ECharts**
  - 二次封装的图表组件
  - 提供常用配置项

### 🎨 Components 组件

- Button 按钮组件
- Page 页面组件
- 更多组件开发中...

### 🛠 Utils 工具函数

- **Core**
  - `window`: 窗口相关工具函数
  - `merge`: 深度合并对象
  - `dom`: DOM 操作工具
  - `diff`: 对象差异比较
  - `cn`: 类名合并工具
- **Helpers**
  - `findMenuByPath`: 根据路径查找菜单
- **Color**
  - `generator`: 颜色生成器

### 🎣 Hooks

- `onMountedOrActivated`: 在组件挂载或激活时执行
- 更多 hooks 开发中...

## 🔧 类型支持

本库使用 TypeScript 编写，提供完整的类型定义文件，支持代码提示。

## 文档地址

[文档地址](https://vmf-kit.vercel.app/)

## 👥 作者

tory-fu

---

> 🚧 开发中，欢迎提供建议和反馈
