const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const cardSchema = new mongoose.Schema({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
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
    type: Number,
    default: false
  },
  comments: [
    {
      text: {
        type: String,
        default: ''},
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type:Date,
    default: Date.now,
  }
}, schemaOptions)

module.exports = mongoose.model('Card', cardSchema)