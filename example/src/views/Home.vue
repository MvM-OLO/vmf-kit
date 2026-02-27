<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-content">
        <img :src="Logo" class="hero-logo" alt="vmf-kit" />
        <h1 class="hero-title">vmf-kit</h1>
        <p class="hero-subtitle">一个现代化的 Vue 3 组件库，提供高质量的业务组件</p>
        <div class="hero-actions">
          <a-button type="primary" size="large" @click="$router.push('/components/file-preview')">
            开始使用
          </a-button>
          <a-button size="large" href="https://github.com" target="_blank">
            GitHub
          </a-button>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features">
      <div class="feature-card" v-for="feature in features" :key="feature.title">
        <div class="feature-icon">
          <component :is="feature.icon" />
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.desc }}</p>
      </div>
    </div>

    <!-- Components Section -->
    <div class="components-section">
      <h2 class="section-title">组件一览</h2>
      <div class="component-grid">
        <div
          class="component-card"
          v-for="comp in components"
          :key="comp.name"
          @click="$router.push(comp.path)"
        >
          <div class="component-card__icon">
            <component :is="comp.icon" />
          </div>
          <div class="component-card__info">
            <h4>{{ comp.name }}</h4>
            <p>{{ comp.desc }}</p>
          </div>
          <RightOutlined class="component-card__arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ThunderboltOutlined,
  BuildOutlined,
  ApiOutlined,
  FileSearchOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import Logo from "@assets/multifunc_kit_icon.png";

const features = [
  {
    icon: ThunderboltOutlined,
    title: "开箱即用",
    desc: "基于 Vue 3 + TypeScript，提供完善的类型定义和开发体验",
  },
  {
    icon: BuildOutlined,
    title: "业务驱动",
    desc: "组件设计贴合实际业务场景，减少重复开发工作",
  },
  {
    icon: ApiOutlined,
    title: "灵活扩展",
    desc: "支持全局注册与按需引入，提供丰富的 API 和插槽",
  },
];

const components = [
  {
    icon: FileSearchOutlined,
    name: "FilePreview 文件预览",
    desc: "通用文件预览，支持图片/PDF/Word/Excel/PPT/代码等",
    path: "/components/file-preview",
  },
  {
    icon: EditOutlined,
    name: "RichTextEditor 富文本编辑器",
    desc: "基于 Tiptap 的富文本编辑器，支持截图粘贴上传",
    path: "/components/rich-text-editor",
  },
];
</script>

<style scoped>
.home {
  width: 100%;
  min-height: 100%;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 60px 40px;
  text-align: center;
  margin-bottom: 32px;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-logo {
  width: 72px;
  height: 72px;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
}

.hero-title {
  font-size: 42px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 12px;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 28px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.feature-card {
  background: #fff;
  border-radius: 10px;
  padding: 28px 24px;
  text-align: center;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  font-size: 32px;
  color: #667eea;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 17px;
  font-weight: 600;
  color: #1d2129;
  margin: 0 0 8px;
}

.feature-card p {
  font-size: 13px;
  color: #86909c;
  margin: 0;
  line-height: 1.6;
}

/* Components Section */
.components-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #1d2129;
  margin: 0 0 20px;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.component-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.component-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.12);
}

.component-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.component-card__info {
  flex: 1;
  min-width: 0;
}

.component-card__info h4 {
  font-size: 15px;
  font-weight: 600;
  color: #1d2129;
  margin: 0 0 4px;
}

.component-card__info p {
  font-size: 12px;
  color: #86909c;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.component-card__arrow {
  color: #c9cdd4;
  font-size: 12px;
  flex-shrink: 0;
  transition: all 0.3s;
}

.component-card:hover .component-card__arrow {
  color: #667eea;
  transform: translateX(4px);
}

/* Responsive */
@media screen and (max-width: 768px) {
  .hero {
    padding: 40px 24px;
  }

  .hero-title {
    font-size: 32px;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .component-grid {
    grid-template-columns: 1fr;
  }
}
</style>
