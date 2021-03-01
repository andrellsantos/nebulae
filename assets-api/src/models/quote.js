const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const quoteSchema = require('./schemas/quote')

// Unique Fields
quoteSchema.index({
    ticker: 1,
    date: 1 
}, {
    unique: true
})

quoteSchema.plugin(uniqueValidator, {
    message: 'Quote already exists for ticker.'
})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote