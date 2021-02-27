const Stock = require('../models/financial')
const status = require('statuses')
const Immutable = require('immutable')
const countries = Immutable.List(['BR', 'US'])

exports.create = async (req, res) => {
    try {
        res.status(status('Created')).send('create()')
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getAll = async (req, res) => {
    try {
        res.status(status('OK')).send('getAll()')
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getByQuarter = async (req, res) => {
    try {
        res.status(status('OK')).send('getByQuarter()')
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.update = async (req, res) => {
    try {
        res.status(status('OK')).send('update()')
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}