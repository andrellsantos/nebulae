const mongoose = require('mongoose')
const quoteSchema = require('./schemas/quote')

module.exports = mongoose.model('Quote', quoteSchema)