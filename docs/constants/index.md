# 常量

## 介绍

`@vm-kit/constants` 提供了项目中常用的常量定义，帮助统一管理和维护各类常量值。

## 安装

```bash
npm install @vm-kit/constants
```

## 使用方式

```ts
import { STATUS_CODES, HTTP_METHODS } from "@vm-kit/constants";
```

## 常量分类

### 状态码

```ts
// 系统状态码
export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

// HTTP 请求方法
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;
```

### 时间常量

```ts
// 时间单位（毫秒）
export const TIME_UNITS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

// 日期格式
export const DATE_FORMATS = {
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm:ss",
  DATETIME: "YYYY-MM-DD HH:mm:ss",
} as const;
```

### 正则表达式

```ts
// 常用正则表达式
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^1[3-9]\d{9}$/,
  URL: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
} as const;
```

### 文件相关

```ts
// 文件大小单位（字节）
export const FILE_SIZE_UNITS = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
} as const;

// 文件类型
export const FILE_TYPES = {
  IMAGE: ["jpg", "jpeg", "png", "gif"],
  DOCUMENT: ["doc", "docx", "pdf", "txt"],
  EXCEL: ["xls", "xlsx"],
} as const;
```

### 界面配置

```ts
// 分页配置
export const PAGINATION = {
  PAGE_SIZES: [10, 20, 50, 100],
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_CURRENT: 1,
} as const;

// 主题色
export const THEME_COLORS = {
  PRIMARY: "#1890ff",
  SUCCESS: "#52c41a",
  WARNING: "#faad14",
  ERROR: "#f5222d",
} as const;
```

## 使用示例

### 状态码判断

```ts
import { STATUS_CODES } from "@vm-kit/constants";

function handleResponse(code: number) {
  if (code === STATUS_CODES.SUCCESS) {
    console.log("请求成功");
  } else if (code === STATUS_CODES.UNAUTHORIZED) {
    console.log("未授权");
  }
}
```

### 时间计算

```ts
import { TIME_UNITS } from "@vm-kit/constants";

// 计算 5 分钟后的时间
const fiveMinutesLater = Date.now() + 5 * TIME_UNITS.MINUTE;
```

### 文件大小格式化

```ts
import { FILE_SIZE_UNITS } from "@vm-kit/constants";

function formatFileSize(bytes: number) {
  if (bytes < FILE_SIZE_UNITS.KB) {
    return `${bytes}B`;
  }
  if (bytes < FILE_SIZE_UNITS.MB) {
    return `${(bytes / FILE_SIZE_UNITS.KB).toFixed(2)}KB`;
  }
  return `${(bytes / FILE_SIZE_UNITS.MB).toFixed(2)}MB`;
}
```

## API 参考

每类常量的详细说明，请参考对应的文档：

- [状态码]
- [时间常量]
- [正则表达式]
- [文件相关]
- [界面配置]
