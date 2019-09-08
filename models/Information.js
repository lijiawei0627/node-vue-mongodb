const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/management', {useNewUrlParser:true, keepAlive: 120})
  .then(() => {
    console.log('connect success')
  })

const InfoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
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
  num: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  year: {
    type: Date,
    required: true
  },
  beforeName: {
    type: String,
    default: ''
  },
  face: {
    type: String,
    required: true
  }, 
  class: {
    type: String,
    required: true
  },
  id: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  }
})

module.exports = Info = mongoose.model('Information', InfoSchema)