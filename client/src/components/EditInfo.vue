<template>
  <div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal="false"
    >
    <div class="form">
      <el-form :model="formData" :rules="rules" ref="form" label-width="120px" style="margin: 10px;width: auto">
        <el-row class="info">
          <el-col :span="20" class="table">
            <el-form :model="formData" status-icon ref="infoForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name" class="list">
            <el-input type="text" v-model="formData.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" class="list">
            <el-radio-group v-model="formData.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="age" class="list">
            <el-input v-model.number="formData.age"></el-input>
          </el-form-item>
          <!-- <div class="img">
            <img src="../assets/index.jpg" alt="">
          </div> -->
          <el-form-item label="学号" prop="id" class="list">
            <el-input type="number" v-model="formData.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="曾用名" prop="beforeName" class="list">
            <el-input type="text" v-model="formData.beforeName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade" class="list">
            <el-input v-model.number="formData.grade"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class" class="list">
            <el-input type="text" v-model="formData.class" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major" class="list">
            <el-input type="text" v-model="formData.major" auto-complete="off"></el-input>
          </el-form-item>
                <el-form-item label="政治面貌" class="list">
            <el-select v-model="formData.face" placeholder="请选择身份">
              <el-option label="共青团员" value="共青团员"></el-option>
              <el-option label="共产党员" value="共产党员"></el-option>
              <el-option label="群众" value="群众"></el-option>
            </el-select>
          </el-form-item>
          <div class="title">出生年月日</div>
          <div class="list">
            <el-date-picker
            class="date"
            v-model="formData.year"
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
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-col>
        </el-row>
          <el-form-item class="text_right">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit('form')">提交</el-button>
          </el-form-item>
        </el-form>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditInfo',
  props: {
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      rules: {
        name: [{required: true, message: '姓名不能为空', trigger: 'blur' }],
        num: [{required: true, message: '学号不能为空', trigger: 'blur' }],
        major: [{required: true, message: '专业不能为空', trigger: 'blur' }],
        grade: [{required: true, message: '年级不能为空', trigger: 'blur' }],
        year: [{required: true, message: '出生年月不能为空', trigger: 'blur' }]
      },
      imageUrl: ''
    }
  },
  methods: {
    submit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const url = this.dialog.option === 'add'? 'add' : `edit/${this.formData.id}`
          console.log(url)
          this.$axios.post(`/api/profiles/${url}`, this.formData)
            .then((res) => {
              console.log(res) 
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
    handleAvatarSuccess () {

    },
    beforeAvatarUpload () {

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