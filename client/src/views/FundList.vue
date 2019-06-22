<template>
  <div class="wrapper">
    <div class="btn">
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
    max-height="450"
    border 
    v-show="this.tableData.length > 0"
    :data="this.tableData"
    style="width: 85%">
    <el-table-column
      type="index"
      align="center"
      label="序号"
      width="70">
    </el-table-column>
    <el-table-column
      prop="date"
      label="创建时间"
      width="250">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.date}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="sex"
      align="center"
      label="性别"
      width="70"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="num"
      label="学号"
      width="155">
      <template slot-scope="scope">
        <span style="margin-left: 10px;color: #00d053">{{scope.row.num}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="major"
      label="专业"
      width="155">
      <template slot-scope="scope">
        <span style="margin-left: 10px;color: #f56767">{{scope.row.major}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="grade"
      label="年级"
      width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px;color: #4db3ff">{{scope.row.grade}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="year"
      label="出生年月"
      width="150">
    </el-table-column>
    <el-table-column label="操作"
    prop="operation"
    align="center"
    fixed="right"
    width="180"
    >
      <template slot-scope="scope">
        <el-button
          size="small"
          type="warning"
          icon="edit"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          icon="delete"
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <dia-log :dialog="dialog" @changeShow="changeShow" :formData="formData"></dia-log>
  </div>
</template>

<script>
import DiaLog from '../components/Dialog'
export default {
  name: 'FundList',
  components: {
    DiaLog
  },
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      formData: {
        type: '',
        name: '',
        major: '',
        grade: '',
        year: '',
        num: '',
        id: ''
      },
      dialog: {
        show: false,
        title: '添加学生信息',
        option: 'edit'
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    changeShow (show) {
      console.log(show)
      this.dialog.show = show;
      this.formData = {}
    },
    getData () {
      this.$axios.get('/api/profiles')
        .then((res) => {
          console.log(res)
          console.log(res.data)
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleEdit (index, row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改学生信息",
        option: 'edit'
      }
      this.formData = {
        sex: row.sex,
        name: row.name,
        num: row.num,
        major: row.major,
        grade: row.grade,
        year: row.year,
        id: row._id
      }
    },
    handleDelete (index, row) {
      console.log(row._id)
      this.$axios.post(`/api/profiles/delete/${row._id}`)
        .then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          // 页面无闪烁刷新
          this.reload()
        })
    },
    handleAdd () {
      this.dialog = {
        show: 'true',
        title: '添加学生信息',
        option: 'add'
      }
      this.formData = {}
      this.dialog.show = true
    }
  }
}
</script>

<style scoped>
.wrapper{
  padding: 15px;
}
.wrapper .btn{
  float: right;
}
</style>
