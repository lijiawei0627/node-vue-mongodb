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
      return res.status(404).json({email: '邮箱已被注册'})
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
          return res.json(data)
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
        const rule = {id: data.id, name: data.name, avatar: data.avatar, identity: data.identity};
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
        return res.status(400).json({password: '密码错误'})
      }
    } else {
      return res.status(404).json({email: '用户不存在，请先注册'})
    }
  })
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