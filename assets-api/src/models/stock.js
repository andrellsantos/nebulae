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

// Suppressing unnecessary field
stockSchema.set('toObject', {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
        delete ret.id
    } 
})

stockSchema.set('toJSON', {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
        delete ret.id
    } 
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock