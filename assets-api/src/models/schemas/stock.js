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
    cnpj: {
        type: String,
        required: true,
        trim: true
    },
    codeCVM: {
        type: Number,
        required: true,
        trim: true
    },
    ticker: {
        type: String,
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
    },
    financials: [financialSchema],
    quotes: [quoteSchema]
})

module.exports = stockSchema