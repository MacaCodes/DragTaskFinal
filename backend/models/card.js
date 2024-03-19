const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const cardSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true
  },
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
    type: Date,
    default: Date.now,
  },
}, schemaOptions)

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;