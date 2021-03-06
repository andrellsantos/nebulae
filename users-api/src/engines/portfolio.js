const Portfolio = require('../models/portfolio')
const HashMap = require('hashmap')

exports.calculate = async (user) => {
    console.log('calculate: ' + user)
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
                total: transaction.amount * transaction.price,
                average: transaction.price
            }
            portfolios.set(key, portfolio)
        } else {
            const _amount = portfolio.amount + transaction.amount
            const _total = portfolio.total + (transaction.amount * transaction.price)
            const _average = _total/_amount
            const _portfolio = {
                country: portfolio.country,
                ticker: portfolio.ticker,
                amount: _amount,
                total: _total,
                average: _average
            }
            portfolios.set(key, _portfolio)
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