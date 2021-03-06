const mongoose = require('mongoose')
const portfolioSchema = require('./schemas/portfolio')

// Suppressing unnecessary field
const fieldOptions = {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret.id,
        delete ret.userId
    } 
}
portfolioSchema.set('toObject', fieldOptions)
portfolioSchema.set('toJSON', fieldOptions)

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

module.exports = Portfolio