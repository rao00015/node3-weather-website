const request = require('request')



const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1c08a67e06edb0d79bac0853ba218f09/' + lattitude + ',' + longitude
request({url, json: true},(error, {body}) => {
    if(error){
        callback('unable to connect to service', undefined)
    } else if(body.error){
        callback('unable to find location', undefined)
    } else{
        callback(undefined, body.daily.data[0].summary)
    } 
})  
}

module.exports = forecast