const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const returnRateSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    // TODO: Add all enums in a separate file (example in the bottom: https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose)
    type: {
        type: String,
        enum: ['ALL', 'CONSOLIDATED', 'EQUITY'],
        required: true
    },
    // TODO: portfolio, br/stocks, br/fiis, us/stocks, us/reits, ibov, ifix, cdi, ipca
    source: {
        type: String,
        enum: ['PORTFOLIO', 'BR/STOCKS'],
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = returnRateSchema