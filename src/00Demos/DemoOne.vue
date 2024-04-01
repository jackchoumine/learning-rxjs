<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-01 17:52:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-01 18:01:55
 * @Description : 
-->
<script setup>
import { observable } from './Observable'
function onClick() {
    observable.emit(1)
}
</script>

<template>
  <div class="DemoOne">
    <button @click="onClick">发送消息</button>
  </div>
</template>

<style scoped lang="scss">
.DemoOne {
    // scss code
}
</style>
