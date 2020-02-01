const request = require('request')
const geocode = (address, callback) => {
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2xhZHlzd25nIiwiYSI6ImNrNXB1cHJ5azBrYXgza3FsbHN3OGhicGQifQ.mJ3IHbwktK7DeS5HjELLQg`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('Uncable to find location, try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    })
 
}

// geocode('China', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

module.exports = geocode