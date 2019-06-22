<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal="false"
    >
    <div class="form">
      <el-form :model="formData" :rules="rules" ref="form" label-width="120px" style="margin: 10px;width: auto">
        
          <el-form-item label="性别">
            <el-select v-model="formData.sex" placeholder="性别">
              <el-option v-for="(formType, index) in this.format_type_list" :value="formType" :label="formType" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input type="text" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="num">
            <el-input type="number" v-model="formData.num"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input v-model="formData.major"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input v-model="formData.grade"></el-input>
          </el-form-item>
          <div class="wrap">
            <span>出生年月日</span>
            <el-date-picker
            class="year"
            v-model="formData.year"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
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
  name: 'DiaLog',
  props: {
    dialog: Object,
    formData: Object
  },
  inject: ["reload"],
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
              // 刷新当前页面
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
    }
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
      format_type_list: [
        '男',
        '女'
      ]
    }
  },
}
</script>

<style scoped>
.wrap{
  margin-left: 39px;
}
.wrap .year{
  margin-left: 10px
}
.text_right{
  margin-top: 17px;
}
</style>
