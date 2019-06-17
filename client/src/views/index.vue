<template>
  <div class="index">
    <head-nav></head-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav'
export default {
  name: 'index',
  components: {
    HeadNav
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 754px;
  overflow: hidden;
}
</style>
