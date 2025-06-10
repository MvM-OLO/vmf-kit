# Hooks

## 介绍

`@vm-kit/hooks` 提供了一系列可复用的 Vue Composition API Hooks，帮助你更好地组织和复用组件逻辑。

## 安装

```bash
npm install @vm-kit/hooks
```

## 使用方式

```ts
import { useCustomHook } from "@vm-kit/hooks";

// 在组件中使用
const { data, loading } = useCustomHook();
```

## Hooks 分类

### 状态相关

- `useToggle` - 切换状态
- `useBoolean` - 布尔值状态管理
- `useCounter` - 计数器
- `useList` - 列表数据管理
- `useSet` - Set 数据管理
- `useMap` - Map 数据管理

### 生命周期

- `useMount` - 组件挂载时执行
- `useUnmount` - 组件卸载时执行
- `useUpdate` - 组件更新时执行

### 副作用

- `useDebounce` - 防抖值
- `useThrottle` - 节流值
- `useTimeout` - 定时器
- `useInterval` - 定时器

### DOM

- `useEventListener` - 事件监听
- `useScroll` - 滚动监听
- `useResize` - 尺寸监听
- `useInViewport` - 元素可见性监听

### 网络

- `useRequest` - 网络请求
- `useWebSocket` - WebSocket 连接
- `useSSE` - Server-Sent Events

### 设备

- `useMediaQuery` - 媒体查询
- `usePreferredDark` - 暗色主题判断
- `useGeolocation` - 地理位置

### 表单

- `useForm` - 表单管理
- `useFormItem` - 表单项管理
- `useValidation` - 表单验证

## 使用示例

### useToggle

```ts
import { useToggle } from "@vm-kit/hooks";

const [state, { toggle, setLeft, setRight }] = useToggle();

// 切换状态
toggle();
// 设置为 true
setLeft();
// 设置为 false
setRight();
```

### useRequest

```ts
import { useRequest } from "@vm-kit/hooks";

const { data, loading, error, run } = useRequest(async () => {
  const res = await fetch("https://api.example.com/data");
  return res.json();
});

// 手动触发请求
run();
```

### useEventListener

```ts
import { useEventListener } from "@vm-kit/hooks";

// 添加点击事件监听
useEventListener("click", (event) => {
  console.log("点击事件:", event);
});
```

## API 参考

每个 Hook 的详细用法和参数说明，请参考对应的 API 文档：

- [状态相关]
- [生命周期]
- [副作用]
- [DOM]
- [网络]
- [设备]
- [表单]
