<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">米修在线后台管理系统</span>
        <!-- :rules校验 -->
        <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="loginUser.email" placeholder="请输入email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="wrap">
            <p>还没有账号?<router-link to="/register" class="redirect">现在注册</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'Login',
  data() {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      // 定义规则
      rules: {
        email: [
          {
            type: 'email',
            required: true,
            message: '邮箱不正确',
            trigger: 'blur' 
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 30,
            message: '长度在6到30之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('http://localhost:5000/api/users/login', this.loginUser)
              .then(res => {
                console.log(res)
                // 消息提醒
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                const {token} = res.data;
                // 存储到localstorage
                localStorage.setItem('Token', token)
                // 解析token
                const decoded = jwtDecode(token)
                // token存储到vuex中
                this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
                this.$store.dispatch('setUser', decoded)
                this.$router.push('/index')
              })
          }
        });
      },
      isEmpty (value) {
        return (value === undefined || value === null ||
         (typeof value === 'object' && Object.keys(value).length === 0) ||
         (typeof value === 'string' && value.trim().length ===0))
      }
  }
}
</script>
  
<style lang="stylus" scoped>
.login
  position: relative
  width: 100%
  height: 753px
  background: url(../assets/timg.jpg) no-repeat center center
  background-size: cover
  .form_container
    width: 370px
    height: 210px
    position: absolute
    top: 10%
    left: 34%
    padding: 25px
    border-radius: 5px
    text-align: center
    .manage_tip
      .title
        font-family: 'Microsoft YaHei'
        font-weight: bold
        font-size: 26px
        color: #fff
      .loginForm
        margin-top: 20px
        background-color: #ffffff
        padding: 20px 40px 20px 20px
        border-radius: 5px
        box-shadow: 0px 5px 10px #cccccc
        .submit_btn
          width: 100%  
        .wrap
          font-size: 14px
          padding-left: 175px
          .redirect
            text-decoration: none
            font-size: 14px
          
</style>
