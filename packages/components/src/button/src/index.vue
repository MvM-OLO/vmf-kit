<template>
  <button class="y-button" :class="typeClass">
    <slot></slot>
  </button>
</template>
<script name="YButton" setup>
import { computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
});
//类似 ant button type='primary' 用法
const typeClass = computed(() => `button-${props.type}`);
</script>

<style lang="less" scoped>
.y-button {
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;

  &-default {
    background-color: #eee;
    color: #333;
  }

  &-primary {
    background-color: #007bff;
    color: #fff;
  }
}
</style>
