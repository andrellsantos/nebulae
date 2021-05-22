const Transaction = require('../models/transaction')
const dateFormat = require('dateformat')
const moment = require('moment')
const status = require('statuses')


exports.create = async (req, res) => {
    const date = moment(req.body.date, "DD/MM/YYYY").toDate()
    const transaction = new Transaction({
        ...req.body,
        date: dateFormat(date, 'yyyy-mm-dd'),
        userId: req.user._id
    })

    try {
        await transaction.save()
        res.status(status('Created')).send(transaction)
    } catch(e) {
        console.log(e)
        res.status(status('Bad Request')).send(e)
    }
}

exports.getAll = async (req, res) => {
    try {
        await req.user.populate({
            path: 'transactions',
            options: {
                sort: {
                    date: 1,
                    type: -1,
                    ticker: 1
                } 
            }
        }).execPopulate()
        res.status(status('OK')).send(req.user.transactions)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.getById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!transaction) {
            return res.status(status('Not Found')).send()
        }
        res.status(status('OK')).send(transaction)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.update = async (req, res) => {
    const fieldsRequestBody = Object.keys(req.body)
    const allowedFieldsRequestBody = ['ticker', 'date', 'price', 'excangeRate', 'amount']
    const isValidRequestBody = fieldsRequestBody.every((field) => allowedFieldsRequestBody.includes(field))

    if(!isValidRequestBody) {
        return res.status(status('Bad Request')).send({
            error: 'Invalid request body.'
        })
    }

    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        
        if(!transaction) {
            return res.status(status('Not Found')).send()
        }

        fieldsRequestBody.forEach((field) => transaction[field] = req.body[field])
        await transaction.save()
        res.status(status('OK')).send(transaction)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e)
    }
}

exports.delete = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!transaction) {
            return res.status(status('Not Found')).send()
        }
        res.status(status('OK')).send(transaction)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e)
    }
}