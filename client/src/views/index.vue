<template>
  <div class="index">
    <head-nav></head-nav>
    <left-nav></left-nav>
    <router-view v-if="IsRouteAlive"></router-view>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav'
import LeftNav from '../components/LeftNav'
export default {
  name: 'index',
  components: {
    HeadNav,
    LeftNav
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      IsRouteAlive: true
    }
  },
  methods: {
    // 父组件定义钩子，以便于子组件用来实现无闪烁刷新
    reload () {
      this.IsRouteAlive = false;
      this.$nextTick (() => {
        this.IsRouteAlive = true
      })
    } 
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
