<template>
  <div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal="false"
    >
    <div class="form">
      <el-form :model="information" ref="form" label-width="120px" style="margin: 10px;width: auto">
        <el-row class="info">
          <el-col :span="20" class="table">
          <el-form :model="information" status-icon :rules="rules" ref="infoForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name" class="list">
            <el-input type="text" v-model="information.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" class="list" prop="gender">
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
          <el-form-item label="政治面貌" class="list" prop="face">
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
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="information.imageUrl" :src="information.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-col>
        </el-row>
          <el-form-item class="text_right">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit('infoForm')">提交</el-button>
            <el-button @click="resetForm('infoForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EditInfo',
  props: {
    dialog: Object,
    information: Object
  },
  data() {
    return {
      rules: {
        name: [{required: true, message: '姓名不能为空', trigger: 'blur' }],
        num: [{required: true, message: '学号不能为空', trigger: 'blur' }],
        major: [{required: true, message: '专业不能为空', trigger: 'blur' }],
        grade: [{required: true, message: '年级不能为空', trigger: 'blur' }],
        year: [{required: true, message: '出生年月不能为空', trigger: 'blur' }],
        age: [{required: true, message: '年龄不能为空', trigger: 'blur' }],
        class: [{required: true, message: '班级不能为空', trigger: 'blur' }],
        face: [{required: true, message: '政治面貌不能为空', trigger: 'blur' }],
      },
      imageUrl: ''
    }
  },
  inject: ["reload"],
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    resetForm (formName) {
     this.$refs[formName].resetFields();
    },
    submit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let url = this.information.id ? 'edit' : 'add'
          this.information.id = this.user.id;
          this.$axios.post(`/api/info/${url}`, this.information)
            .then((res) => {
              console.log(res) 
              this.$message({
                message: res.data.msg,
                type: res.data.type
              })
              // 清空数据，并关闭弹窗
              this.$emit('changeShow', false)
              // 通过再次渲染页面来达到刷新当前页面的效果
              this.reload()
            }).catch((err) => {
              console.log(err)
            });
        }
      })
    },
    cancel () {
      // 点击取消时，关闭弹窗，并清空数据
      this.$emit('changeShow', false)
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
      }
  }
}
</script>
<style scoped>
.info{
  margin-left: 15%;;
  overflow: hidden;
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
  margin-bottom: 10px;
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
  margin-left: -100px;
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