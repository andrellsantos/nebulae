const Portfolio = require('../models/portfolio')
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
    
    var portfolios = new HashMap()
    user.transactions.forEach(transaction => {
        const key = transaction.country + "/" + transaction.ticker
        var portfolio = portfolios.get(key)
        if(!portfolio) {
            portfolio = {
                country: transaction.country,
                ticker: transaction.ticker,
                amount: transaction.amount,
                total: Math.abs(transaction.amount) * transaction.price,
                average: transaction.price
            }
            portfolios.set(key, portfolio)
        } else {
            portfolio.amount += transaction.amount
            portfolio.total += (Math.abs(transaction.amount) * transaction.price)
            portfolio.average = (portfolio.amount == 0) ? 0 : portfolio.total/portfolio.amount
            portfolios.set(key, portfolio)
        }
    })

    try {
        const dbPortfolios = await Portfolio.find({
            userId: user._id
        })
        await Portfolio.remove({
            userId: user._id
        })
        portfolios.values().forEach(portfolio => {
            var weight
            const dbPortfolio = dbPortfolios.find(dbPortfolio => {
                return dbPortfolio.country === portfolio.country && 
                dbPortfolio.ticker === portfolio.ticker
            })
            if(dbPortfolio) {
                weight = dbPortfolio.weight
            }
            new Portfolio({
                userId: user._id,
                country: portfolio.country,
                ticker: portfolio.ticker,
                weight,
                amount: portfolio.amount,
                average: portfolio.average
            }).save()
        })
    } catch(e) {
        console.log(e)
    }
}