const Ticker = require('../models/ticker')
const Quote = require('../models/quote')
const status = require('statuses')
// TODO: Validate router based on the country
// TODO: Check if the stock is active

exports.create = async (req, res) => {
    if(req.body.stock != undefined && req.body.stock.toUpperCase() !== req.params.symbol.toUpperCase()) {
        return res.status(status('Bad Request')).send(req.body)
    }

    const ticker = new Ticker({
        ...req.body,
        stock: req.params.symbol.toUpperCase()
    })
    try {
        await ticker.save()
        res.status(status('Created')).send(ticker)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getAll = async (req, res) => {
    console.log('getAll()')
    const stock = req.params.symbol.toUpperCase()
    try {
        const tickers = await Ticker.find({
            stock
        })
        res.status(status('OK')).send(tickers)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getByTicker = async (req, res) => {
    const stock = req.params.symbol.toUpperCase()
    const symbol = req.params.ticker.toUpperCase()
    try {
        const ticker = await Ticker.findOne({
            stock,
            symbol
        })
        if(ticker) {
            // TODO: Filter by date to avoid returning everything
            //await ticker.populate('quotes').execPopulate()
            ticker.quotes = await Quote.find({
                ticker: symbol
            }, {_id: false, __v: false})
        }
        res.status(status('OK')).send(ticker)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}