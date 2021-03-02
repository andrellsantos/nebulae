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

// Suppressing unnecessary field
tickerSchema.set('toObject', {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
        delete ret.id
        delete ret.stock
    } 
})

tickerSchema.set('toJSON', {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
        delete ret.id
        delete ret.stock
    } 
})

const Ticker = mongoose.model('Ticker', tickerSchema)

module.exports = Ticker