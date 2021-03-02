const User = require('../models/user')
const status = require('statuses')

exports.create = async (req, res) => {
    res.status(status('Created')).send('create')
}

exports.login = async (req, res) => {
    res.status(status('OK')).send('login')
}

exports.logout = async (req, res) => {
    res.status(status('OK')).send('logout')
}

exports.logoutAll = async (req, res) => {
    res.status(status('OK')).send('logoutAll')
}

exports.get = async (req, res) => {
    res.status(status('OK')).send('get')
}

exports.update = async (req, res) => {
    res.status(status('OK')).send('update')
}