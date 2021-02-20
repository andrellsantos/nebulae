const mongoose = require('mongoose')
const stockSchema = require('./schemas/stock')

module.exports = mongoose.model('Stock', stockSchema)