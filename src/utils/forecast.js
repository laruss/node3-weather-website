const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=00a13cd1a6343c9d559693845a4ead25&query=' + long + ',' + lat

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service")
        } else if (body.error) {
            callback("Unable to find location")
        } else {
            const { current } = body;
            callback(undefined, current.weather_descriptions[0] +
                ". It's currently " + current.temperature + " degrees out. It feels like " +
                current.feelslike + " degrees out.")
        }

    })
}

module.exports = forecast