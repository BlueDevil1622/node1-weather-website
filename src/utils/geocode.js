const request = require('postman-request')

const geocode = ( address , callback ) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=8746fea0c71bb845592c1084b4cad05a&query='+ encodeURIComponent(address)

    request({url , json: true}, (error , { body }) => {
        if(error){
            callback('Unable to connect to location services!' , undefined)
        } else if(body.error || body.data.length === 0){
            callback('Unable to find location. Try another search.' , undefined)
        } else{
            callback(undefined , {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

// const geocode = ( address , callback ) => {
//     const url = 'http://api.positionstack.com/v1/forward?access_key=8746fea0c71bb845592c1084b4cad05a&query='+ encodeURIComponent(address)

//     request({url: url , json: true}, (error , response) => {
//         if(error){
//             callback('Unable to connect to location services!' , undefined)
//         } else if(response.body.error || response.body.data.length === 0){
//             callback('Unable to find location. Try another search.' , undefined)
//         } else{
//             callback(undefined , {
//                 latitude: response.body.data[0].latitude,
//                 longitude: response.body.data[0].longitude,
//                 location: response.body.data[0].label
//             })
//         }
//     })
// }

module.exports = geocode