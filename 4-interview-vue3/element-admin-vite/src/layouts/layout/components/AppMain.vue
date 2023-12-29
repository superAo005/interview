<script lang="ts" setup></script>
<template>
  <main class="app-main">
    <div class="app-scrollbar">
      <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
      <router-view v-slot="{ Component, route }">
        <transition name="el-fade-in" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.app-scrollbar {
  overflow: hidden;
  @extend %scrollbar;
  display: flex;
  flex-direction: column;
  height: 100%;
  .app-container-grow {
    flex-grow: 1;
  }
}
</style>
