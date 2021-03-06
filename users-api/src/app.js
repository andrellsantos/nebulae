const express = require('express')
require('./db/mongoose')

const path = require('path')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load(path.resolve(__dirname,'./api-docs/swagger.yaml'))

const user = require('./routers/user')
const transaction = require('./routers/transaction')
const portfolio = require('./routers/portfolio')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

// APIs
app.use('/api-docs/users', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/users', user)
app.use('/api/users/me/transactions', transaction)
app.use('/api/users/me/portfolios', portfolio)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})