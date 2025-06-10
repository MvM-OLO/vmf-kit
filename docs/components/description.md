# Description 描述列表

Description 组件用于展示多个只读字段的详情信息。

## 基础用法

```vue
<template>
  <YDescription @register="registerDescription" />
</template>

<script setup>
import { useYDescription } from "vmf-kit/components";

const [registerDescription] = useYDescription({
  data: {
    name: "张三",
    age: 18,
    address: "北京市",
  },
  columns: [
    { label: "姓名", prop: "name" },
    { label: "年龄", prop: "age" },
    { label: "地址", prop: "address" },
  ],
});
</script>
```

## API

### YDescription 属性

| 参数      | 说明           | 类型                         | 默认值         |
| --------- | -------------- | ---------------------------- | -------------- |
| data      | 展示数据       | `Record<string, any>`        | `{}`           |
| columns   | 列配置         | `YDescriptionType[]`         | `[]`           |
| column    | 一行显示的列数 | `number`                     | `3`            |
| border    | 是否显示边框   | `boolean`                    | `false`        |
| direction | 排列方向       | `'horizontal' \| 'vertical'` | `'horizontal'` |

### YDescriptionType 类型定义

```ts
interface YDescriptionType {
  label: string; // 标签文本
  prop: string; // 数据字段名
  span?: number; // 列跨度
  width?: string | number; // 列宽度
  align?: "left" | "center" | "right"; // 对齐方式
}
```

### useYDescription Hook

`useYDescription` 是一个用于快速创建描述列表配置的 Hook。

```ts
const { data, columns } = useYDescription(options: {
  data: Record<string, any>;
  columns: YDescriptionType[];
})
```
