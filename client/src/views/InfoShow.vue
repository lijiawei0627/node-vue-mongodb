<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div>
          <el-upload
            class="avatar-uploader"
            action="/api/users/updata"
            :data="{id: user.id}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="icon" :src="icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
            <span>{{user.identity}}</span>
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
  data() {
    return {
      icon: ''
    }
  },
  mounted() {
    this._initData();
  },
  methods: {
    _initData () {
      this.icon = localStorage.icon;
    },
    handleAvatarSuccess(res, file) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      localStorage.setItem('icon', URL.createObjectURL(file.raw));
      this._initData();
      // this.data = JSON.parse(JSON.stringify(this.user));
      // this.data.icon = URL.createObjectURL(file.raw);
      // console.log(this.data)
      // localStorage.user = this.data;
      // this.$store.dispatch('setUser', this.data)
      // console.log(this.user)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    position: absolute;
    width: 178px;
    height: 178px;
    margin: 0 10%;
    top: 30%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 178px;
    height: 178px;
    /* display: block; */
    border-radius: 50%;
  }
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
