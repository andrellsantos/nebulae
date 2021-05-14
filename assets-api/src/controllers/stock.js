const Stock = require('../models/stock')
const Ticker = require('../models/ticker')
const Quote = require('../models/quote')
const Financial = require('../models/financial')
const status = require('statuses')
// TODO: Validate router based on the country

exports.create = async (req, res) => {
    if(req.body.country != undefined && req.body.country.toUpperCase() !== req.params.country.toUpperCase()) {
        return res.status(status('Bad Request')).send(req.body)
    }

    const stock = new Stock(req.body)
    try {
        await stock.save()
        res.status(status('Created')).send(stock)
    } catch(e) {
        console.log(e)
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getAll = async (req, res) => {
    const country = req.params.country.toUpperCase()
    try {
        const stocks = await Stock.find({
            country,
            active: true
        })
        res.status(status('OK')).send(stocks)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getBySymbol = async (req, res) => {
    const country = req.params.country.toUpperCase()
    const symbol = req.params.symbol.toUpperCase()
    try {
        const stock = await Stock.findOne({
            country,
            symbol, 
            active: true
        })
        if(!stock) {
            return res.status(status('Not Found')).send(req.body)
        }
        
        // TODO: Filter by date to avoid returning everything
        //await stock.populate('tickers').execPopulate()
        stock.tickers = await Ticker.find({
            stock: symbol
        }, {_id: false, id: false, __v: false})

        stock.tickers.forEach(async function(ticker) {
            //await ticker.populate('quotes').execPopulate()
            ticker.quotes = await Quote.find({
                ticker: ticker.symbol
            }, {_id: false, __v: false})
        })
        
        //await stock.populate('financials').execPopulate()
        const financials = await Financial.find({
            stock: symbol
        }, {_id: false, __v: false, date: false})
        stock.financials = financials
        
        res.status(status('OK')).send(stock)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e)
    }
}

exports.update = async (req, res) => {
    const country = req.params.country.toUpperCase()
    const symbol = req.params.symbol.toUpperCase()

    if(req.body.country != undefined && req.body.country.toUpperCase() !== country) {
        return res.status(status('Bad Request')).send(req.body)
    }
    if(req.body.symbol != undefined && req.body.symbol.toUpperCase() !== symbol) {
        return res.status(status('Bad Request')).send(req.body)
    }

    try {
        // TODO: Change to .save() to use middleware
        const stock = await Stock.findOneAndUpdate({
            country,
            symbol
        }, 
        req.body, {
            new: true, runValidators: true, context: 'query'
        })
        if(!stock) {
            return res.status(status('Not Found')).send(req.body)
        } 
        res.status(status('OK')).send(stock)
    } catch(e) {
        console.log(e)
        return res.status(status('Internal Server Error')).send(e)
    }
}