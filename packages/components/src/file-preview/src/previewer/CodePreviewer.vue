<template>
  <div class="code-previewer">
    <div class="code-previewer__header">
      <span class="code-lang">{{ language }}</span>
    </div>
    <pre class="code-block"><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { toText, getFileName, getFileExtension, getLanguageByExt } from "../helper";

const props = defineProps<{
  file: string | File;
}>();

const highlightedCode = ref("");
const language = ref("plaintext");

onMounted(async () => {
  try {
    const text = await toText(props.file);
    const fileName = getFileName(props.file);
    const ext = getFileExtension(fileName);
    language.value = getLanguageByExt(ext);

    const result = hljs.highlight(text, {
      language: language.value,
      ignoreIllegals: true,
    });
    highlightedCode.value = result.value;
  } catch (err) {
    console.error("代码高亮失败:", err);
  }
});
</script>

<style scoped>
.code-previewer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #282c34;
}

.code-previewer__header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #21252b;
  border-bottom: 1px solid #181a1f;
  flex-shrink: 0;
}

.code-lang {
  font-size: 12px;
  color: #abb2bf;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-block {
  flex: 1;
  overflow: auto;
  margin: 0;
  padding: 16px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 14px;
  line-height: 1.6;
  tab-size: 4;
  color: #abb2bf;
}

.code-block code {
  font-family: inherit;
}
</style>
