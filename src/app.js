const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

// define path for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(
  path.join(__dirname, '../public')
))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Konstantin Chistyakov'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Konstantin Chistyakov'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Konstantin Chistyakov',
    message: 'Help Message'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address term'
    })
  }

  geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({error})
        }
        res.send({
          forecast: forecastData,
          location
        })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Not Found',
    error: 'Help Article is not found. 404',
    name: 'Konstantin Chistyakov'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Help',
    error: 'Page not found. 404',
    name: 'Konstantin Chistyakov'
  })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})