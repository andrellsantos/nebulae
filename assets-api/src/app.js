const express = require('express')
require('./db/mongoose')

const path = require('path')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load(path.resolve(__dirname,'./api-docs/swagger.yaml'))

const stock = require('./routers/stock')
const ticker = require('./routers/ticker')
const quote = require('./routers/quote')
const financial = require('./routers/financial')

const app = express()
const port = process.env.PORT || 3002

app.use(express.json())

// APIs
app.use('/api-docs/assets', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/assets/:country/stocks', stock)
app.use('/api/assets/:country/stocks/:symbol/tickers', ticker)
app.use('/api/assets/:country/stocks/:symbol/tickers/:ticker/quotes', quote)
app.use('/api/assets/:country/stocks/:symbol/financials', financial)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})