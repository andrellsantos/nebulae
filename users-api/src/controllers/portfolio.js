const Portfolio = require('../models/portfolio')
const engine = require('../engines/portfolio')
const status = require('statuses')

exports.getAll = async (req, res) => {
    try {
        await engine.calculate(req.user)
        await req.user.populate({
            path: 'portfolios',
            options: {
                sort: {ticker: 1} 
            }
        }).execPopulate()
        res.status(status('OK')).send(req.user.portfolios)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}
// Endpoint to update the asset weight
exports.update = async (req, res) => {
    const fieldsRequestBody = Object.keys(req.body)
    const allowedFieldsRequestBody = ['weight']
    const isValidRequestBody = fieldsRequestBody.every((field) => allowedFieldsRequestBody.includes(field))

    if(!isValidRequestBody) {
        return res.status(status('Bad Request')).send({
            error: 'Invalid request body.'
        })
    }

    try {
        const portfolio = await Portfolio.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        
        if(!portfolio) {
            return res.status(status('Not Found')).send()
        }

        fieldsRequestBody.forEach((field) => portfolio[field] = req.body[field])
        await portfolio.save()
        res.status(status('OK')).send(portfolio)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e)
    }
}