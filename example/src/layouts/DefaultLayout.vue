<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <div class="logo" @click="$router.push('/')">
          <img :src="Logo" alt="vmf-kit" />
          <span class="logo-text">vmf-kit</span>
          <a-tag color="blue" class="logo-tag">组件库</a-tag>
        </div>
        <div class="header-right">
          <a
            href="https://github.com"
            target="_blank"
            class="header-link"
          >
            <GithubOutlined />
          </a>
        </div>
      </div>
    </header>

    <div class="main-container">
      <aside class="sidebar" :class="{ collapsed: isCollapsed }">
        <side-menu v-model:collapsed="isCollapsed" />
      </aside>

      <main class="main-content" :class="{ 'main-collapsed': isCollapsed }">
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GithubOutlined } from "@ant-design/icons-vue";
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
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e5e6eb;
  z-index: 1000;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.logo img {
  width: 28px;
  height: 28px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: #1d2129;
  letter-spacing: -0.3px;
}

.logo-tag {
  margin-left: 2px;
  font-size: 11px;
  line-height: 18px;
  height: 20px;
  border-radius: 4px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-link {
  font-size: 20px;
  color: #4e5969;
  transition: color 0.2s;
}

.header-link:hover {
  color: #1d2129;
}

.main-container {
  display: flex;
  min-height: calc(100vh - 56px);
  width: 100%;
  margin-top: 56px;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 56px;
  bottom: 0;
  width: 240px;
  background: #001529;
  transition: width 0.2s;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 80px;
}

.main-content {
  flex: 1;
  padding: 28px 32px;
  margin-left: 240px;
  background: #f7f8fa;
  transition: margin-left 0.2s;
  min-height: calc(100vh - 56px);
}

.main-content.main-collapsed {
  margin-left: 80px;
}

.content-wrapper {
  max-width: 1100px;
  margin: 0 auto;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.collapsed {
    transform: translateX(0);
    width: 240px;
  }

  .main-content {
    margin-left: 0;
    padding: 16px;
  }

  .main-content.main-collapsed {
    margin-left: 0;
  }
}
</style>
