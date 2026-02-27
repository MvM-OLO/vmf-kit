# RichTextEditor 富文本编辑器

基于 Tiptap 2.x 的富文本编辑器组件，支持截图粘贴上传图片、工具栏可配置、文件选择上传图片，配套只读渲染组件 RichTextViewer。

## 基础用法

```vue
<template>
  <RichTextEditor
    v-model="content"
    v-model:html="htmlContent"
    placeholder="请输入内容…"
    :on-upload-image="handleUpload"
  />

  <!-- 渲染预览 -->
  <RichTextViewer :content="content" />
</template>

<script setup>
import { ref } from 'vue'

const content = ref()
const htmlContent = ref('')

async function handleUpload(file) {
  // 调用你的上传接口，返回图片 URL
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  const { url } = await res.json()
  return url
}
</script>
```

## 工具栏配置

通过 `toolbar` prop 自定义工具栏显示的按钮，使用 `"|"` 作为分组分隔符。不传则默认显示全部按钮。

```vue
<template>
  <!-- 只显示基础文字格式 + 链接 + 撤销重做 -->
  <RichTextEditor
    v-model="content"
    :toolbar="['bold', 'italic', 'underline', '|', 'link', '|', 'undo', 'redo']"
  />

  <!-- 精简模式：去掉表格和代码块 -->
  <RichTextEditor
    v-model="content"
    :toolbar="[
      'bold', 'italic', 'underline', 'strike', '|',
      'heading', '|',
      'bulletList', 'orderedList', '|',
      'link', 'image', 'blockquote', '|',
      'undo', 'redo'
    ]"
  />
</template>
```

### 可用的工具项

| 工具项 | 说明 |
| --- | --- |
| `bold` | 粗体 |
| `italic` | 斜体 |
| `underline` | 下划线 |
| `strike` | 删除线 |
| `highlight` | 高亮 |
| `subscript` | 下标 |
| `superscript` | 上标 |
| `code` | 行内代码 |
| `color` | 文字颜色 |
| `heading` | 标题选择（H1-H4） |
| `bulletList` | 无序列表 |
| `orderedList` | 有序列表 |
| `taskList` | 任务列表 |
| `alignLeft` | 左对齐 |
| `alignCenter` | 居中对齐 |
| `alignRight` | 右对齐 |
| `link` | 插入链接 |
| `image` | 插入图片 |
| `blockquote` | 引用 |
| `codeBlock` | 代码块 |
| `horizontalRule` | 分割线 |
| `table` | 表格 |
| `undo` | 撤销 |
| `redo` | 重做 |
| `\|` | 分组分隔符 |

## 图片上传

点击工具栏图片按钮会打开**系统文件选择弹窗**，选择图片后：

- 如果传入了 `onUploadImage`：调用该函数上传文件，返回 URL 后插入编辑器
- 如果未传入 `onUploadImage`：自动将图片转为 base64 插入

编辑器还内置了截图粘贴和拖拽上传支持：

```typescript
// 函数签名
type UploadImageFn = (file: File) => Promise<string>
```

当用户在编辑器中：
- **Ctrl+V 粘贴截图** — 自动从剪贴板提取图片
- **拖拽图片文件** — 自动提取拖入的图片

组件会调用 `onUploadImage` 函数，等待返回图片 URL 后自动插入编辑器。

## 插入链接

点击工具栏链接按钮会弹出**内联输入框**，支持：
- 输入链接地址后按 Enter 或点击"确定"插入
- 按 Esc 或点击外部区域取消
- 当光标在已有链接上时，自动回显链接地址，并可"移除"链接

## 使用 HTML 渲染

RichTextViewer 也支持直接传入 HTML 字符串：

```vue
<RichTextViewer html="<h1>标题</h1><p>正文内容</p>" />
```

## 功能列表

| 功能 | 说明 |
| --- | --- |
| 文字格式 | 粗体、斜体、下划线、删除线、行内代码 |
| 高亮 | 文字背景高亮 |
| 上下标 | 上标、下标 |
| 文字颜色 | 自定义文字颜色 |
| 标题 | H1 ~ H4 |
| 列表 | 无序列表、有序列表、任务列表 |
| 对齐 | 左对齐、居中、右对齐 |
| 引用 | 块引用 |
| 代码块 | 多行代码块 |
| 表格 | 插入/编辑/删除表格，添加/删除行列 |
| 图片 | 文件选择上传 + 截图粘贴上传 + 拖拽上传 |
| 链接 | 内联弹出框插入超链接 |
| 分割线 | 水平分割线 |
| 撤销/重做 | Ctrl+Z / Ctrl+Shift+Z |
| 工具栏配置 | 可自定义显示/隐藏工具栏项 |
| SVG 图标 | 所有工具栏按钮使用 SVG 图标，清晰一致 |

## RichTextEditor API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 编辑内容，Tiptap JSON 格式 | `JSONContent` | — |
| html (v-model:html) | 编辑内容，HTML 字符串 | `string` | — |
| placeholder | 占位文本 | `string` | `'请输入内容…'` |
| onUploadImage | 图片上传函数 | `(file: File) => Promise<string>` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| minHeight | 编辑器最小高度 | `string \| number` | `'300px'` |
| toolbar | 工具栏配置 | `(ToolbarItem \| "\|")[]` | 全部显示 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 内容变化（JSON） | `JSONContent` |
| update:html | 内容变化（HTML） | `string` |

### 类型导出

```typescript
import type { ToolbarItem, UploadImageFn } from 'vmf-kit/components'
import { DEFAULT_TOOLBAR } from 'vmf-kit/components'
```

## RichTextViewer API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | Tiptap JSON 内容 | `JSONContent` | — |
| html | HTML 字符串内容 | `string` | — |

## 依赖说明

基于 [Tiptap](https://tiptap.dev/) 2.x 编辑器框架，使用了以下扩展：

- `@tiptap/starter-kit` — 基础扩展集
- `@tiptap/extension-image` — 图片
- `@tiptap/extension-link` — 链接
- `@tiptap/extension-table` — 表格
- `@tiptap/extension-task-list` — 任务列表
- `@tiptap/extension-highlight` — 高亮
- `@tiptap/extension-underline` — 下划线
- `@tiptap/extension-text-align` — 文本对齐
- `@tiptap/extension-color` — 文字颜色
- 等更多扩展
