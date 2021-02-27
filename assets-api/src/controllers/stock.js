const Stock = require('../models/stock')
const status = require('statuses')
const Immutable = require('immutable')
const countries = Immutable.List(['BR', 'US'])

exports.create = async (req, res) => {
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
    if(!countries.contains(country)) {
        return res.status(status('Bad Request')).send()
    }

    try {
        const stock = await Stock.find({
            country,
            active: true
        })
        res.status(status('OK')).send(stock)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getBySymbol = (req, res) => {
    Stock.find({
        symbol: req.params.symbol.toUpperCase(), 
        active: true
    }, (e, stock) => {
        if(e) {
            return res.status(status('Internal Server Error')).send(stock)
        }
        res.status(status('OK')).send(stock)
    })
}

exports.update = (req, res) => {
    if(req.body.symbol != undefined && req.body.symbol.toUpperCase() !== req.params.symbol.toUpperCase()) {
        return res.status(status('Internal Server Error')).send(req.body)
    }

    Stock.findOneAndUpdate({
        symbol: req.params.symbol.toUpperCase()
    }, 
    req.body, 
    (e, stock) => {
        if(e) {
            return res.status(status('Internal Server Error')).send(req.body)
        }
        Stock.find({
            symbol: req.params.symbol.toUpperCase()
        }, (e, stock) => {
            if(e) {
                return res.status(status('Internal Server Error')).send(stock)
            }
            res.status(status('OK')).send(stock)
        })
    })
}