const express = require('express')
const router = express.Router();
const passport = require('passport')

const info = require('../models/Information');

// router.get('/test', (req, res) => {
//   res.json({msg: 'success'})
// })

// 获取个人信息
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.body)
  info.findOne({id: req.body.id}, (err, adventure) => {
    if (err) {
      res.json({
        error: true,
        msg: '请求错误'
      })
    } else if (adventure) {
      res.json(adventure)
    } else {
      res.json({
        error: true,
        msg: '无该学生信息'
      })
    }
  })
})

// 添加个人信息
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log('add')
  info.create(req.body).then((info) => {
    res.json({
      msg: '添加成功',
      data: info,
      type: 'success'
    })
  })
})

// 个人信息编辑
router.post('/edit', passport.authenticate('jwt', {session: false}), (req, res) => {
  info.findOneAndUpdate({id: req.body.id}, req.body, (err, ret) => {
    console.log('edit')
    if(err) {
      console.log('更新失败')
      console.log('err')
      res.json({
        success: true,
        msg: '更新失败',
        type: 'error'
      })
    }else {
      console.log('更新成功');
      res.json({
        success: true,
        msg: '更新成功',
        type: 'success'
      })
    }
  })
})

// 个人信息查询
router.post('/query', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.body.id)
  info.findOne({num: req.body.id}, (err, adventure) => {
    if (err) {
      res.json({
        error: true,
        msg: '请求错误'
      })
    } else if (adventure) {
      res.json(adventure)
    } else {
      res.json({
        error: true,
        msg: '无该学生信息'
      })
    }
  })
})

// 头像上传功能后端实现，并将图片保存到uploads文件夹
const multer = require('multer')
const upload = multer({dest: __dirname + '/../uploads'})
router.post('/updata',upload.single('file'), async (req, res) => {
  // console.log(req.file);
  console.log(req.body.id)
  const file = req.file
  file.url = `http://localhost:5000/uploads/${file.filename}`
  info.findOneAndUpdate({id: req.body.id},{imageUrl: file.url}, function (err, ret) {
  if(err) {
    console.log('更新失败')
    console.log('err')
  }else {
    console.log('更新成功')
  }
})
  res.send(file)
})

module.exports = router