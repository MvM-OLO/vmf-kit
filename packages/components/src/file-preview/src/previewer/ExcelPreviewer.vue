<template>
  <div class="excel-previewer">
    <div v-if="sheetNames.length > 1" class="excel-previewer__tabs">
      <button
        v-for="name in sheetNames"
        :key="name"
        class="sheet-tab"
        :class="{ active: activeSheet === name }"
        @click="switchSheet(name)"
      >
        {{ name }}
      </button>
    </div>
    <div class="excel-previewer__table-wrap">
      <table class="excel-table" v-if="tableData.length">
        <thead>
          <tr>
            <th v-for="(cell, j) in tableData[0]" :key="j">{{ cell }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in tableData.slice(1)" :key="i">
            <td v-for="(cell, j) in row" :key="j">{{ cell ?? "" }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="excel-empty">暂无数据</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as XLSX from "xlsx";
import { toArrayBuffer } from "../helper";

const props = defineProps<{
  file: string | File;
}>();

const sheetNames = ref<string[]>([]);
const activeSheet = ref("");
const tableData = ref<any[][]>([]);
let workbook: XLSX.WorkBook | null = null;

function switchSheet(name: string) {
  activeSheet.value = name;
  if (!workbook) return;
  const sheet = workbook.Sheets[name];
  tableData.value = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
  });
}

onMounted(async () => {
  try {
    const arrayBuffer = await toArrayBuffer(props.file);
    workbook = XLSX.read(arrayBuffer, { type: "array" });
    sheetNames.value = workbook.SheetNames;

    if (sheetNames.value.length > 0) {
      switchSheet(sheetNames.value[0]);
    }
  } catch (err) {
    console.error("Excel 解析失败:", err);
  }
});
</script>

<style scoped>
.excel-previewer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.excel-previewer__tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 8px;
  background: #fafafa;
  flex-shrink: 0;
  overflow-x: auto;
}

.sheet-tab {
  padding: 8px 16px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  color: #595959;
  white-space: nowrap;
  transition: all 0.2s;
}

.sheet-tab:hover {
  color: #1890ff;
}

.sheet-tab.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
  font-weight: 500;
}

.excel-previewer__table-wrap {
  flex: 1;
  overflow: auto;
  padding: 0;
}

.excel-table {
  border-collapse: collapse;
  width: max-content;
  min-width: 100%;
  font-size: 13px;
}

.excel-table th,
.excel-table td {
  border: 1px solid #e8e8e8;
  padding: 6px 12px;
  text-align: left;
  white-space: nowrap;
}

.excel-table th {
  background: #fafafa;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
}

.excel-table tbody tr:hover {
  background: #f5f5f5;
}

.excel-empty {
  padding: 40px;
  text-align: center;
  color: #8c8c8c;
}
</style>
