const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()


// Define path for Express config

//configure express to serve the directory up
// static takes the path to the folder we want to serve up
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views loation
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    //render allows us to render views, we've configured express to use view engine hps,.
    res.render('index', {
        title: 'Weather',
        name: 'Gladys Wong'
        // Contains all values you want that view to be able to access
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Gladys Wong'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name:'Gladys Wong',
        description: 'Ask me anything'
    })
})




// app.get('', (req, res) => {
//     // send response back to the requester - exp display on the browser

//     res.send('<h1>Weather<h1>')  
// })


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({ error })
            }
            res.send({

                forecast: forecastData,
                location,
                address
                
            })
    })
    })
    

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    // return to stop running the code so the response doesn't get sent twice

    console.log(req.query.search)
    res.send({
        products:[]
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gladys Wong',
        errorMessage: 'Help article not found'
    })
})



app.get('*', (req,res) => {
    res.render('404 ', {
        title: '404',
        name: 'Gladys Wong',
        errorMessage: 'Page not found'
        
    })
})


// starts up a server and have it listen to a specific port
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

