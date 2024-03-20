const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const listSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
    },
    // cardId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Card',
    // },
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


module.exports = mongoose.model('List', listSchema)

