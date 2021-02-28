const mongoose = require('mongoose')
const financialSchema = require('./financial')
const quoteSchema = require('./quote')

const Schema = mongoose.Schema;
const options = { 
    toObject: {
        virtuals: true
    },
    toJSON: { 
        virtuals: true 
    } 
};

const stockSchema = new Schema({
    company: {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        shortName: {
            type: String,
            trim: true
        },
        headquarter: {
            type: String,
            trim: true
        },
        registryNumber: {
            type: String,
            required: true,
            trim: true
        },
        sector: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        foundationDate: {
            type: Date
        }
    },
    country: {
        type: String,
        required: true,
        trim: true
    },    
    symbol: {
        type: String,
        required: true,
        trim: true
    },
    exchangeComissionCode: {
        type: Number,
        trim: true
    },
    exchangeRegistryDate: {
        type: Date
    },
    sites: {
        company: {
            type: String,
            trim: true
        },
        investors: {
            type: String,
            trim: true
        },
        exchange: {
            type: String,
            trim: true
        }
    },
    active: {
        type: Boolean,
        default: false
    }
}, options)

module.exports = stockSchema