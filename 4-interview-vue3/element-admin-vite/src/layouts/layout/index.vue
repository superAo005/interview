<script lang="ts" setup>
import { AppMain, HeaderNav, HeaderRight, TopBar } from "./components"
</script>

<template>
  <div class="app-wrapper">
    <!-- 页面头部 -->
    <header class="fixed-header layout-header">
      <div class="content">
        <h1 class="logo">
          <SvgIcon name="logo" />
        </h1>
        <!-- 头部导航 -->
        <HeaderNav class="header-nav" />
        <HeaderRight />
      </div>
    </header>
    <!-- 二级导航 -->
    <TopBar />
    <!-- 页面主体内容 -->
    <AppMain class="app-main" />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";
$transition-time: 0.35s;
.app-wrapper {
  @extend %clearfix;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/layouts/bg2.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: #ddecff;
}
.fixed-header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
.layout-header {
  height: var(--wise-header-height);
  // background: var(--wise-body-bg-color);
  .content {
    display: flex;
    height: 100%;
    .header-nav {
      flex: 1;
      background: transparent;
    }
  }
  .logo {
    width: 240px;
    text-align: center;
    line-height: 80px;
    .svg-icon {
      width: 116px;
      height: 26px;
    }
  }
}
.app-main {
  transition: padding-top $transition-time;
  padding-top: var(--wise-header-height);
  height: 100vh;
  min-height: 600px;
  max-width: 1440px;
  margin: 0 auto;
}
</style>
