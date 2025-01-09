# Page 页面

Page 组件提供了一个标准的页面容器，用于构建统一的页面布局结构。

## 基础用法

```vue
<template>
  <YPage>
    <template #header> 页面标题 </template>
    <div>页面内容</div>
    <template #footer> 页面底部 </template>
  </YPage>
</template>
```

## API

### 属性

| 参数       | 说明         | 类型      | 默认值  |
| ---------- | ------------ | --------- | ------- |
| loading    | 页面加载状态 | `boolean` | `false` |
| showHeader | 是否显示页头 | `boolean` | `true`  |
| showFooter | 是否显示页脚 | `boolean` | `true`  |

### 插槽

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 页面主体内容 |
| header  | 页面头部内容 |
| footer  | 页面底部内容 |
