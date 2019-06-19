<template>
  <div class="dialog">
    <el-dialog title="添加资金信息" :visible.sync="dialog.show" :close-on-click-modal="false"
    >
    <div class="form">
      <el-form :model="formData" :rules="rules" ref="form" label-width="120px" style="margin: 10px;width: auto">
        
          <el-form-item label="收支类型">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option v-for="(formType, index) in this.format_type_list" :value="formType" :label="formType" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支描述" prop="describe">
            <el-input type="text" v-model="formData.describe"></el-input>
          </el-form-item>
          <el-form-item label="收入" prop="income">
            <el-input type="number" v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item label="支出" prop="expend">
            <el-input type="number" v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item label="账户现金" prop="cash">
            <el-input type="number" v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="text" v-model="formData.remark"></el-input>
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
  methods: {
    submit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post('/api/profiles/add', this.formData)
            .then((res) => {
              console.log(res) 
              this.formData = {}
              this.$emit('changeShow', false)
            }).catch((err) => {
              console.log(err)
            });
        }
      })
    },
    cancel () {
      this.dialog.show=false;
      this.formData ={}
    }
  },
  data() {
    return {
      formData: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      },
      rules: {
        describe: [{required: true, message: '收支描述不能为空', trigger: 'blur' }],
        remark: [{required: true, message: '备注不能为空', trigger: 'blur' }],
        income: [{required: true, message: '收入不能为空', trigger: 'blur' }],
        expend: [{required: true, message: '支出不能为空', trigger: 'blur' }],
        cash: [{required: true, message: '账户现金不能为空', trigger: 'blur' }]
      },
      format_type_list: [
        '提现',
        '优惠券',
        '充值'
      ]
    }
  },
}
</script>