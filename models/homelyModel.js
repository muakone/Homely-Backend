const mongoose = require('mongoose')

const Schema = mongoose.Schema

const homelySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  }
  
}, { timestamps: true })

module.exports = mongoose.model('homely', homelySchema)

