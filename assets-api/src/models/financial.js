const mongoose = require('mongoose')
const financialSchema = require('./schemas/financial')

module.exports = mongoose.model('Financial', financialSchema)