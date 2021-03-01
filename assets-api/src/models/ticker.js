const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const tickerSchema = require('./schemas/ticker')

// Virtual Properties
tickerSchema.virtual('quotes', {
    ref: 'Quote',
    localField: 'symbol',
    foreignField: 'ticker'
})

// Unique Fields
tickerSchema.index({
    stock: 1,
    symbol: 1 
}, {
    unique: true
})

tickerSchema.plugin(uniqueValidator, {
    message: 'Ticker already exists for stock.'
})

// Suppressing the field "stock"
tickerSchema.methods.toJSON = function () {
    const ticker = this
    const tickerObject = ticker.toObject()

    delete tickerObject.stock

    return tickerObject
}

const Ticker = mongoose.model('Ticker', tickerSchema)

module.exports = Ticker