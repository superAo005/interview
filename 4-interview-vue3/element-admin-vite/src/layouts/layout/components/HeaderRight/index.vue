<script setup>
import HeaderSearch from "./HeaderSearch.vue"
import headerUser from "./HeaderUser.vue"
</script>

<template>
  <div class="header-r">
    <header-search />
    <!-- 头像 -->
    <header-user />
  </div>
</template>

<style scoped lang="scss">
.header-r {
  padding-right: 20px;
  display: flex;
  align-items: center;
}
</style>
