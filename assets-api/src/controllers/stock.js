const Stock = require('../models/stock')
const status = require('statuses')

exports.create = (req, res) => {
    const stock = new Stock(req.body)
    
    stock.save().then(() => {
        res.status(status('Created')).send(stock)
    }).catch((e) => {
        res.status(status('Internal Server Error')).send(e)
    })
}

exports.getAll = (req, res) => {
    Stock.find({
        active: true
    }, (e, stock) => {
        if(e) {
            return res.status(status('Internal Server Error')).send(e)
        }
        res.status(status('OK')).send(stock)
    })
}

exports.getByTicker = (req, res) => {
    Stock.find({
        ticker: req.params.ticker.toUpperCase(), 
        active: true
    }, (e, stock) => {
        if(e) {
            return res.status(status('Internal Server Error')).send(stock)
        }
        res.status(status('OK')).send(stock)
    })
}

exports.update = (req, res) => {
    if(req.body.ticker != undefined && req.body.ticker.toUpperCase() !== req.params.ticker.toUpperCase()) {
        return res.status(status('Internal Server Error')).send(req.body)
    }

    Stock.findOneAndUpdate({
        ticker: req.params.ticker.toUpperCase()
    }, 
    req.body, 
    (e, stock) => {
        if(e) {
            return res.status(status('Internal Server Error')).send(req.body)
        }
        Stock.find({
            ticker: req.params.ticker.toUpperCase()
        }, (e, stock) => {
            if(e) {
                return res.status(status('Internal Server Error')).send(stock)
            }
            res.status(status('OK')).send(stock)
        })
    })
}