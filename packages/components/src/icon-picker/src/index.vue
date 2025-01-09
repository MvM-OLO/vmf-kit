<template>
  <div class="flex w-full items-center gap-2">
    <Select
      class="w-full"
      :value="value"
      placeholder="选择图标"
      @change="handleChange"
      show-search
      :filter-option="false"
      @search="handleSearch"
      :loading="false"
      :show-arrow="true"
    >
      <template v-if="searchTerm">
        <SelectOption v-for="icon in filteredIcons" :key="icon" :value="icon">
          <div class="icon-item">
            <Icon :icon="icon" class="icon" />
            <span>{{ icon }}</span>
          </div>
        </SelectOption>
      </template>
      <template v-else>
        <SelectOptGroup
          v-for="(icons, category) in iconCategories"
          :key="category"
          :label="getCategoryLabel(category)"
        >
          <SelectOption v-for="icon in icons" :key="icon" :value="icon">
            <div class="icon-item">
              <Icon :icon="icon" class="icon" />
              <span>{{ icon }}</span>
            </div>
          </SelectOption>
        </SelectOptGroup>
      </template>
    </Select>
    <Icon v-if="value" :icon="value" class="selected-icon-display" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import type { SelectValue } from "ant-design-vue/es/select";
import { Select, SelectOption, SelectOptGroup } from "ant-design-vue";
import { icons, iconCategories } from "./icons";

interface Props {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
});

const emit = defineEmits<{
  (e: "update:value", value: string): void;
  (e: "change", value: string): void;
}>();

const searchTerm = ref("");

// 获取分类标签
function getCategoryLabel(category: string): string {
  const labelMap: Record<string, string> = {
    system: "系统图标",
    navigation: "导航图标",
    user: "用户图标",
    communication: "通信图标",
    action: "操作图标",
    status: "状态图标",
    media: "媒体图标",
    other: "其他图标",
  };
  return labelMap[category] || category;
}

// 过滤图标
const filteredIcons = computed(() => {
  const search = searchTerm.value.toLowerCase().trim();
  if (!search) return [];

  return icons.filter((icon) => {
    const iconName = icon.toLowerCase();
    // 支持多个关键词搜索，用空格分隔
    const searchTerms = search.split(/\s+/);
    return searchTerms.every((term) => iconName.includes(term));
  });
});

// 处理图标选择
function handleChange(value: SelectValue) {
  if (typeof value === "string") {
    emit("update:value", value);
    emit("change", value);
  }
}

// 处理搜索输入
function handleSearch(value: string) {
  searchTerm.value = value;
}
</script>

<style scoped>
.icon-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
}

.selected-icon-display {
  width: 20px;
  height: 20px;
}
</style>
