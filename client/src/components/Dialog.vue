<template>
  <div class="dialog">
    <el-dialog title="添加资金信息" :visible.sync="dialog.show" :close-on-click-modal="false"
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
          <el-form-item label="出生年月" prop="year">
            <el-input type="text" v-model="formData.year"></el-input>
          </el-form-item>
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
    dialog: {}
  },
  inject: ["reload"],
  methods: {
    submit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post('/api/profiles/add', this.formData)
            .then((res) => {
              console.log(res) 
              // 清空数据，并关闭弹窗
              this.formData = {}
              this.$emit('changeShow', false)
              this.reload()
            }).catch((err) => {
              console.log(err)
            });
        }
      })
    },
    cancel () {
      // 点击取消时，关闭弹窗，并清空数据
      this.dialog.show=false;
      this.formData ={}
    }
  },
  data() {
    return {
      formData: {
        type: '',
        name: '',
        major: '',
        grade: '',
        year: '',
        num: '',
        id: ''
      },
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