<template>
  <div class="home">
    <div class="welcome-section">
      <h1>欢迎使用 YDZS</h1>
      <p class="subtitle">一个现代化的前端开发框架</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home {
  width: 100%;
  min-height: 100%;
}

.welcome-section {
  text-align: center;
  padding: 40px 20px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 24px;
}

.welcome-section h1 {
  font-size: 36px;
  color: #1890ff;
  margin: 0 0 16px;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin: 0;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 0 12px;
}

.feature-card {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #1890ff;
  margin: 0 0 12px;
}

.feature-card p {
  color: #666;
  margin: 0;
}
</style>
