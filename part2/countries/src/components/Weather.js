import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ countries }) => {
    const [weather, setWeather] = useState([])
    const apiKey = process.env.REACT_APP_API_KEY

    const capitalCity = countries.length === 1
        ? countries[0].capital
        : null

    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + capitalCity?.[0] + '&appid=' + apiKey

    useEffect(() => {
        axios
            .get(baseUrl)
            .then(response => {
                setWeather(response.data)
            })
    }, [capitalCity?.[0]])

    switch (countries.length) {
        default:
            return (
                <div></div>
            )
        case 1:
            return (
                <div>
                    <h2>Weather in {capitalCity[0]}</h2>
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