const Stock = require('../models/ticker')
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

exports.getByTicker = async (req, res) => {
    try {
        res.status(status('OK')).send('getByTicker()')
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