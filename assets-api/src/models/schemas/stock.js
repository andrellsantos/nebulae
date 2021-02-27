const mongoose = require('mongoose')
const financialSchema = require('./financial')
const quoteSchema = require('./quote')

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    company: {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        shortName: {
            type: String,
            trim: true
        },
        headquarter: {
            type: String,
            trim: true
        },
        registryNumber: {
            type: String,
            required: true,
            trim: true
        },
        sector: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    country: {
        type: String,
        required: true,
        trim: true
    },    
    symbol: {
        type: String,
        required: true,
        trim: true
    },
    exchangeComissionCode: {
        type: Number,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = stockSchema