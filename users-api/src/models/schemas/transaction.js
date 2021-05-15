const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
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
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    excangeRate: {
        type: Number
    },
    amount: {
        type: Number,
        required: true
    }
    // Should we have a field to store the type of the transaction (buy/sell) or
    // use a negative number in the price and amount when selling?

    // TODO: Calculated Fields
})

module.exports = transactionSchema