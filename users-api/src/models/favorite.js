const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const favoriteSchema = require('./schemas/favorite')

// Unique Fields
favoriteSchema.index({
    userId: 1,
    country: 1,
    ticker: 1 
}, {
    unique: true
})

favoriteSchema.plugin(uniqueValidator, {
    message: 'The ticket already exists in the favorites.'
})

// Suppressing unnecessary field
const fieldOptions = {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret.id,
        delete ret.userId
    } 
}
favoriteSchema.set('toObject', fieldOptions)
favoriteSchema.set('toJSON', fieldOptions)

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite