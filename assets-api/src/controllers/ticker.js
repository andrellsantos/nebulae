const Ticker = require('../models/ticker')
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
    const tickerSymbol = req.params.ticker.toUpperCase()
    try {
        const ticker = await Ticker.findOne({
            stock,
            tickerSymbol
        })
        if(ticker) {
            // TODO: Filter by date to avoid returning everything
            await ticker.populate('quotes').execPopulate()
        }
        res.status(status('OK')).send(ticker)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}