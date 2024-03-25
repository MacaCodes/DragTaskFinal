// models/Board.js
const mongoose = require('mongoose');


const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  favourite: {
    type: Boolean,
    default: false
  },
  position: {
    type: Number,
    required: true},
  lists: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'List' }],
    

}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);
