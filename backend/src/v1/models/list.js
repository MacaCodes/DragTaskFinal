const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const listSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }],
}, schemaOptions)

module.exports = mongoose.model('List', listSchema)