const mongoose = require('mongoose')
const financialSchema = require('./financial')
const quoteSchema = require('./quote')

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    symbol: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    registryNumber: {
        type: String,
        required: true,
        trim: true
    },
    exchangeComissionCode: {
        type: Number,
        required: true,
        trim: true
    },
    sector: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = stockSchema