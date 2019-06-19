<template>
  <div class="wrapper">
    <el-row class="menu-page">
      <el-col :span="24">
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
            <el-submenu v-show="item.children" :index="item.path" :key="index+1">
              <template slot="title">
                <i :class="[item.icon]" :key="index+2"></i>
                <span slot="title" :key="index+3">{{item.name}}</span>
              </template>
              <router-link :to="citem.path" v-for="(citem, cindex) in item.children" :key="cindex">
                <el-menu-item :index="citem.path" class="menu-item">
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
        name: '信息管理',
        path: 'fund',
        children: [
          {path: 'fundlist', name: '学生信息'}
        ]
      },
      {
        icon: 'el-icon-s-check',
        name: '个人中心',
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
.wrapper{
  float: left;
  width: 15%;
  height: 100%;
}
.wrapper .menu-page{
  height: 100%;
}
.wrapper .menu-page .el-menu-vertical-demo{
  height: 683px;
  border: 1px solid #324057;
}
.wrapper .menu-page .el-menu-vertical-demo .menu-item{
  min-width: 117px;
}
</style>
