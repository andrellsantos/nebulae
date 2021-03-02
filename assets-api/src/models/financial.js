const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const financialSchema = require('./schemas/financial')

// Unique Fields
financialSchema.index({
    stock: 1,
    quarter: 1 
}, {
    unique: true
})

financialSchema.plugin(uniqueValidator, {
    message: 'Quarter already exists for stock.'
})

// Suppressing unnecessary fields
const fieldOptions = {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
        delete ret.id
        delete ret.date
    } 
}
financialSchema.set('toObject', fieldOptions)
financialSchema.set('toJSON', fieldOptions)

const Financial = mongoose.model('Financial', financialSchema)

module.exports = Financial