const request = require('postman-request')

const forecast = (latitude , longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3ac889bee9990414fe4dbc5a0ee8e241&query='+ encodeURIComponent(latitude) +',' + encodeURIComponent(longitude) + '&units=m'
    
    request({url , json: true}, (error , { body }) => {
        if(error){
            callback('Unable to connect to weather services!', undefined);
        } else if(body.error){
            callback('Unable to find location.', undefined);
        } else{
            callback(undefined , body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}


// const forecast = (latitude , longitude , callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=3ac889bee9990414fe4dbc5a0ee8e241&query='+ encodeURIComponent(latitude) +',' + encodeURIComponent(longitude) + '&units=m'
    
//     request({url: url , json: true}, (error , response) => {
//         if(error){
//             callback('Unable to connect to weather services!', undefined);
//         } else if(response.body.error){
//             callback('Unable to find location.', undefined);
//         } else{
//             callback(undefined , response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
//         }
//     })
// }


module.exports = forecast