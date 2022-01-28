import React from 'react';

const Country = ({ countries, handleClick }) => {

    var numberOfCountries = countries.length
    const showOneCountry = () => {
        return (
            <div>
                <div>
                    {countries.map(country =>
                        <div key={country.name.common}>
                            <h1>{country.name.common}</h1>
                            <div>capital {country.capital}</div>
                            <div>population {country.population}</div>
                            <h2>languages</h2>
                            {Object.values(country.languages).map(value =>
                                <li key={value}>{value}</li>)}
                            <br />
                            <img src={country.flags["png"]}
                                width="200px"
                                height="auto"
                            />
                        </div>)}
                </div>
            </div>
        )
    }

    switch (true) {
        case (numberOfCountries === 1):
            return (<div>{showOneCountry()}</div>
            )
        case (numberOfCountries > 1 && numberOfCountries <= 10):
            return (
                <div>
                    {countries.map(country =>
                        <div key={country.name.common}>
                            <p className="p" key={country.name.common}>{country.name.common}</p>
                            <button value={country.name.common} onClick={handleClick}>show</button>
                        </div>
                    )}
                </div>
            )
        case (numberOfCountries === 0):
            return (
                <div>no country found</div>
            )
        default:
            return (
                <div>too many matches, specify another filter</div>
            )
    }
}

export default Country;