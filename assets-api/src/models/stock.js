const mongoose = require('mongoose')
const validator = require('validator')

const Stock = mongoose.model('Stock', {
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
        type: String,
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
    }
})

module.exports = Stock