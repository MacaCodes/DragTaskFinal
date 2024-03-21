const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const cardSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
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

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;

