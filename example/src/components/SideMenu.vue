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
        <template v-if="item.children && item.children.length">
          <a-sub-menu :key="item.key">
            <template #icon>
              <component :is="item.icon" />
            </template>
            <template #title>{{ item.title }}</template>
            <template v-for="child in item.children" :key="child.key">
              <!-- 嵌套子菜单 -->
              <template v-if="child.children && child.children.length">
                <a-sub-menu :key="child.key">
                  <template #icon>
                    <component :is="child.icon" />
                  </template>
                  <template #title>{{ child.title }}</template>
                  <a-menu-item
                    v-for="grandChild in child.children"
                    :key="grandChild.key"
                  >
                    <template #icon>
                      <component :is="grandChild.icon" />
                    </template>
                    {{ grandChild.title }}
                  </a-menu-item>
                </a-sub-menu>
              </template>
              <template v-else>
                <a-menu-item :key="child.key">
                  <template #icon>
                    <component :is="child.icon" />
                  </template>
                  {{ child.title }}
                </a-menu-item>
              </template>
            </template>
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
import { ref, watch, onMounted } from "vue";
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
const openKeys = ref<string[]>([]);
const isCollapsed = ref(props.collapsed || false);

// 根据当前路由计算展开的菜单
function getOpenKeysByPath(path: string): string[] {
  const keys: string[] = [];
  function find(items: MenuItem[], parentKeys: string[]): boolean {
    for (const item of items) {
      if (item.key === path) {
        keys.push(...parentKeys);
        return true;
      }
      if (item.children) {
        if (find(item.children, [...parentKeys, item.key])) {
          return true;
        }
      }
    }
    return false;
  }
  find(menuItems.value, []);
  return keys;
}

onMounted(() => {
  openKeys.value = getOpenKeysByPath(route.path);
});

// 监听路由变化
watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path];
    if (!isCollapsed.value) {
      const newOpenKeys = getOpenKeysByPath(path);
      // 合并已有的 openKeys
      const merged = new Set([...openKeys.value, ...newOpenKeys]);
      openKeys.value = Array.from(merged);
    }
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
    openKeys.value = getOpenKeysByPath(route.path);
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
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

:deep(.ant-menu::-webkit-scrollbar) {
  display: none; /* Chrome/Safari/Opera */
}

:deep(.ant-menu-inline-collapsed) {
  width: 80px;
}

.menu-toggle {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  font-size: 16px;
  background: #002140;
  transition: color 0.2s;
  flex-shrink: 0;
}

.menu-toggle:hover {
  color: #fff;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  :deep(.ant-menu-inline-collapsed) {
    width: 240px;
  }
}
</style>
