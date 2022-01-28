import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import axios from 'axios'
import CountryFilter from './components/CountryFilter'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  let countriesToShow = filter === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleClick = (event) => {
    countriesToShow = countriesToShow.filter(country =>
      country.name.common.includes(event.target.value)
    )
    setFilter(event.target.value)
  }

  return (
    <div>
      <CountryFilter
        value={filter}
        onChange={setFilter}
      />
      <br />
      <Country
        countries={countriesToShow}
        handleClick={handleClick}
      />
      <Weather
        countries={countriesToShow}
      />
    </div>
  )
}

export default App