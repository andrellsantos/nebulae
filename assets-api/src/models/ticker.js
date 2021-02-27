const mongoose = require('mongoose')
const tickerSchema = require('./schemas/ticker')

// Virtual Properties
tickerSchema.virtual('quotes', {
    ref: 'Quote',
    localField: 'symbol',
    foreignField: 'ticker'
})

module.exports = mongoose.model('Ticker', tickerSchema)