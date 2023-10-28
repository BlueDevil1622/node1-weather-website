const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')  // Custom desgined path for views
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')  //this single line used to setup handlebars
app.set('views',viewsPath) // to set the custom path 'viewsPath' to views
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req , res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Sree'
    })
})

app.get('/about', (req , res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sree'
    })
})

app.get('/help', (req , res) => {
    res.render('help',{
        title: 'help',
        message: 'How to change the name?',
        name: 'Sree'
    })
})

app.get('/weather', (req , res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided!!'
        })
    }
    geocode( req.query.address , (error , {latitude , longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
    
        forecast( latitude , longitude , (error , forecast_data) => {
            if(error){
                return res.send({ error });
            }
            res.send({
                address: req.query.address,
                forecast: forecast_data,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Sree',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Sree',
        errorMessage: 'Page Not Found'
    })
})

app.listen( port , () =>{
    console.log("Server is up on port " + port);
})


// app.get('', (req , res) => {   == instead of '' path ,the publicDirectoryPath is going to work as default
//     res.send('<h1>WEATHER REPORT</h1>');
// })

// app.get('/help', (req , res) => {
//     res.send([{
//         name: 'Sree'
//     },{
//         name: 'Hitha'
//     }]);
// })

// app.get('/about', (req , res) => {
//     res.send('<h3>About</h3>')
// })