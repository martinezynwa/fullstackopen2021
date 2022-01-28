import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import axios from 'axios'
import CountryFilter from './components/CountryFilter'
import Weather from './components/Weather'
import './components/style.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountry, setFilteredCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFiltering = (event) => {
    setFilteredCountry(event.target.value)
  }

  const handleClick = (event) => {
    const matchedCountry = countriesToShow.filter(country =>
      country.name.common.includes(event.target.value)
    )
    countriesToShow = matchedCountry
    setFilteredCountry(event.target.value)
  }

  let countriesToShow = filteredCountry === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(filteredCountry.toLowerCase()))

  const capitalCity = countriesToShow.length === 1
    ? countriesToShow.map(country => country.capital)
    : null

  return (
    <div>
      <CountryFilter
        value={filteredCountry}
        onChange={handleFiltering}
      />
      <br />
      <Country
        countries={countriesToShow}
        handleClick={handleClick}
      />
      <Weather
        city={capitalCity}
        countries={countriesToShow}
      />
    </div>
  )
}

export default App