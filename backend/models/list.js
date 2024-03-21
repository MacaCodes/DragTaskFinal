const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

console.log('listSchema definition started') //debug
const listSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
    },
    title: {
        type: String,
        default: ''
    },
    position: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    cards: [{ // Add this field to your schema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    }],
}, schemaOptions)
console.log('listSchema definition completed') //debug
const List = mongoose.model('List', listSchema);

module.exports = List;
