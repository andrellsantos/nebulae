const Quote = require('../models/quote')
const status = require('statuses')
// TODO: Validate router based on the country
// TODO: Check if the stock is active

exports.create = async (req, res) => {
    if(req.body.ticker != undefined && req.body.ticker.toUpperCase() !== req.params.ticker.toUpperCase()) {
        return res.status(status('Bad Request')).send(req.body)
    }

    try {
        const quote = new Quote({
            ...req.body,
            ticker: req.params.ticker.toUpperCase()
        })
        await quote.save()
        res.status(status('Created')).send(quote)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getAll = async (req, res) => {
    const ticker = req.params.ticker.toUpperCase()
    try {
        const quotes = await Quote.find({
            ticker
        })
        res.status(status('OK')).send(quotes)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getByDate = async (req, res) => {
    const ticker = req.params.ticker.toUpperCase()
    const date = req.params.date

    try {
        const quote = await Quote.findOne({
            ticker,
            date
        })
        if(!quote) {
            res.status(status('Not Found')).send(req.body)
        } else {
            res.status(status('OK')).send(quote)
        }
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.update = async (req, res) => {
    const ticker = req.params.ticker.toUpperCase()
    const date = req.params.date
    if(req.body.ticker != undefined && req.body.ticker.toUpperCase() !== ticker) {
        return res.status(status('Bad Request')).send(req.body)
    }
    if(req.body.date != undefined && req.body.date !== date) {
        return res.status(status('Bad Request')).send(req.body)
    }

    try {
        // TODO: Change to .save() to use middleware
        const quote = await Quote.findOneAndUpdate({
            ticker, date
        }, 
        req.body, {
            new: true, runValidators: true, context: 'query'
        })
        if(!quote) {
            res.status(status('Not Found')).send(req.body)
        } else {
            res.status(status('OK')).send(quote)
        }
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}