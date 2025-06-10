<template>
  <div class="side-menu">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="isCollapsed"
      @click="handleMenuClick"
    >
      <template v-for="item in menuItems" :key="item.key">
        <!-- 有子菜单的情况 -->
        <template v-if="item.children">
          <a-sub-menu :key="item.key">
            <template #icon>
              <component :is="item.icon" />
            </template>
            <template #title>{{ item.title }}</template>
            <a-menu-item v-for="child in item.children" :key="child.key">
              <template #icon>
                <component :is="child.icon" />
              </template>
              {{ child.title }}
            </a-menu-item>
          </a-sub-menu>
        </template>

        <!-- 没有子菜单的情况 -->
        <template v-else>
          <a-menu-item :key="item.key">
            <template #icon>
              <component :is="item.icon" />
            </template>
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>

    <div class="menu-toggle" @click="toggleCollapse">
      <MenuFoldOutlined v-if="!isCollapsed" />
      <MenuUnfoldOutlined v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import routes from "@/config/routes";
import { transformMenu } from "@/utils/route";

export interface MenuItem {
  key: string;
  title: string;
  icon?: any;
  children?: MenuItem[];
}

const props = defineProps<{
  collapsed?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:collapsed", value: boolean): void;
}>();

const router = useRouter();
const route = useRoute();

// 从路由配置生成菜单项
const menuItems = ref<MenuItem[]>(transformMenu(routes[0].children || []));
const selectedKeys = ref<string[]>([route.path]);
const openKeys = ref<string[]>(["/system"]);
const isCollapsed = ref(props.collapsed || false);

// 监听路由变化
watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path];
  }
);

// 监听折叠状态
watch(
  () => props.collapsed,
  (val) => {
    isCollapsed.value = val || false;
  }
);

// 处理菜单点击
const handleMenuClick = ({ key }: { key: string }) => {
  router.push(key);
};

// 处理折叠切换
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("update:collapsed", isCollapsed.value);

  if (isCollapsed.value) {
    openKeys.value = [];
  } else {
    // 展开时恢复之前展开的子菜单
    const currentOpenKeys = menuItems.value
      .filter((item) => item.children)
      .map((item) => item.key);
    openKeys.value = currentOpenKeys;
  }
};
</script>

<style scoped>
.side-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.ant-menu) {
  flex: 1;
  border-right: none !important;
}

:deep(.ant-menu-inline-collapsed) {
  width: 80px;
}

.menu-toggle {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  background: #002140;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  :deep(.ant-menu-inline-collapsed) {
    width: 256px;
  }
}
</style>
