<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { observable } from './Observable'
const msg = ref(0)
onMounted(() => {
    observable.on(observer)
})
onUnmounted(() => {
    observable.un(observer)
})
function observer(data) {
    msg.value += data
}
</script>

<template>
  <div class="DemoOne">
    <p>{{ msg }}</p>
  </div>
</template>

<style scoped lang="scss">
.DemoOne {
    // scss code
}
</style>
