<template>
  <el-dropdown class="right-menu-item" @command="handleCommand">
    <div class="user"></div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="userInfo">
          <span>个人信息</span>
        </el-dropdown-item>
        <el-dropdown-item command="logoOut">
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <commonDialog
    v-model:modelValue="userInfoDialog"
    top="8vh"
    width="560px"
    :hideFooter="false"
    title="个人信息"
    @close="closeSelectDialog()"
  >
    <div class="info-content">
      <div>123</div>
    </div>
  </commonDialog>
</template>

<script lang="ts" setup>
import commonDialog from "@/components/common-dialog/index.vue"

const userInfoDialog = ref<boolean>(false)
const handleCommand = (command: string) => {
  if (command === "userInfo") {
    userInfoDialog.value = true
  }
}
</script>

<style scoped lang="scss">
.user {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #fff;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
