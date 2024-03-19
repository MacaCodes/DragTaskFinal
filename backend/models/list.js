const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const listSchema = new Schema({
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  listId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: ''
  },
  position:{
    type: Number
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
}, schemaOptions)

const List = mongoose.model('List', listSchema);

module.exports = List;

