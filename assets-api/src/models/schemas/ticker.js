const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tickerSchema = new Schema({
    stock: {
        type: String,
        required: true,
        ref: 'Stock'
    },
    symbol: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = tickerSchema