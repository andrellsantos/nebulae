const mongoose = require('mongoose')
const transactionSchema = require('./schemas/transaction')

// Suppressing unnecessary field
const fieldOptions = {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret.id,
        delete ret.userId
    } 
}
transactionSchema.set('toObject', fieldOptions)
transactionSchema.set('toJSON', fieldOptions)

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction