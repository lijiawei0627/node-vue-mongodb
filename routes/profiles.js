const express = require('express')
const router = express.Router();
const passport = require('passport')

const profiles = require('../models/Profile');

// router.get('/test', (req, res) => {
//   res.json({msg: 'success'})
// })

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.body)
  profiles.create(req.body).then((profile) => {
    console.log(profile)
    res.json(profile)
  })
})

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  profiles.find()
    .then(profile => {
      if (profile) {
        res.json(profile)
      } else {
        res.status(404).json('没有任何内容')
      }
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log('5')
  profiles.findById(req.params.id)
    .then(profile => {
      if (profile) {
        console.log('1')
        res.json(profile)
      } else {
        res.status(404).json('没有任何内容')
      }
    })
    .catch(err => {
      console.log('0')
      res.status(404).json(err)
    })
})

router.post('/edit/:id', passport.authenticate('jwt', {session: false}),(req, res) => {
  profiles.findOneAndUpdate({_id: req.params.id}, req.body, (err, data) => {
    if (err) throw err;
    res.json(data)
  })
})

router.post('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  profiles.findOneAndRemove({_id: req.params.id}, (err, data) => {
    if (err) throw err;
    res.json(data)
  })
})
module.exports = router