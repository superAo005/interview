<!--
* @Author: yzw
* @Date: 2024-01-04
* @LastEditTime: 2024-01-04
* @LastEditors: yzw
* @Description:
 -->
<template>
  <div class="app-contaier"></div>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
defineProps<{ msg: string }>();
defineEmits(["update"]);
const ref: Ref<HTMLElement | null> = ref(null);
</script>
<style scoped lang="scss">
.app-contaier {
}
</style>
