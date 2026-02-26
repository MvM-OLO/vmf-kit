<template>
  <div class="demo-page">
    <div class="demo-page__header">
      <h1>FilePreview 文件预览</h1>
      <p>通用文件预览组件，支持图片、PDF、Word、Excel、PPT、文本和代码文件预览。</p>
    </div>

    <!-- 文件选择区域 -->
    <div class="demo-block">
      <div class="demo-block__title">选择文件预览</div>
      <p class="demo-block__desc">
        点击按钮上传文件，组件会自动识别文件类型并选择对应的预览方式。
      </p>
      <div class="demo-block__content">
        <div class="upload-area">
          <input
            ref="fileInputRef"
            type="file"
            :accept="acceptTypes"
            class="file-input"
            @change="handleFileChange"
          />
          <a-button type="primary" @click="triggerFileInput">
            <template #icon><UploadOutlined /></template>
            选择文件
          </a-button>
          <span v-if="currentFile" class="file-name">
            {{ currentFileName }}
            <span class="file-type-tag">{{ currentFileType }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="demo-block" v-if="currentFile">
      <div class="demo-block__title">预览效果</div>
      <div class="demo-block__content preview-container">
        <FilePreview :file="currentFile" height="500px" />
      </div>
    </div>

    <!-- 空状态 -->
    <div class="demo-block" v-else>
      <div class="demo-block__title">预览效果</div>
      <div class="demo-block__content">
        <div class="empty-state">
          <div class="empty-icon">📂</div>
          <p>请上传文件查看预览效果</p>
        </div>
      </div>
    </div>

    <!-- 支持的文件类型 -->
    <div class="demo-block">
      <div class="demo-block__title">支持的文件类型</div>
      <div class="demo-block__content">
        <a-table
          :columns="typeColumns"
          :data-source="typeData"
          :pagination="false"
          bordered
          size="small"
        />
      </div>
    </div>

    <!-- API -->
    <div class="api-section">
      <h2>API</h2>
      <a-table
        :columns="apiColumns"
        :data-source="apiData"
        :pagination="false"
        bordered
        size="small"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { FilePreview } from "@vmf-kit/comp";

const fileInputRef = ref<HTMLInputElement>();
const currentFile = ref<File | string | null>(null);

const acceptTypes =
  ".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.ico,.pdf,.docx,.xlsx,.xls,.csv,.pptx,.txt,.log,.md,.js,.ts,.vue,.jsx,.tsx,.py,.java,.c,.cpp,.go,.rs,.rb,.php,.sh,.html,.css,.scss,.less,.json,.xml,.yaml,.yml,.sql";

const currentFileName = computed(() => {
  if (!currentFile.value) return "";
  if (typeof currentFile.value === "string") {
    return currentFile.value.split("/").pop() || "file";
  }
  return currentFile.value.name;
});

const currentFileType = computed(() => {
  const name = currentFileName.value;
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return ext.toUpperCase();
});

function triggerFileInput() {
  fileInputRef.value?.click();
}

function handleFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    currentFile.value = input.files[0];
  }
}

// 表格数据
const typeColumns = [
  { title: "文件类型", dataIndex: "type", key: "type", width: 120 },
  { title: "支持的扩展名", dataIndex: "exts", key: "exts" },
  { title: "预览方式", dataIndex: "method", key: "method", width: 200 },
];

const typeData = [
  { key: "1", type: "图片", exts: "jpg, jpeg, png, gif, webp, svg, bmp, ico", method: "原生 <img> + 缩放/旋转" },
  { key: "2", type: "PDF", exts: "pdf", method: "pdfjs-dist Canvas 渲染" },
  { key: "3", type: "Word", exts: "docx", method: "docx-preview DOM 渲染" },
  { key: "4", type: "Excel", exts: "xlsx, xls, csv", method: "xlsx 解析 + HTML 表格" },
  { key: "5", type: "PPT", exts: "pptx", method: "pptx-preview 渲染" },
  { key: "6", type: "文本", exts: "txt, log, md", method: "原生 <pre> 展示" },
  { key: "7", type: "代码", exts: "js, ts, vue, jsx, tsx, py, java, c, cpp, go 等", method: "highlight.js 语法高亮" },
];

const apiColumns = [
  { title: "属性", dataIndex: "prop", key: "prop" },
  { title: "说明", dataIndex: "desc", key: "desc" },
  { title: "类型", dataIndex: "type", key: "type" },
  { title: "默认值", dataIndex: "default", key: "default" },
];

const apiData = [
  { key: "1", prop: "file", desc: "文件源：远程 URL 或 File 对象", type: "string | File", default: "-" },
  { key: "2", prop: "fileType", desc: "手动指定文件类型（不指定则自动检测）", type: "'image' | 'pdf' | 'word' | 'excel' | 'ppt' | 'text' | 'code'", default: "-" },
  { key: "3", prop: "width", desc: "容器宽度", type: "string | number", default: "'100%'" },
  { key: "4", prop: "height", desc: "容器高度", type: "string | number", default: "'600px'" },
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

.demo-block__content {
  padding: 20px;
  border-top: 1px dashed #e8e8e8;
}

.upload-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-input {
  display: none;
}

.file-name {
  font-size: 14px;
  color: #4e5969;
  display: flex;
  align-items: center;
  gap: 8px;
}

.file-type-tag {
  display: inline-block;
  padding: 1px 6px;
  font-size: 11px;
  color: #1890ff;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 3px;
}

.preview-container {
  padding: 0 !important;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #8c8c8c;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 14px;
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
</style>
