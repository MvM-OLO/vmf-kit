# Button 按钮

按钮用于开始一个即时操作。

## 基础用法

```vue
<template>
  <YButton>默认按钮</YButton>
</template>
```

## API

### 属性

| 参数     | 说明     | 类型                                                           | 默认值      |
| -------- | -------- | -------------------------------------------------------------- | ----------- |
| type     | 按钮类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| size     | 按钮大小 | `'small' \| 'medium' \| 'large'`                               | `'medium'`  |
| disabled | 是否禁用 | `boolean`                                                      | `false`     |

### 事件

| 事件名 | 说明           | 回调参数                      |
| ------ | -------------- | ----------------------------- |
| click  | 点击按钮时触发 | `(event: MouseEvent) => void` |

### 插槽

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 按钮的内容 |
