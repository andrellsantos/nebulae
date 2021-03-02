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

// Suppressing unnecessary field
const fieldOptions = {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
        delete ret.id
        delete ret.stock
    } 
}
quoteSchema.set('toObject', fieldOptions)
quoteSchema.set('toJSON', fieldOptions)

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote