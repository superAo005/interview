<template>
  <div class="top-nav">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      @select="handleSelect"
    >
      <div v-for="item in routes" :key="item.path" class="nav-item">
        <app-link :to="resolvePath(item)">
          <el-menu-item v-if="!item.hidden" :index="item.path">{{
            item.meta ? item.meta.title : item.children[0].meta.title
          }}</el-menu-item>
        </app-link>
      </div>
    </el-menu>
  </div>
</template>

<script setup>
import { useSettingsStore } from "@/store/useSettingsStore"
import AppLink from "./Sidebar/Link"
import { constantRoutes } from "@/router"
const routes = ref(constantRoutes)
const router = useRouter()
const { sidebar, setCurrentRouters } = useSettingsStore()
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
onMounted(() => {
  initCurrentRoutes()
})

// 通过当前路径找到二级菜单对应项，存到store，用来渲染左侧菜单
const initCurrentRoutes = () => {
  const { path } = route
  let currentRoute = routes.value.find((item) => item.path === "/" + path.split("/")[1])
  // 如果找不到这个路由，说明是首页
  if (!currentRoute) {
    currentRoute = routes.find((item) => item.path === "/")
  }
  setCurrentRouters(currentRoute)
  setSidebarHide(currentRoute)
}
// 判断该路由是否只有一个子项或者没有子项，如果是，则在一级菜单添加跳转路由
const isOnlyOneChild = (item) => {
  if (item.children && item.children.length === 1) {
    return true
  }
  return false
}
const resolvePath = (item) => {
  // 如果是个完成的url直接返回
  if (isExternal(item.path)) {
    return item.path
  }
  // 如果是首页，就返回重定向路由
  if (item.path === "/") {
    const path = item.redirect
    return path
  }

  // 如果有子项，默认跳转第一个子项路由
  let path = ""
  /**
   * item 路由子项
   * parent 路由父项
   */
  const getDefaultPath = (item, parent) => {
    // 如果path是个外部链接（不建议），直接返回链接，存在个问题：如果是外部链接点击跳转后当前页内容还是上一个路由内容
    if (isExternal(item.path)) {
      path = item.path
      return
    }
    // 第一次需要父项路由拼接，所以只是第一个传parent
    if (parent) {
      path += parent.path + "/" + item.path
    } else {
      path += "/" + item.path
    }
    // 如果还有子项，继续递归
    if (item.children) {
      getDefaultPath(item.children[0])
    }
  }

  if (item.children) {
    getDefaultPath(item.children[0], item)
    return path
  }

  return item.path
}
const handleSelect = (key) => {
  // 把选中路由的子路由保存store
  const route = routes.find((item) => item.path === key)
  setCurrentRouters(route)
  setSidebarHide(route)
}
// 设置侧边栏的显示和隐藏
const setSidebarHide = (route) => {
  if (!route.children || route.children.length === 1) {
    toggleSideBarHide(true)
  } else {
    toggleSideBarHide(false)
  }
}
</script>
