<template>
  <div>
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script setup>
import { useSettingsStore } from "@/store/useSettingsStore"
import SidebarItem from "./SidebarItem"
const { sidebar, setCurrentRouters, currentRoutes } = useSettingsStore()
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  // 如果是首页，首页高亮
  if (path === "/dashboard") {
    return "/"
  }
  // 如果不是首页，高亮一级菜单
  const activeMenu = "/" + path.split("/")[1]
  return activeMenu
})
const routes = computed(() => {
  return currentRoutes.value.children
})
const isCollapse = computed(() => !sidebar.opened)
</script>
