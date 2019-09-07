const express = require('express')
const router = express.Router();
const passport = require('passport')

const info = require('../models/Information');

// router.get('/test', (req, res) => {
//   res.json({msg: 'success'})
// })

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.body)
  let id = req.body.id;
  info.findById(req.body.id)
    .then((res) => {
      console.log(res)
    })
})


module.exports = router