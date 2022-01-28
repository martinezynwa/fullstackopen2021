import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameAddition = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAddition = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltering = (event) => {
    setFilteredName(event.target.value)
  }

  const personsToShow = filteredName === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter names: <input value={filteredName} onChange={handleFiltering} /></div>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameAddition} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberAddition} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person, index) => <div key={index}>{person.name} {person.number}</div>)}
      </div>
    </div>
  )
}


export default App