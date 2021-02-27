const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    ticker: {
        type: String,
        required: true,
        ref: 'Ticker'
    },
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
    },
    volume: {
        type: Number,
        required: true
    }
})

module.exports = quoteSchema