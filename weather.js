const request = require('request')

const forecast = (address,callback) =>{
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ encodeURIComponent(address)+"&appid=7b0d6b53ad53c51f884baaef3278eff9"
    request({url:url,json:true},(error,response)=>{
        if (error){
            callback('Unable to connect to weather services!!',undefined)
        }
        else{
            if(response.body.cod=="404"){
                callback(response.body.message,undefined)
            }
            else{
                callback(undefined,{
                    name:response.body['name'],
                    des:response.body.weather[0].description,
                    icon:response.body.weather[0].icon,
                    temp:response.body.main.temp,
                    pressure:response.body.main.pressure
                })
            }

        }
    })
    
}

module.exports = forecast
