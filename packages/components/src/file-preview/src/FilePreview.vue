<template>
  <div
    class="file-preview"
    :style="{
      width: typeof width === 'number' ? width + 'px' : width,
      height: typeof height === 'number' ? height + 'px' : height,
    }"
  >
    <!-- Loading -->
    <div v-if="loading" class="file-preview__loading">
      <div class="loading-spinner"></div>
      <span class="loading-text">文件加载中…</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="file-preview__error">
      <div class="error-icon">✕</div>
      <div class="error-text">{{ error }}</div>
    </div>

    <!-- Unsupported -->
    <div v-else-if="resolvedType === 'unknown'" class="file-preview__unsupported">
      <div class="unsupported-icon">📄</div>
      <div class="unsupported-text">不支持预览该文件类型</div>
      <div class="unsupported-name">{{ fileName }}</div>
    </div>

    <!-- Image -->
    <ImagePreviewer v-else-if="resolvedType === 'image'" :file="file" />

    <!-- PDF -->
    <PdfPreviewer v-else-if="resolvedType === 'pdf'" :file="file" />

    <!-- Word -->
    <WordPreviewer v-else-if="resolvedType === 'word'" :file="file" />

    <!-- Excel -->
    <ExcelPreviewer v-else-if="resolvedType === 'excel'" :file="file" />

    <!-- PPT -->
    <PptPreviewer v-else-if="resolvedType === 'ppt'" :file="file" />

    <!-- Text -->
    <TextPreviewer v-else-if="resolvedType === 'text'" :file="file" />

    <!-- Code -->
    <CodePreviewer v-else-if="resolvedType === 'code'" :file="file" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { FilePreviewProps, FileType } from "./type";
import { detectFileType, getFileName } from "./helper";
import ImagePreviewer from "./previewer/ImagePreviewer.vue";
import PdfPreviewer from "./previewer/PdfPreviewer.vue";
import WordPreviewer from "./previewer/WordPreviewer.vue";
import ExcelPreviewer from "./previewer/ExcelPreviewer.vue";
import PptPreviewer from "./previewer/PptPreviewer.vue";
import TextPreviewer from "./previewer/TextPreviewer.vue";
import CodePreviewer from "./previewer/CodePreviewer.vue";

defineOptions({ name: "FilePreview" });

const props = withDefaults(defineProps<FilePreviewProps>(), {
  width: "100%",
  height: "600px",
});

const loading = ref(false);
const error = ref("");

const resolvedType = computed<FileType>(() => {
  if (!props.file) return "unknown";
  return props.fileType || detectFileType(props.file);
});

const fileName = computed(() => getFileName(props.file));

watch(
  () => props.file,
  () => {
    error.value = "";
  }
);
</script>

<style scoped>
.file-preview {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
  background: #fafafa;
  display: flex;
  flex-direction: column;
}

/* Loading */
.file-preview__loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e8e8e8;
  border-top-color: #1890ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 14px;
  color: #8c8c8c;
}

/* Error */
.file-preview__error {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.error-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff1f0;
  color: #ff4d4f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.error-text {
  font-size: 14px;
  color: #ff4d4f;
}

/* Unsupported */
.file-preview__unsupported {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.unsupported-icon {
  font-size: 48px;
}

.unsupported-text {
  font-size: 15px;
  color: #595959;
  font-weight: 500;
}

.unsupported-name {
  font-size: 13px;
  color: #8c8c8c;
}
</style>
