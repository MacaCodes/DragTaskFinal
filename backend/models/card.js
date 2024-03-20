const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const cardSchema = new Schema({
  listId: {
    type: Schema.Types.ObjectId,
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
    type: Number
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
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