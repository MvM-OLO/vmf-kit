# FilePreview 文件预览

通用文件预览组件，纯前端实现，支持图片、PDF、Word、Excel、PPT、文本和代码文件的在线预览。

## 基础用法

通过 `file` 属性传入文件 URL 或 `File` 对象，组件会自动识别文件类型并渲染对应预览。

```vue
<template>
  <!-- URL 方式 -->
  <FilePreview file="https://example.com/document.pdf" />

  <!-- File 对象方式 -->
  <FilePreview :file="uploadedFile" />
</template>

<script setup>
import { ref } from 'vue'

const uploadedFile = ref(null)

function onFileChange(e) {
  uploadedFile.value = e.target.files[0]
}
</script>
```

## 指定文件类型

当无法通过扩展名自动识别时，可手动指定 `fileType`。

```vue
<template>
  <FilePreview :file="file" file-type="excel" />
</template>
```

## 自定义尺寸

通过 `width` 和 `height` 属性控制预览容器大小。

```vue
<template>
  <FilePreview :file="file" width="800px" height="500px" />
</template>
```

## 支持的文件类型

| 类型 | 扩展名 | 预览方式 |
| --- | --- | --- |
| 图片 | jpg, jpeg, png, gif, webp, svg, bmp, ico | 原生 `<img>` + 缩放/旋转工具栏 |
| PDF | pdf | pdfjs-dist 多页 Canvas 渲染 |
| Word | docx | docx-preview DOM 渲染 |
| Excel | xlsx, xls, csv | xlsx 解析 + HTML 表格 + Sheet 切换 |
| PPT | pptx | pptx-preview 渲染 |
| 文本 | txt, log, md | 原生 `<pre>` 纯文本展示 |
| 代码 | js, ts, vue, jsx, tsx, py, java, c, cpp, go, rs, rb, php, sh, html, css, scss, less, json, xml, yaml, yml, sql | highlight.js 语法高亮 |

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| file | 文件源：远程 URL 或 File 对象 | `string \| File` | — |
| fileType | 手动指定文件类型，不指定则自动检测 | `'image' \| 'pdf' \| 'word' \| 'excel' \| 'ppt' \| 'text' \| 'code'` | — |
| width | 容器宽度 | `string \| number` | `'100%'` |
| height | 容器高度 | `string \| number` | `'600px'` |

### 文件类型自动检测

组件通过文件扩展名自动检测类型，检测优先级为：

1. `fileType` prop（手动指定，最高优先级）
2. `File.name` 的扩展名（File 对象）
3. URL 路径的扩展名（字符串 URL）

### 图片预览工具栏

图片预览模式提供以下交互：

- **放大/缩小**：工具栏按钮或鼠标滚轮
- **旋转**：支持左旋/右旋 90°
- **重置**：一键恢复默认状态
- **拖拽移动**：鼠标拖拽平移图片

### Excel 多 Sheet 支持

当 Excel 文件包含多个工作表时，顶部会显示 Sheet 切换 Tab，支持点击切换不同工作表。表头行自动冻结。

## 依赖说明

该组件依赖以下第三方库：

| 库 | 用途 |
| --- | --- |
| `pdfjs-dist` | PDF 文件渲染 |
| `docx-preview` | Word (.docx) 文件渲染 |
| `xlsx` | Excel 文件解析 |
| `pptx-preview` | PPT (.pptx) 文件渲染 |
| `highlight.js` | 代码语法高亮 |
