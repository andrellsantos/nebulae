const mongoose = require('mongoose')
const returnRateSchema = require('./schemas/return-rate')

// Suppressing unnecessary field
const fieldOptions = {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret.id,
        delete ret.userId,
        delete ret.createdAt,
        delete ret.updatedAt
    } 
}
returnRateSchema.set('toObject', fieldOptions)
returnRateSchema.set('toJSON', fieldOptions)

const ReturnRate = mongoose.model('ReturnRate', returnRateSchema)

module.exports = ReturnRate