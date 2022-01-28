import React from 'react'

const Filter = ({ filteredCountry, onChange }) => {
    return (
        <div>
            <h2>Countries</h2>
            filter countries: <input value={filteredCountry} onChange={onChange} />
        </div>
    )
}

export default Filter;