<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-01 16:20:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-01 18:04:28
 * @Description : 
-->
<script setup>
import { onMounted } from 'vue'
import TimeSenseJQ from './00Demos/TimeSenseJQ.vue'
import { observable } from "./00Demos/Observable";
onMounted(() => {
  observable.on(receiveMsg)
})
function receiveMsg(data) {
  console.log(data)
}
</script>

<template>
  <TimeSenseJQ/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
