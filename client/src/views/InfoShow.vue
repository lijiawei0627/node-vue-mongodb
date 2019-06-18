<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar" class="avatar" alt="">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="el-icon-user-solid"></i>
            <span>{{user.name}}</span>
          </div>
          <div class="user-item">
            <i class="el-icon-s-tools"></i>
            <span>{{user.identity == 'manager'? '管理员': '员工'}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'InfoShow',
  computed: {
    ...mapState(['user'])
  },
}
</script>

<style scoped>
.infoshow{
  height: 100%;
  overflow: hidden;
}
.infoshow .row-bg{
  width: 100%;
  height: 100%;
}
.infoshow .row-bg .user{
  height: 100%;
  margin: 0 auto;
}
.infoshow .row-bg .user img{
  position: relative;
  top: 30%;
  left: 50%;
  margin-left: -85px;
  width: 170px;
  height: 170px;
  background-size: cover;
  border-radius: 50%;
}
.infoshow .row-bg .userinfo {
  background-color: #eee;
  height: 100%;
}
.infoshow .row-bg .user-item{
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #000;
}
</style>
