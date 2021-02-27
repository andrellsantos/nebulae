const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const financialSchema = require('./schemas/financial')

financialSchema.index({
    stock: 1,
    quarter: 1 
}, {
    unique: true
})

financialSchema.plugin(uniqueValidator, {
    message: 'Not Unique.'
})

module.exports = mongoose.model('Financial', financialSchema)