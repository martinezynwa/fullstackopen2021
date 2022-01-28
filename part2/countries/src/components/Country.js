import React from 'react';

const Country = ({ countries, handleClick }) => {

    switch (true) {
        default:
            return (
                <div>too many matches, specify another filter</div>
            )
        case (countries.length === 0):
            return (
                <div>no country found</div>
            )
        case (countries.length === 1):
            return (
                <div>
                    <div key={countries[0].name.common}>
                        <h1>{countries[0].name.common}</h1>
                        <div>capital {countries[0].capital}</div>
                        <div>population {countries[0].population}</div>
                        <h2>languages</h2>
                        {Object.values(countries[0].languages).map(value =>
                            <li key={value}>{value}</li>)}
                        <br />
                        <img src={countries[0].flags["png"]}
                            width="200px"
                            height="auto"
                        />
                    </div>
                </div>
            )
        case (countries.length <= 10):
            return (
                <div>
                    {countries.map(country =>
                        <div key={country.name.common}>
                            {country.name.common}
                            <button value={country.name.common} onClick={handleClick}>show</button>
                        </div>
                    )}
                </div>
            )
    }
}

export default Country;