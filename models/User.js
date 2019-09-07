const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/management', {useNewUrlParser:true, keepAlive: 120})
  .then(() => {
    console.log('connect success')
  })

const UserName = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'undefind'
  }
})

// module.exports = User = mongoose.model('User', UserName)
module.exports = User = mongoose.model('User', UserName)