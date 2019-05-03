const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
const request = require('request')

//defining the paths for views directory
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting the handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setting the location for static library
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Chirag Rao'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Chirag Rao'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'I need some help',
        title: 'Help',
        name: 'Chirag Rao'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

    {

        geoCode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }

            forecast(lattitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
        
    }  
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage : 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage: 'Page not found'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(3000, () =>{
    console.log('Server is running on port 3000')
})