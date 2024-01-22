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
import { computed, ref, shallowRef } from "vue";
import Dialog from "./Dialog.vue";
interface Props {
  /** 控制 modal 显隐 */
  modelValue: boolean;
}
// const props = defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});
const emit = defineEmits<{
  "update:modelValue": [boolean];
}>();
const inputRef = ref<HTMLInputElement | null>(null);
const scrollbarRef = ref<InstanceType<typeof ElScrollbar> | null>(null);
const searchResultRef = ref<InstanceType<typeof Dialog> | null>(null);
const modalVisible = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});
</script>
<style scoped lang="scss">
.app-contaier {
}
</style>
