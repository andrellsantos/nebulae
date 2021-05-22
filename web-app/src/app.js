const path = require('path')
const express = require('express')
const hbs = require('hbs')
const dateFormat = require('dateformat')
const requestAPI = require('./utils/request-api')

const app = express()

// Customizing the server
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const stockAPI = 'http://localhost:3002/api/assets/br/stocks/'
const userAPI = 'http://localhost:3001/api/users/me/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlmZjY4YzYzODQ1MTAxMGE0YzUyMzEiLCJpYXQiOjE2MjE0NjA0ODN9.40gMmde1B0WMD4F045TQZDx-Cijurly6RkiEjivId3o'

const locationLabel = {
    'BR': 'pt-BR',
    'US': 'en-US'
}

const currencyLabel = {
    'BR': 'BRL',
    'US': 'USD'   
}

const typeLabel = {
    'STOCK': {
        'BR': 'AÇÃO',
        'US': 'STOCK'
    },
    'REIT': {
        'BR': 'FII',
        'US': 'REIT'
    }
}

// Adding Handlebars for dynamic pages
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

app.get('', (req, res) => {
    // Using Handlebars to handle dynamic pages
    res.render('index', {
        
    })
})

app.get('/br/*', async (req, res) => {
    const symbol = req.params[0].toUpperCase()
    const stockURL = stockAPI + symbol
    await requestAPI(stockURL, token, async (error, stockData) => {
        if(error || stockData == undefined) {
            res.render('404', {
                page: '404 page not found.',
            })
        }

        // TO-DO: Format currency values
        var quoteLabels = []
        var quoteDatasets = []
        var processLabels = true
        for (const [key, value] of Object.entries(stockData.tickers)) {
            const ticker = value.symbol
            const quoteURL = stockAPI + symbol + '/tickers/' + ticker + '/quotes/'
            var dataChart = []
            await requestAPI(quoteURL, token, (error, quoteData) => {
                if(quoteData != undefined) {
                    for(let key in quoteData) {
                        if(processLabels) {
                            const date = new Date(quoteData[key].date)
                            quoteLabels.push(dateFormat(date, 'dd/mm/yyyy'))
                        }
                        dataChart.push(quoteData[key].close)
                    }
                    processLabels = false
                }
            })
             
            const dataset = {
                label: ticker,
                data: dataChart
            }
            quoteDatasets.push(dataset)
        }

        const dataStockQuotes = {
            labels: quoteLabels,
            datasets: quoteDatasets
        }

        res.render('stock', {
            symbol,
            fullName: stockData.company.fullName,
            shortName: stockData.company.shortName,
            marketCap: '', // TO-DO
            registryNumber: stockData.company.registryNumber,
            foundationDate: stockData.company.foundationDate,
            exchangeComissionCode: stockData.exchangeComissionCode,
            exchangeRegistryDate: stockData.exchangeRegistryDate,
            headquarter: stockData.company.headquarter,
            sector: stockData.company.sector,
            dataStockQuotes,
            financials: stockData.financials
        })
    })
})

app.get('/user', (req, res) => {
    res.render('dashboard', {

    })
})

app.get('/user/dashboard', (req, res) => {
    res.render('dashboard', {

    })
})

