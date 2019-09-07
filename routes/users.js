const express = require('express')
const User = require('../models/User')
const md5 = require('md5')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken') // 引入jwt
const passport = require('passport')

const router = express.Router();

// router.get('/test', (req, res) => {
//   res.json({msg: "login works"})
// })

router.post('/register', (req, res) => {
  console.log(req.body)
  User.findOne({email: req.body.email}, (err, data) => {
    if (err) throw err
    if (data) {
      console.log(data)
      return res.status(200).json({
        success: false,
        msg: '该账号已注册'
      })
    } else {
      const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
        identity: req.body.identity
      }
      newUser.password = md5(newUser.password)
      User.create(newUser).then((data) => {
          // if (err) throw err;
          return res.json({
            success: true,
            msg: '注册成功'
          })
        }).catch((err) => {
          console.log(err)
        })
    }
  })
})

router.post('/login', (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email}, (err, data) => {
    if (err) throw err;
    if (data) {
      console.log(data);
      let password = req.body.password;
      password = md5(password);
      console.log(password)
      if (data.password == password) {
        // token令牌验证
        const rule = {id: data.id, name: data.name, avatar: data.avatar, identity: data.identity, icon: data.icon};
        jwt.sign(rule, 'secret', {expiresIn: 3600}, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: `Bearer ${token}`
          })
        })
        // jwt.sign('规则', '加密时间', '过期时间', '箭头函数')
        // return res.json('密码正确，登录成功')
      } else {
        return res.status(200).json({
          msg: '密码错误',
          success: false
        })
      }
    } else {
      return res.status(200).json({
        msg: '用户不存在，请先注册',
        success: false
      })
    }
  })
})

const multer = require('multer')
const upload = multer({dest: __dirname + '/../uploads'})
router.post('/updata',upload.single('file'), async (req, res) => {
  // console.log(req.file);
  console.log(req.body.id)
  const file = req.file
  file.url = `http://localhost:5000/uploads/${file.filename}`
  User.findByIdAndUpdate(req.body.id,{icon: file.url}, function (err, ret) {
  if(err) {
    console.log('更新失败')
    console.log('err')
  }else {
    console.log('更新成功')
  }
})
  res.send(file)
})
// router.get('/current', '验证token', () => {})
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  })
})



module.exports = router