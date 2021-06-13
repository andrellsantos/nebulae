const Financial = require('../models/financial')
const logger = require('../logs/winston')
const status = require('statuses')
// TODO: Validate router based on the country
// TODO: Check if the stock is active

exports.create = async (req, res) => {
    const financial = new Financial({
        ...req.body,
        stock: req.params.symbol.toUpperCase()
    })
    try {
        await financial.save()
        res.status(status('Created')).send(financial)
    } catch(e) {
        logger.error('[controllers/financial.js] exports.create()', e)
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getAll = async (req, res) => {
    const stock = req.params.symbol.toUpperCase()
    try {
        const financials = await Financial.find({
            stock
        }).sort({date:1})
        res.status(status('OK')).send(financials)
    } catch(e) {
        logger.error('[controllers/financial.js] exports.getAll()', e)
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getByQuarter = async (req, res) => {
    const stock = req.params.symbol.toUpperCase()
    const quarter = req.params.quarter.toUpperCase()
    try {
        const financial = await Financial.findOne({
            stock,
            quarter
        })
        if(!financial) {
            res.status(status('Not Found')).send(req.body)
        } else {
            res.status(status('OK')).send(financial)
        }
    } catch(e) {
        logger.error('[controllers/financial.js] exports.getByQuarter()', e)
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.update = async (req, res) => {
    const stock = req.params.symbol.toUpperCase()
    const quarter = req.params.quarter.toUpperCase()

    if(req.body.stock != undefined && req.body.stock.toUpperCase() !== stock) {
        return res.status(status('Bad Request')).send(req.body)
    }
    if(req.body.quarter != undefined && req.body.quarter.toUpperCase() !== quarter) {
        return res.status(status('Bad Request')).send(req.body)
    }

    try {
        // TODO: Change to .save() to use middleware
        const financial = await Financial.findOneAndUpdate({
            stock, quarter
        }, 
        req.body, {
            new: true, runValidators: true, context: 'query'
        })
        if(!financial) {
            res.status(status('Not Found')).send(req.body)
        } else {
            res.status(status('OK')).send(financial)
        }
    } catch(e) {
        logger.error('[controllers/financial.js] exports.update()', e)
        res.status(status('Internal Server Error')).send(e) 
    }
}