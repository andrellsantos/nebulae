const Stock = require('../models/stock')
const status = require('statuses')
// TODO: Validate router based on the country
// const Immutable = require('immutable')
// const countries = Immutable.List(['BR', 'US'])

exports.create = async (req, res) => {
    if(req.body.symbol != undefined && req.body.symbol.toUpperCase() !== req.params.symbol.toUpperCase()) {
        return res.status(status('Bad Request')).send(req.body)
    }

    const stock = new Stock(req.body)
    try {
        await stock.save()
        res.status(status('Created')).send(stock)
    } catch(e) {
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
        if(stock) {
            // TODO: Filter by date to avoid returning everything
            await stock.populate('tickers').execPopulate()
            await stock.populate('financials').execPopulate()
        }
        res.status(status('OK')).send(stock)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e)
    }
}

exports.update = async (req, res) => {
    if(req.body.symbol != undefined && req.body.symbol.toUpperCase() !== req.params.symbol.toUpperCase()) {
        return res.status(status('Bad Request')).send(req.body)
    }

    const country = req.params.country.toUpperCase()
    const symbol = req.params.symbol.toUpperCase()
    try {
        // TODO: Change to .save() to use middleware
        const stock = await Stock.findOneAndUpdate({
            country,
            symbol
        }, 
        req.body, {
            new: true, runValidators: true
        })
        if(!stock) {
            res.status(status('Not Found')).send(stock)
        } else {
            res.status(status('OK')).send(stock)
        }
    } catch(e) {
        return res.status(status('Internal Server Error')).send(e)
    }
}