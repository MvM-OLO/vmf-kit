<template>
  <div class="text-previewer">
    <pre class="text-content">{{ content }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toText } from "../helper";

const props = defineProps<{
  file: string | File;
}>();

const content = ref("");

onMounted(async () => {
  try {
    content.value = await toText(props.file);
  } catch (err) {
    console.error("文本读取失败:", err);
  }
});
</script>

<style scoped>
.text-previewer {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fff;
  padding: 20px;
}

.text-content {
  margin: 0;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 14px;
  line-height: 1.7;
  color: #333;
  white-space: pre-wrap;
  word-break: break-word;
  tab-size: 4;
}
</style>
