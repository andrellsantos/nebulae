const express = require('express')
require('./db/mongoose')

const path = require('path')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load(path.resolve(__dirname,'./api-docs/swagger.yaml'))

const user = require('./routers/user')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

// APIs
app.use('/api-docs/users', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/users', user)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})