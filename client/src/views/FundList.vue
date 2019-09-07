<template>
  <div class="wrapper">
    <div class="btn">
      <el-form :inline="true" ref="add_data">
        <el-form-item label="按照时间筛选" class="date" :model="searchDate">
          <el-date-picker
            v-model="searchDate.startTime"
            type="datetime"
            placeholder="选择开始时间">
          </el-date-picker>
          --
          <el-date-picker
            v-model="searchDate.endTime"
            type="datetime"
            class="over"
            placeholder="选择结束时间">
          </el-date-picker>
          <el-button type="primary" size="small" icon="search" @click="handleSearch">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button 
          type="primary" 
          size="small" 
          icon="view" 
          v-if="user.identity == '管理员'"
          @click="handleAdd">添加</el-button>
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
      align="center"
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
          v-if="user.identity == '管理员'"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          icon="delete"
          size="small"
          type="danger"
          v-if="user.identity == '管理员'"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="10">
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <dia-log :dialog="dialog" @changeShow="changeShow" :formData="formData"></dia-log>
  </div>
</template>

<script>
import DiaLog from '../components/Dialog'
import {mapGetters} from 'vuex'
export default {
  name: 'FundList',
  components: {
    DiaLog
  },
  inject: ["reload"],
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      searchDate: {
        startTime: '',
        endTime: ''
      },
      paginations: {
        page_index: 1,  // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 当前一页显示多少条
        page_sizes: [5, 10, 15, 20], // 每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      tableData: [],
      allTableData: [],
      filterTableData: [],
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
    handleSearch () {
      if (!this.searchDate.startTime || !this.searchDate.endTime) {
        this.$message({
          type: 'warning',
          message: '请选择时间区间'
        })
        this.getData();
        return
      } else {
        const sTime = this.searchDate.startTime.getTime();
        const eTime = this.searchDate.endTime.getTime();
        this.allTableData = this.filterTableData.filter((item, index) => {
          let date = new Date(item.date);
          let time = date.getTime()
          console.log(`${sTime}--${time}--${eTime}`)
          // 返回符合时间条件的数据
          return time>=sTime&&time<=eTime
        })
        this.setPaginations()
      }
    },
    handleSizeChange (page_size) {
      // 切换page_size,选择每页显示多少条数据
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size
      })
    },
    handleCurrentChange (page) {
      // 获取当前页page
      // 获取当前页前面数据总数index
      let index = this.paginations.page_size*(page - 1);
      // 数据总数
      let nums = this.paginations.page_size*page;
      // 容器
      let tables = [];

      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i])
        }
        this.tableData = tables
      }
    },
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
          this.allTableData = res.data;
          this.filterTableData = res.data;
          console.log(res.data)
          // 设置分页功能
          this.setPaginations();
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setPaginations () {
      // 分页属性设置
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 5
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
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
      this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(`/api/profiles/delete/${row._id}`)
            .then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
          // 页面无闪烁刷新
          this.reload()
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      console.log(row._id)
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
.wrapper .btn .date {
  margin-left: 10px;
}
.wrapper .btn .date .over {
  /* margin-left: 10px; */
  margin-right: 10px;
}
.wrapper .btn .btnRight {
  position: absolute;
  right: 7px;
}
.pagination {
  position: absolute;
  right: 0;
  margin-top: 15px;
}
</style>
