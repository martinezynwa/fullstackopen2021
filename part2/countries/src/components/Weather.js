import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city, countries }) => {
    const [weather, setWeather] = useState([])
    var numberOfCountries = countries.length
    var apiKey = process.env.REACT_APP_API_KEY

    console.log('apiKey :>> ', apiKey);
    
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city?.[0] + '&appid=' + apiKey

    useEffect(() => {
        axios
            .get(baseUrl)
            .then(response => {
                setWeather(response.data)
            })
    }, [city?.[0]])

    switch (numberOfCountries) {
        default:
            return (
                <div></div>
            )
        case 1:
            return (
                <div>
                    <h2>Weather in {city[0]}</h2>
                    <div><b>temperature: </b>{((weather.main?.temp) - 273.15).toFixed(0)} Celsius</div>
                    <img src={'http://openweathermap.org/img/wn/' + weather.weather?.[0].icon + '@2x.png'}
                                width="auto"
                                height="auto"
                            />
                    <div><b>wind: </b>{weather.wind?.speed} mph,  {weather.wind?.deg} degrees</div>
                </div>
            )
    }

}

export default Weather;