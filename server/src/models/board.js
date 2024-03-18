const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const boardSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  icon: {
    type: String,
    default: '📃'
  },
  title: {
    type: String,
    default: 'Untitled'
  },
  description: {
    type: String,
    default: `Add description here
    🟢 You can add multiline description
    🟢 Let's start...`
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
  columns: [{
    type: Schema.Types.ObjectId,
    ref: 'Column'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}
}, schemaOptions)

module.exports = mongoose.model('Board', boardSchema)