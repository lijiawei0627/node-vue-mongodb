<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.jpg" alt="">
        <span class="title">米修在线后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img src="https://www.gravatar.com/avatar/5463c51f76cdf12f7ef3790e16c278d8?s=200&r=pg&d=mm" alt="">
          <div class="welcome">
            <div class="name comename">欢迎</div>
            <div class="name avatarname">米斯特李</div>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info" >个人信息</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'HeadNav'
}
</script>

<style lang="stylus" scoped>
.head-nav
  width: 100%
  height: 60px
  min-width: 600px
  padding: 5px
  background: #324057
  color: #ffffff
  border-bottom: 1px solid #1f2d3d
  .logo-container
    height: 60px
    img 
      width: 60px
      height: 60px
      background-size: cover
      border-radius: 50%
    .title
      position: absolute
      left: 70px
      line-height: 60px
      text-align: center
      font-family: 'Microsoft YaHei'
      font-weight: bold
      font-size: 16px
      color: #fff
  .user
    position: absolute
    height: 60px
    line-height: 60px
    top: 0
    right: 0
    .userinfo
      height: 60px
      line-height: 60px
      text-align: center
      img 
        position: absolute
        top: 0
        right: 80px
        width: 40px
        height: 40px
        border-radius: 50%
        margin-top: 10px
      .welcome
        position: absolute
        top: 0
        right: 30px
        height: 60px
        line-height: 60px
        font-size: 14px
        .comename
          width: 45px
          height: 20px
          margin-top: -8px
        .avatarname
          width: 45px
          height: 20px
      .username
        position: absolute
        right: 10px
        .el-dropdown
          color: #fff
</style>
