const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/management', {useNewUrlParser:true, keepAlive: 120})
  .then(() => {
    console.log('connect success')
  })

const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  num: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  year: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('Profile', ProfileSchema)