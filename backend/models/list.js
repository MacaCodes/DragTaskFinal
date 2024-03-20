const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const listSchema = new Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    cardId:{
        type: schemaOptions.Types.ObjectId,
        ref: 'Card',
    },
    title: {
        type: String,
        default: ''
    },
    position: {
        type: Number

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, schemaOptions)

module.exports = mongoose.model('List', columnSchema)

