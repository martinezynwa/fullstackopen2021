import React from 'react'

const Filter = ({ filter, onChange }) => {
    const handleFiltering = (event) => {
        onChange(event.target.value)
    }

    return (
        <div>
            <h2>Countries</h2>
            filter countries: <input value={filter} onChange={handleFiltering} />
        </div>
    )
}

export default Filter;