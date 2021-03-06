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
    // TODO: Create unit tests
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
            if(portfolio.amount == 0) {
                portfolio.total = 0
                portfolio.average = 0
            } else {
                portfolio.total += Math.abs(transaction.amount) * transaction.price
                portfolio.average = portfolio.total/portfolio.amount
            }
            portfolios.set(key, portfolio)
        }
    })

    try {
        // Should remove all portfolios without transactions or when the amount = 0
        var removePortfolios = await Portfolio.find({
            userId: user._id
        })

        for(const portfolio of portfolios.values()) {
            var _idRemove = undefined
            if(portfolio.amount !== 0) {
                const portfolioDB = await Portfolio.findOneAndUpdate({
                    userId: user._id,
                    country: portfolio.country,
                    ticker: portfolio.ticker
                }, {
                    userId: user._id,
                    country: portfolio.country,
                    ticker: portfolio.ticker,
                    amount: portfolio.amount,
                    average: portfolio.average
                }, {
                    upsert: true
                })
                portfolioDB ? _idRemove = portfolioDB._id.toString() : undefined
            }
            removePortfolios = removePortfolios.filter(remove => {
                return remove._id.toString() !== _idRemove
            }) 
        }

        for(const portfolio of removePortfolios) {
            await Portfolio.findOneAndDelete({
                userId: user._id,
                country: portfolio.country,
                ticker: portfolio.ticker
            })
        }
    } catch(e) {
        console.log(e)
    }
}