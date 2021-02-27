const Financial = require('../models/financial')
const status = require('statuses')

exports.create = async (req, res) => {
    const financial = new Financial({
        ...req.body,
        stock: req.params.symbol.toUpperCase()
    })
    try {
        await financial.save()
        res.status(status('Created')).send(financial)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getAll = async (req, res) => {
    // TODO: Add validation for country and symbol
    const stock = req.params.symbol.toUpperCase()
    try {
        const financials = await Financial.find({
            stock
        })
        res.status(status('OK')).send(financials)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getByQuarter = async (req, res) => {
    // TODO: Add validation for country and symbol
    const stock = req.params.symbol.toUpperCase()
    const quarter = req.params.quarter.toUpperCase()
    try {
        const financials = await Financial.find({
            stock,
            quarter
        })
        res.status(status('OK')).send(financials)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.update = async (req, res) => {
    // TODO: Add validation for fountry and symbol
    const stock = req.params.symbol.toUpperCase()
    const quarter = req.params.quarter.toUpperCase()
    try {
        // TODO: Change to .save() to use middleware
        const financial = await Financial.findOneAndUpdate({
            stock, quarter
        }, req.body, {new: true, runValidators: true})
        res.status(status('OK')).send(financial)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}