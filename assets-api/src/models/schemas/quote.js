const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    low: {
        type: Number,
        required: true
    },
    high: {
        type: Number,
        required: true
    },
    close: {
        type: Number,
        required: true
    }
})

module.exports = quoteSchema