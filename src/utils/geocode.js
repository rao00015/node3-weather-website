const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FtazYxOSIsImEiOiJjanYwMWtnOW0xZXBqM3ltZmQ0a2hidnc3In0.YuJjOP5HGE-4ch9sYN92KA'

    request({url, json : true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to Internet Service", undefined)
        } else if(body.features.length === 0){
            callback('unable to find location 2', undefined)
        } else{
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
             })
        }             
    })      
}

module.exports = geoCode