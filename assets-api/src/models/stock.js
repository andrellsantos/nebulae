const mongoose = require('mongoose')
const stockSchema = require('./schemas/stock')

// Virtual Properties
stockSchema.virtual('tickers', {
    ref: 'Ticker',
    localField: 'symbol',
    foreignField: 'symbol'
})

stockSchema.virtual('financials', {
    ref: 'Financial',
    localField: 'symbol',
    foreignField: 'stock'
})

module.exports = mongoose.model('Stock', stockSchema)