<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p class="message">抱歉，您访问的页面不存在</p>
      <a-button type="primary" size="large" @click="$router.push('/')">
        返回首页
      </a-button>
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
  background: #f7f8fa;
}

.content {
  text-align: center;
  padding: 48px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

h1 {
  font-size: 72px;
  color: #667eea;
  margin: 0 0 24px;
  line-height: 1;
  font-weight: 800;
}

.message {
  font-size: 18px;
  color: #86909c;
  margin: 0 0 32px;
}
</style>
