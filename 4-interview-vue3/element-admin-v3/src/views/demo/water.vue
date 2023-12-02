<template>
  <div class="box" ref="boxRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getMark } from "@/utils/waterMark";
const boxRef = ref(null);
const { waterMark } = getMark();
onMounted(() => {
  waterMark("PandaGuo", true, boxRef.value!); // 添加水印
});
</script>

<style scoped>
.box {
  width: 500px;
  height: 500px;
  background-color: black;
}
</style>
