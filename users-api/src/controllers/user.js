const User = require('../models/user')
const status = require('statuses')

exports.create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(status('Created')).send({
            user, 
            token
        })
    } catch(e) {
        res.status(status('Internal Server Error')).send(e)
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(status('OK')).send({
            user, 
            token
        })
    } catch(e) {
        res.status(status('Internal Server Error')).send()
    }
}

exports.logout = async (req, res) => {
    console.log(req.user)
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.status(status('OK')).send()
    } catch(e) {
        res.status(status('Internal Server Error')).send()
    }
}

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(status('OK')).send()
    } catch(e) {
        res.status(status('Internal Server Error')).send()
    }
}

exports.get = async (req, res) => {
    res.status(status('OK')).send(req.user)
}

exports.update = async (req, res) => {
    const fieldsRequestBody = Object.keys(req.body)
    const allowedFieldsRequestBody = ['name', 'email', 'password']
    const isValidRequestBody = fieldsRequestBody.every((field) => allowedFieldsRequestBody.includes(field))

    if(!isValidRequestBody) {
        return res.status(status('Bad Request')).send({
            error: 'Invalid request body.'
        })
    }

    try {
        fieldsRequestBody.forEach((field) => req.user[field] = req.body[field])
        await req.user.save()
        res.status(status('OK')).send(req.user)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e)
    }
}

exports.delete = async (req, res) => {
    try {
        await req.user.remove()
        res.status(status('OK')).send(req.user)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e)
    }
}