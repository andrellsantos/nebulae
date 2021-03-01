const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const stockSchema = require('./schemas/stock')

// Virtual Properties
stockSchema.virtual('tickers', {
    ref: 'Ticker',
    localField: 'symbol',
    foreignField: 'stock'
})

stockSchema.virtual('financials', {
    ref: 'Financial',
    localField: 'symbol',
    foreignField: 'stock'
})

// Unique Fields
stockSchema.index({
    country: 1,
    symbol: 1 
}, {
    unique: true
})

stockSchema.plugin(uniqueValidator, {
    message: 'Symbol already exists for country.'
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock