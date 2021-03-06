const ReturnRate = require('../models/return-rate')
const status = require('statuses')

exports.getAll = async (req, res) => {
    try {
        await req.user.populate({
            path: 'returnRates'
        }).execPopulate()
        
        res.status(status('OK')).send(req.user.returnRates)
    } catch(e) {
        console.log(e)
        res.status(status('Internal Server Error')).send(e) 
    }
}