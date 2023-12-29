<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
// import { storeToRefs } from "pinia"
import { usePermissionStore } from "@/store/permission"
import SidebarItem from "./SidebarItem.vue"
const route = useRoute()
const permissionStore = usePermissionStore()
const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path
  } = route
  return activeMenu ? activeMenu : path
})
</script>

<template>
  <div class="header-nav">
    <el-menu
      :default-active="activeMenu"
      :unique-opened="true"
      :collapse-transition="false"
      mode="horizontal"
      menu-trigger="click"
    >
      <SidebarItem v-for="route in permissionStore.routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.header-nav {
  display: flex;
  justify-content: space-between;
  flex: 1;
  min-width: 0px;
  :deep(.el-menu) {
    background: none;
  }
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: var(--el-menu-active-color) !important;
      }
    }
  }
}
.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}
.el-menu--horizontal {
  height: var(--wise-navigationbar-height);
}
:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: var(--wise-navigationbar-height);
  line-height: var(--wise-navigationbar-height);
  &.is-active,
  &:hover {
    background-color: transparent;
  }
  display: block;
  * {
    vertical-align: middle;
  }
}
:deep(.el-sub-menu) {
  height: 100%;
  display: flex;
  &.is-active {
    > .el-sub-menu__title {
    }
  }
  .el-sub-menu__title {
    .el-icon {
      display: none;
    }
  }
}
</style>