app.get('/user/portfolio', (req, res) => {
    const portfoliosURL = userAPI + 'portfolios'
    requestAPI(portfoliosURL, token, (error, portfoliosData) => {
        var stocks = {
            'BR': [],
            'US': []
        }
        var reits = {
            'BR': [],
            'US': []
        }

        // TO-DO: Move to service-layer
        totalValue = {
            'STOCK': 75283.17,
            'REIT':  105692.40  
        }
        totalMax = {
            'STOCK': 105778.08,
            'REIT':  156979.20
        }
        weightTicker = {
            'STOCK': 180,
            'REIT':  120  
        }
        const stockQuote = {
            'ITSA3': 11.62,
            'ITUB3': 25.96,
            'B3SA3': 17.22,
            'BBSE3': 23.52,
            'GRND3': 9.35,
            'WEGE3': 31.61,
            'ARZZ3': 84.27,
            'FLRY3': 27.26,
            'EGIE3': 40.22,
            'MDIA3': 27.27,
            'LREN3': 43.63,
            'IRBR3': 6.01,
            'HYPE3': 35.55,
            'ABEV3': 17.32,
            'BBDC3': 22.31,
            'PSSA3': 50.66,
            'ENBR3': 18.63,
            'TAEE11': 39.51,
            'RECT11': 79.36,
            'HGLG11': 169.54,
            'RECR11': 102.10,
            'KNRI11': 145.36,
            'BCFF11': 85.53,
            'GGRC11': 119.86,
            'MXRF11': 10.49,
            'XPLG11': 113.26,
            'HGRE11': 128.21,
            'HGRU11': 117.94,
            'XPML11': 104.40,
            'IRDM11': 134.28
        }

        var stocksBRLabels = []
        var stocksBRDatasetBuy = []
        var stocksBRDatasetCurrent = []
        var reitsBRLabels = []
        var reitsBRDatasetBuy = []
        var reitsBRDatasetCurrent = []
        for (const [key, value] of Object.entries(portfoliosData)) {
            const formatterCurrency = new Intl.NumberFormat(locationLabel[portfoliosData[key].country], {
                style: 'currency',
                currency: currencyLabel[portfoliosData[key].country],
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            const formatterPercentile = new Intl.NumberFormat(locationLabel[portfoliosData[key].country], {
                style: 'percent',
                currency: currencyLabel[portfoliosData[key].country],
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // TO-DO: Move to service-layer
            const ticker = portfoliosData[key].ticker
            const total = totalValue[portfoliosData[key].type]
            const weight = portfoliosData[key].weight
            const quote = stockQuote[ticker] // portfoliosData[key].quote
            const amount = portfoliosData[key].amount
            const average = portfoliosData[key].average
            const buyTotal = average*amount
            const currentTotal = quote*amount
            const currentPercentile = currentTotal/total // portfoliosData[key].currentPercentile
            const goalPercentile = weight/weightTicker[portfoliosData[key].type] // portfoliosData[key].goalPercentile

            const portfolio = {
                ticker,
                shortName: portfoliosData[key].shortName,
                weight,
                quote: formatterCurrency.format(quote),
                delta: portfoliosData[key].delta,
                average: formatterCurrency.format(average),
                amount,
                buyTotal: formatterCurrency.format(buyTotal),
                currentTotal: formatterCurrency.format(currentTotal),
                currentPercentile: formatterPercentile.format(currentPercentile),
                goalPercentile: formatterPercentile.format(goalPercentile)
            }

            // TO-DO: Improve A LOT!
            if(portfoliosData[key].type == 'STOCK') {
                stocks[portfoliosData[key].country].push(portfolio)
                stocksBRLabels.push(ticker)
                stocksBRDatasetBuy.push(buyTotal.toFixed(2))
                stocksBRDatasetCurrent.push(currentTotal.toFixed(2))
            } else {
                reits[portfoliosData[key].country].push(portfolio)
                reitsBRLabels.push(ticker)
                reitsBRDatasetBuy.push(buyTotal.toFixed(2))
                reitsBRDatasetCurrent.push(currentTotal.toFixed(2))
            }
        }

        const dataStocksBR = {
            labels: stocksBRLabels,
            datasets: [{
                label: 'TOTAL COMPRA',
                data: stocksBRDatasetBuy
            }, 
            {
                label: 'TOTAL CORRENTE',
                data: stocksBRDatasetCurrent
            }]
        }

        console.log(stocksBRDatasetBuy)
        console.log(stocksBRDatasetCurrent)

        const dataReitsBR = {
            labels: reitsBRLabels,
            datasets: [{
                label: 'TOTAL COMPRA',
                data: reitsBRDatasetBuy
            }, 
            {
                label: 'TOTAL CORRENTE',
                data: reitsBRDatasetCurrent
            }]
        }

        res.render('portfolio', {
            stocks,
            reits,
            dataStocksBR,
            dataReitsBR
        })
    })
})

app.get('/user/transactions', (req, res) => {
    const transactionsURL = userAPI + 'transactions'
    requestAPI(transactionsURL, token, (error, transactionsData) => {
        transactions = []
        for (const [key, value] of Object.entries(transactionsData)) {
            const type = typeLabel[transactionsData[key].type][transactionsData[key].country]
            const date = new Date(transactionsData[key].date)
            const operation = (transactionsData[key].amount > 0) ? 'Compra' : 'Venda'

            const formatterCurrency = new Intl.NumberFormat(locationLabel[transactionsData[key].country], {
                style: 'currency',
                currency: currencyLabel[transactionsData[key].country],
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            const transaction = {
                ticker: transactionsData[key].ticker,
                type,
                country: transactionsData[key].country,
                date: dateFormat(date, 'dd/mm/yyyy'),
                operation,
                price: formatterCurrency.format(transactionsData[key].price),
                amount: transactionsData[key].amount,
                total: formatterCurrency.format(transactionsData[key].price * transactionsData[key].amount)
            }
            transactions.push(transaction)
        }

        res.render('transactions', {
            transactions
        })
    })
})

app.get('/user/return-rate', (req, res) => {
    res.render('return-rate', {

    })
})

app.get('/user/*', (req, res) => {
    res.render('dashboard', {

    })
})

// Needs to be the last to handle all routes without get
app.get('*', (req, res) => {
    res.render('404', {
        page: '404 page not found.',
    })
})

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log('Server is up on port 3000.')
})