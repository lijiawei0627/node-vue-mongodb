const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/management', {useNewUrlParser:true, keepAlive: 120})
  .then(() => {
    console.log('connect success')
  })

const ProfileSchema = new Schema({
  type: {
    String
  },
  describe: {
    type: String
  },
  incode: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('Profile', ProfileSchema)