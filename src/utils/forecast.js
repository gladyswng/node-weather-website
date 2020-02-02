const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/6f209cb705d36fa1f575e3f5b0c18734/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body })=> {
        if (error) {
            callback('Unable to connect to weather service!')  //undefined as second arg
        } else if (body.error) {
            callback('Unable to find location.')  
        } else {
            const { temperature, precipProbability } = body.currently
            const { summary, temperatureHigh, temperatureLow } = body.daily.data[0]
            
            callback(undefined, `${summary} It is currently ${temperature} degrees out. The hight today is ${ temperatureHigh } and the low today is ${temperatureLow}. There's a ${precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast