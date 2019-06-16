const express = require('express')
const router = express.Router();
const passport = require('passport')

const profiles = require('../models/Profile');

router.get('/test', (req, res) => {
  res.json({msg: 'success'})
})

module.exports = router