# 插件

## 介绍

`@ydzsfront/plugins` 提供了一系列常用的第三方插件集成，无需复杂配置即可使用。

## 安装

```bash
npm install @ydzsfront/plugins
```

## 插件列表

### 请求库

#### Axios 封装

提供了基于 Axios 的 HTTP 请求封装，包含请求拦截、响应拦截、错误处理等功能。

```ts
import { useAxios } from "@ydzsfront/plugins";

const axios = useAxios({
  baseURL: "https://api.example.com",
  timeout: 5000,
});

// 发起请求
axios.get("/users");
```

### 状态管理

#### Pinia 集成

提供了 Pinia 状态管理的集成和常用配置。

```ts
import { usePiniaPlugin } from "@ydzsfront/plugins";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.use(usePiniaPlugin());
```

### 路由

#### Vue Router 增强

提供了 Vue Router 的增强功能，包括路由守卫、权限控制等。

```ts
import { useRouter } from "@ydzsfront/plugins";

const router = useRouter({
  routes: [],
  // 权限配置
  auth: {
    enabled: true,
    loginPath: "/login",
  },
});
```

### UI 增强

#### 图标库

集成了常用的图标库。

```ts
import { Icon } from "@ydzsfront/plugins";

// 使用图标
<Icon name="user" />;
```

#### 主题系统

提供了主题切换和自定义主题的功能。

```ts
import { useTheme } from "@ydzsfront/plugins";

const theme = useTheme();
// 切换主题
theme.setTheme("dark");
```

### 工具增强

#### 日志系统

提供了统一的日志记录和管理功能。

```ts
import { useLogger } from "@ydzsfront/plugins";

const logger = useLogger();
logger.info("操作信息");
logger.error("错误信息");
```

#### 缓存管理

提供了统一的缓存管理接口。

```ts
import { useCache } from "@ydzsfront/plugins";

const cache = useCache();
// 设置缓存
cache.set("key", "value");
// 获取缓存
const value = cache.get("key");
```

## 配置参考

### Axios 配置

```ts
interface AxiosConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  // 请求拦截器
  requestInterceptors?: Array<RequestInterceptor>;
  // 响应拦截器
  responseInterceptors?: Array<ResponseInterceptor>;
}
```

### 路由配置

```ts
interface RouterConfig {
  routes: RouteRecordRaw[];
  auth?: {
    enabled: boolean;
    loginPath: string;
    whiteList?: string[];
  };
}
```

### 缓存配置

```ts
interface CacheConfig {
  prefix?: string;
  expire?: number;
  storage?: "local" | "session";
}
```

## 使用示例

### 完整配置示例

```ts
import { createApp } from "vue";
import {
  useAxios,
  usePiniaPlugin,
  useRouter,
  useLogger,
  useCache,
} from "@ydzsfront/plugins";
import App from "./App.vue";

const app = createApp(App);

// 配置 Axios
const axios = useAxios({
  baseURL: "https://api.example.com",
});

// 配置 Pinia
app.use(usePiniaPlugin());

// 配置路由
const router = useRouter({
  routes: [],
  auth: {
    enabled: true,
    loginPath: "/login",
  },
});

// 配置日志
const logger = useLogger({
  level: "info",
});

// 配置缓存
const cache = useCache({
  prefix: "app",
  storage: "local",
});

app.mount("#app");
```

## API 参考

详细的 API 说明，请参考对应的文档：

- [Axios 插件]
- [Pinia 插件]
- [Router 插件]
- [UI 插件]
- [工具插件]
