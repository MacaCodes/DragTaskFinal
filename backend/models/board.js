const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const boardSchema = new mongoose.Schema({
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
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}
}, schemaOptions)

module.exports = mongoose.model('Board', boardSchema)