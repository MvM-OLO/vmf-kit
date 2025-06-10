<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <div class="logo"><img :src="Logo" /> vmf-kit 前端组件库</div>
        <div class="header-right"></div>
      </div>
    </header>

    <div class="main-container">
      <aside class="sidebar" :class="{ collapsed: isCollapsed }">
        <side-menu v-model:collapsed="isCollapsed" />
      </aside>

      <main class="main-content" :class="{ collapsed: isCollapsed }">
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SideMenu from "@components/SideMenu.vue";
import Logo from "@assets/multifunc_kit_icon.png";

const isCollapsed = ref(false);
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
}

.logo img {
  width: 30px;
  height: 30px;
}

.header-right {
  display: flex;
  align-items: center;
}

.main-container {
  display: flex;
  min-height: calc(100vh - 60px);
  width: 100%;
  margin-top: 60px;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 256px;
  background: #001529;
  transition: all 0.2s;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 80px;
}

.main-content {
  flex: 1;
  padding: 24px;
  background: #f0f2f5;
  transition: all 0.2s;
}

.main-content.collapsed {
  margin-left: 80px;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.collapsed {
    transform: translateX(0);
    width: 256px;
  }

  .main-content {
    margin-left: 0;
    padding: 16px;
  }

  .main-content.collapsed {
    margin-left: 0;
  }
}
</style>
