const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
    // TODO: Calculated Fields
})

module.exports = transactionSchema