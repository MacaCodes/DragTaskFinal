const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const boardSchema = new Schema({
  boardId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: 'Untitled'
  },
  description: {
    type: String,
    default: `🟢 Add description here`
  },
  position: {
    type: Number
  },
  priority: {
    type: Boolean,
    default: false
  },
  priorityPosition: {
    type: Number,
    default: 0
  },  
  createdAt: {
    type: Date,
    default: Date.now
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List' 
  }]
}, { collection: 'boards' }, schemaOptions)

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;

