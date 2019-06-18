<template>
  <div>
    <el-row class="menu-page">
  <el-col :span="12">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#409eff">
      <router-link to="/home">
        <el-menu-item index="0">
          <i class="el-icon-collection"></i>
          <span>首页</span>
        </el-menu-item>
      </router-link>
        <template v-for="(item, index) in this.items">
          <el-submenu v-show="item.children" :index="item.path" :key="index">
            <template slot="title">
              <i :class="[item.icon]" :key="index"></i>
              <span slot="title" :key="index">{{item.name}}</span>
            </template>
            <router-link :to="citem.path" v-for="(citem, cindex) in item.children" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
    </el-menu>
  </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  data() {
    return {
      items: [
        {
        icon: 'el-icon-coin',
        name: '资金管理',
        path: 'fund',
        children: [
          {path: 'fundlist', name: '资金流水'}
        ]
      },
      {
        icon: 'el-icon-s-check',
        name: '信息管理',
        path: 'info',
        children: [
          {path: 'infoshow', name: '个人信息'}
        ]
      }
      ]
    }
  }
}
</script>

<style scoped>

</style>
