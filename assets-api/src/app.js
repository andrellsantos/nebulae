const express = require('express')
require('./db/mongoose')

const path = require('path')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.resolve(__dirname,'./api-docs/swagger.yaml'));

const stock = require('./routes/stock');

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

// APIs
app.use('/api-docs/assets', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
app.use('/api/assets/br/stocks', stock);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})