const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const portfolioSchema = new Schema({
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
    },
    type: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    weight: {
        type: Number
    },
    price: {
        type: Number
    },
    amount: {
        type: Number
    },
    average: {
        type: Number
    }
    // Should we use the price in real time or the colose from last day
    // or both in case the marked is close?
}, {
    timestamps: true
})

module.exports = portfolioSchema