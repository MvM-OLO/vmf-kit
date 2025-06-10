<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p class="message">抱歉，您访问的页面不存在</p>
      <y-button type="primary" class="back-home" @click="$router.push('/')">
        返回首页
      </y-button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.content {
  text-align: center;
  padding: 48px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 72px;
  color: #1890ff;
  margin: 0 0 24px;
  line-height: 1;
}

.message {
  font-size: 20px;
  color: #666;
  margin: 0 0 32px;
}
</style>
