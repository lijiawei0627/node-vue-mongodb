const express = require('express')
const router = express.Router();
const passport = require('passport')

const profiles = require('../models/Profile');

// router.get('/test', (req, res) => {
//   res.json({msg: 'success'})
// })

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  profiles.create(req.body).then((profile) => {
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
  profiles.findOne({_id: req.params})
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
module.exports = router