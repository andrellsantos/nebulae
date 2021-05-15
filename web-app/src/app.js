const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Customizing the server
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Adding Handlebars for dynamic pages
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    // Using Handlebars to handle dynamic pages
    res.render('index', {
        
    })
})

// Express will send a response for each specific route
app.get('/br', (req, res) => {
    res.render('stock', {

    })
})

app.get('/br/*', (req, res) => {
    res.render('stock', {

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
    res.render('portfolio', {

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