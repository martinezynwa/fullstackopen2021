import React from 'react'

const Filter = ({ filteredName, onChange }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      filter names: <input value={filteredName} onChange={onChange} />
    </div>
  )
}

export default Filter;