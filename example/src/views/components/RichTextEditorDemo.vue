<template>
  <div class="demo-page">
    <div class="demo-page__header">
      <h1>RichTextEditor 富文本编辑器</h1>
      <p>
        基于 Tiptap 的富文本编辑器，支持截图粘贴上传、工具栏可配置、文件选择上传图片，配套只读渲染组件。
      </p>
    </div>

    <!-- 编辑器（完整工具栏） -->
    <div class="demo-block">
      <div class="demo-block__title">完整工具栏</div>
      <p class="demo-block__desc">
        默认渲染全部工具栏按钮。点击图片按钮打开文件选择弹窗上传图片，点击链接按钮弹出内联输入框。
      </p>
      <div class="demo-block__content">
        <RichTextEditor
          v-model="editorContent"
          v-model:html="editorHtml"
          placeholder="在这里输入内容，试试截图粘贴…"
          :on-upload-image="handleUploadImage"
          min-height="300px"
        />
      </div>
    </div>

    <!-- 自定义工具栏 -->
    <div class="demo-block">
      <div class="demo-block__title">自定义工具栏</div>
      <p class="demo-block__desc">
        通过 <code>toolbar</code> prop 配置显示的工具项，使用 <code>"|"</code> 作为分组分隔符。
      </p>
      <div class="demo-block__content">
        <RichTextEditor
          v-model="editorContent2"
          placeholder="精简工具栏…"
          :toolbar="customToolbar"
          :on-upload-image="handleUploadImage"
          min-height="200px"
        />
      </div>
      <div class="demo-block__code">
        <pre>:toolbar="['bold', 'italic', 'underline', '|', 'heading', '|', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"</pre>
      </div>
    </div>

    <!-- 渲染预览 -->
    <div class="demo-block">
      <div class="demo-block__title">RichTextViewer 渲染预览</div>
      <p class="demo-block__desc">
        使用 RichTextViewer 组件渲染编辑器输出的内容，保证样式一致。
      </p>
      <div class="demo-block__content">
        <div class="viewer-wrapper">
          <RichTextViewer :content="editorContent" />
        </div>
      </div>
    </div>

    <!-- HTML 输出 -->
    <div class="demo-block">
      <div class="demo-block__title">HTML 输出</div>
      <div class="demo-block__content">
        <pre class="html-output">{{ editorHtml }}</pre>
      </div>
    </div>

    <!-- API -->
    <div class="api-section">
      <h2>RichTextEditor API</h2>
      <a-table
        :columns="apiColumns"
        :data-source="editorApiData"
        :pagination="false"
        bordered
        size="small"
      />

      <h3 style="margin-top: 24px">RichTextViewer API</h3>
      <a-table
        :columns="apiColumns"
        :data-source="viewerApiData"
        :pagination="false"
        bordered
        size="small"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RichTextEditor, RichTextViewer } from "@vmf-kit/comp";
import type { JSONContent } from "@tiptap/vue-3";
import type { ToolbarItem } from "@vmf-kit/comp";

const editorContent = ref<JSONContent>();
const editorContent2 = ref<JSONContent>();
const editorHtml = ref("");

/** 自定义精简工具栏 */
const customToolbar: (ToolbarItem | "|")[] = [
  "bold", "italic", "underline", "|",
  "heading", "|",
  "bulletList", "orderedList", "|",
  "link", "image", "|",
  "undo", "redo",
];

/** 模拟图片上传：将 File 转为 base64 DataURL 作为示例 */
async function handleUploadImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

const apiColumns = [
  { title: "属性", dataIndex: "prop", key: "prop" },
  { title: "说明", dataIndex: "desc", key: "desc" },
  { title: "类型", dataIndex: "type", key: "type" },
  { title: "默认值", dataIndex: "default", key: "default" },
];

const editorApiData = [
  { key: "1", prop: "modelValue (v-model)", desc: "编辑内容，Tiptap JSON 格式", type: "JSONContent", default: "-" },
  { key: "2", prop: "html (v-model:html)", desc: "编辑内容，HTML 字符串", type: "string", default: "-" },
  { key: "3", prop: "placeholder", desc: "占位文本", type: "string", default: "'请输入内容…'" },
  { key: "4", prop: "onUploadImage", desc: "图片上传函数，接收 File 返回 URL", type: "(file: File) => Promise<string>", default: "-" },
  { key: "5", prop: "disabled", desc: "是否禁用编辑", type: "boolean", default: "false" },
  { key: "6", prop: "minHeight", desc: "编辑器最小高度", type: "string | number", default: "'300px'" },
  { key: "7", prop: "toolbar", desc: "工具栏配置，传入要显示的工具项数组", type: "(ToolbarItem | '|')[]", default: "全部显示" },
];

const viewerApiData = [
  { key: "1", prop: "content", desc: "Tiptap JSON 内容", type: "JSONContent", default: "-" },
  { key: "2", prop: "html", desc: "HTML 字符串内容", type: "string", default: "-" },
];
</script>

<style scoped>
.demo-page {
  max-width: 960px;
}

.demo-page__header {
  margin-bottom: 32px;
}

.demo-page__header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1d2129;
  margin: 0 0 8px;
}

.demo-page__header p {
  font-size: 14px;
  color: #86909c;
  margin: 0;
}

.demo-block {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  margin-bottom: 20px;
  overflow: hidden;
}

.demo-block__title {
  font-size: 16px;
  font-weight: 600;
  color: #1d2129;
  padding: 16px 20px 8px;
}

.demo-block__desc {
  font-size: 13px;
  color: #86909c;
  padding: 0 20px;
  margin: 0 0 8px;
  line-height: 1.6;
}

.demo-block__desc code {
  background: #f0f0f0;
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 12px;
  color: #c7254e;
}

.demo-block__content {
  padding: 20px;
  border-top: 1px dashed #e8e8e8;
}

.demo-block__code {
  padding: 12px 20px;
  border-top: 1px dashed #e8e8e8;
  background: #fafafa;
}

.demo-block__code pre {
  margin: 0;
  font-size: 12px;
  color: #595959;
  white-space: pre-wrap;
  word-break: break-all;
}

.viewer-wrapper {
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 16px;
  min-height: 100px;
  background: #fafafa;
}

.html-output {
  background: #282c34;
  color: #abb2bf;
  border-radius: 6px;
  padding: 16px;
  font-size: 12px;
  line-height: 1.6;
  max-height: 300px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
}

.api-section {
  margin-top: 40px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  padding: 20px;
}

.api-section h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1d2129;
  margin: 0 0 16px;
}

.api-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1d2129;
  margin: 0 0 12px;
}
</style>
