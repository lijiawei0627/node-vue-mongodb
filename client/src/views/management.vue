<template>
  <div>
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="学号查找">
        <el-input v-model="query.id" placeholder="输入个人学号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
         <el-button type="primary" @click="onEdit">{{ this.dialog.button }}</el-button>
      </el-form-item>
    </el-form>
    <el-row class="info">
      <el-col :span="20" class="table">
        <el-form :model="information" status-icon ref="infoForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name" class="list">
        <el-input type="text" v-model="information.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" class="list">
        <el-radio-group v-model="information.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age" class="list">
        <el-input v-model.number="information.age"></el-input>
      </el-form-item>
      <!-- <div class="img">
        <img src="../assets/index.jpg" alt="">
      </div> -->
      <el-form-item label="学号" prop="num" class="list">
        <el-input type="number" v-model="information.num" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="曾用名" prop="beforeName" class="list">
        <el-input type="text" v-model="information.beforeName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="grade" class="list">
        <el-input v-model.number="information.grade"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="class" class="list">
        <el-input type="text" v-model="information.class" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="major" class="list">
        <el-input type="text" v-model="information.major" auto-complete="off"></el-input>
      </el-form-item>
            <el-form-item label="政治面貌" class="list">
        <el-select v-model="information.face" placeholder="请选择身份">
          <el-option label="共青团员" value="共青团员"></el-option>
          <el-option label="共产党员" value="共产党员"></el-option>
          <el-option label="群众" value="群众"></el-option>
        </el-select>
      </el-form-item>
      <div class="title">出生年月日</div>
      <div class="list">
        <el-date-picker
        class="date"
        v-model="information.year"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
    </el-form>
      </el-col>
      <el-col :span="4" class="phone">
        <el-upload
          class="avatar-uploader"
          action="/api/info/updata"
          :data="{id: this.user.id}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="information.imageUrl" :src="information.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-col>
    </el-row>
    <edit-info @changeShow="changeShow" :dialog='dialog' :information='information'></edit-info>
  </div>
</template>

<script>
import EditInfo from '../components/EditInfo'
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        information: {
          name: '',
          gender: '男',
          age: '',
          num: '',
          class: '',
          beforeName: '',
          grade: '',
          year: '',
          face: '',
          major: ''
        },
        query: {
          id: ''
        },
        dialog: {
          show: false,
          button: ''
        },
        formData: {
          name: '',
          gender: '男',
          age: '',
          num: '',
          class: '',
          beforeName: '',
          grade: '',
          year: '',
          face: '',
          major: '',
          imageUrl: '',
          id: ''
        }
      }
    },
    components: {
      EditInfo
    },
    computed: {
    ...mapGetters(['user'])
    },
    created() {
      this.getData();
      this.formData.id = this.user.id;
    },
    methods: {
      onSubmit () {
        console.log('submit!');
      },
      onEdit () {
        this.dialog.show = true;
      },
      _initData () {
        this.imageUrl = localStorage.imageUrl;
      },
      handleAvatarSuccess (res, file) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.information.imageUrl = URL.createObjectURL(file.raw);
        localStorage.setItem('imageUrl', URL.createObjectURL(file.raw));
        this._initData();
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
      },
      changeShow (changeData) {
        console.log(changeData)
        this.dialog.show = changeData;
      },
      getData () {
        this.$axios.post('/api/info/', {id: this.user.id})
          .then((res) => {
            if (res.data.error) {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
            let data = res.data;
            this.information = data;
            if (this.information.id) {
              this.dialog.button = '编辑'
            } else {
              this.dialog.button = '添加个人信息'
            }
          })
      }
    }
  }
</script>

<style scoped>
.info{
  margin-left: 15%;
  border: 1px solid black;
  overflow: hidden;
  width: 70%;
  margin: 0 auto;
}
.info .table {
  padding: 20px;
}
.info .table .list {
  margin: 0px;
  width: 200px;
  height: 50px;
  float: left;
  margin: 0;
}
.info .table .title {
  float: left;
  height: 40px;
  width: 80px;
  line-height: 40px;
  text-align: center;
  margin-right: 10px;
}
.info .phone {
  margin: 0 auto;
}
.info .phone .avatar-uploader{
  width: 200px;
  height: 210px;
}
.info .phone .avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 210px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.info .phone .avatar-uploader .avatar {
  width: 200px;
  height: 210px;
  border-radius: 50%;
}


</style>