# 工具库

## 介绍

`@vmf-kit/utils` 提供了一系列实用的工具函数，帮助你更高效地处理常见的开发场景。

## 安装

```bash
npm install @vmf-kit/utils
```

## 使用方式

```ts
// 按需导入
import { someUtil } from "@vmf-kit/utils";

// 使用示例
someUtil();
```

## 工具分类

### 数据处理

- `formatDate` - 日期格式化
- `formatNumber` - 数字格式化
- `deepClone` - 深拷贝
- `debounce` - 防抖函数
- `throttle` - 节流函数

### 字符串处理

- `camelCase` - 转换为驼峰命名
- `kebabCase` - 转换为短横线命名
- `capitalize` - 首字母大写

### 数组操作

- `arrayToTree` - 数组转树形结构
- `treeToArray` - 树形结构转数组
- `uniqueArray` - 数组去重

### 对象操作

- `pick` - 对象属性选择
- `omit` - 对象属性忽略
- `merge` - 对象合并

### 验证工具

- `isEmail` - 邮箱验证
- `isPhone` - 手机号验证
- `isIdCard` - 身份证验证

### 浏览器工具

- `getCookie` - 获取 Cookie
- `setCookie` - 设置 Cookie
- `getUrlParams` - 获取 URL 参数

### 文件处理

- `downloadFile` - 文件下载
- `fileToBase64` - 文件转 Base64
- `compressImage` - 图片压缩

## 使用示例

### 日期格式化

```ts
import { formatDate } from "@vmf-kit/utils";

const date = new Date();
const formattedDate = formatDate(date, "YYYY-MM-DD");
console.log(formattedDate); // 2024-01-01
```

### 数组转树形结构

```ts
import { arrayToTree } from "@vmf-kit/utils";

const array = [
  { id: 1, name: "节点1", parentId: 0 },
  { id: 2, name: "节点2", parentId: 1 },
  { id: 3, name: "节点3", parentId: 1 },
];

const tree = arrayToTree(array, {
  id: "id",
  parentId: "parentId",
  children: "children",
});
```

### 防抖函数

```ts
import { debounce } from "@vmf-kit/utils";

const handleSearch = debounce((value: string) => {
  console.log("搜索:", value);
}, 300);
```

## API 参考

每个工具函数的详细用法和参数说明，请参考对应的 API 文档：

- [数据处理]
- [字符串处理]
- [数组操作]
- [对象操作]
- [验证工具]
- [浏览器工具]
- [文件处理]
