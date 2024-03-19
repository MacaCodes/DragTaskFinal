const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const cardSchema = new Schema({
  columnId: {
    type: Schema.Types.ObjectId,
    ref: 'Column',
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  position: {
    type: Number
  },
  createdAt: {
    type:Date,
    default: Date.now,
  }
}, schemaOptions)

module.exports = mongoose.model('Card', cardSchema)