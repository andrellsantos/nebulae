const ReturnRate = require('../models/return-rate')
const HashMap = require('hashmap')

const debug = (condition, value, ...print) => {
    if(condition === value) {
        console.log(value, ...print)
    }
}

exports.calculate = async (user) => {
    await user.populate({
        path: 'transactions'
    }).execPopulate()
    
    // TODO: Calculate the return rate for all sources in the portfolio
    
}