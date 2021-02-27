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
        const stocks = await Stock.find({
            country,
            active: true
        })
        res.status(status('OK')).send(stocks)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getByExchangeComissionCode = async (req, res) => {
    const exchangeComissionCode = req.params.exchangeComissionCode
    try {
        const stock = await Stock.find({
            exchangeComissionCode, 
            active: true
        })
        res.status(status('OK')).send(stock)
    } catch(e) {
        res.status(status('Internal Server Error')).send(stock)
    }
}

exports.update = async (req, res) => {
    if(req.body.exchangeComissionCode != undefined && req.body.exchangeComissionCode !== req.params.exchangeComissionCode) {
        return res.status(status('Internal Server Error')).send(req.body)
    }

    const exchangeComissionCode = req.params.exchangeComissionCode
    try {
        // TODO: Change to .save() to use middleware
        const stock = await Stock.findOneAndUpdate({
            exchangeComissionCode
        }, 
        req.body, {
            new: true, runValidators: true
        })
        res.status(status('OK')).send(stock)
    } catch(e) {
        return res.status(status('Internal Server Error')).send(e)
    }
}