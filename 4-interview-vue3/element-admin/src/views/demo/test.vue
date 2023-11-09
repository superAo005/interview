<!-- 字典组件示例 -->
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  watchEffect,
  onBeforeUpdate,
  onUpdated,
  ref,
  reactive,
} from "vue";
const state = ref(0);
const person = reactive({
  count: 0,
});
const change2 = () => {
  state.value++;
  person.count++;
};
onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  console.log("onMounted");
});
onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});
onUpdated(() => {
  console.log("onUpdated");
});
watchEffect(
  () => {
    console.log("----------------");
    const el = document.querySelector(".h1");
    console.log("Dom 内容：", el?.textContent);
    console.log(person.count);
    console.log(state.value);
  },
  {
    // flush: "post",
    // flush: "sync",
    onTrack(e) {
      console.log(e, "track");
    },
    onTrigger(e) {
      console.log(e, "trigger");
    },
  }
);
const deer = reactive({
  foo: 0,
});
const change = () => {
  deer.foo++;
};

watch(deer, (newV, oldV) => {
  console.log("deer: ", oldV === newV);
});

watch(
  () => JSON.parse(JSON.stringify(deer)),
  (newV, oldV) => {
    console.log("deer2: ", oldV === newV);
  }
);
</script>

<template>
  <div class="app-container">
    <button @click="change2">点击1</button>
    <button @click="change">点击2</button>
    <h1 class="h1">{{ state }}</h1>
  </div>
</template>
