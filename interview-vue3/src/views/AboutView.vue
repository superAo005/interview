<template>
  <div class="about">
    <h1>count:{{ countStore.count }}</h1>
    <h2>count*2:{{ countStore.doubleCount }}</h2>
    <button @click="countStore.increment">+</button>
  </div>
</template>
<script setup>
import { useCounterStore } from '../stores/counter'
const countStore = useCounterStore()
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
