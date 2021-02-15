const mongoose = require('mongoose')
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

module.exports = mongoose.model('Stock', stockSchema)