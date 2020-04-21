const express = require('express')
const path = require('path')
const hbs = require('hbs')

const forecast = require('../../weather-app/utils/utils_forecast.js')
const geocode = require('../../weather-app/utils/utils_geocode.js')

const app = express()
const port = process.env.PORT || 3000

const path_2 = path.join(__dirname, '../public')
const path_3 = path.join(__dirname, '../templates/views')
const path_4 = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', path_3)
hbs.registerPartials(path_4)                                                   //setting a path for constant templates

app.use(express.static(path_2))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kris Gurung'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Kris Gurung',
        title: 'Help Page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Kris Gurung',
        title: 'About Page'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address)
        return res.send({
            address: 'No address provided.'
        })

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if(error)
            return res.send({error})

        forecast(latitude, longitude, (error, new_data) => {
            const {summary} = new_data
            if(error)
                return res.send(error)
            res.send({
                address: req.query.address,
                location,
                summary
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Kris Gurung',
        problem: 'Help Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Kris Gurung',
        title: '404 Page',
        problem: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('The server is up!')
})