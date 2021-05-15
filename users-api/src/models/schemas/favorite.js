const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const favoriteSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    country: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },   
    ticker: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    }
})

module.exports = favoriteSchema