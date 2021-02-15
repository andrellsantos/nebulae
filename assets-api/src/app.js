const express = require('express')
require('./db/mongoose')
const stock = require('./routes/stock');

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

// APIs
app.use('/api/assets/br/stocks', stock);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})