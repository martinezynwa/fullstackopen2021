import React, { useState, useEffect } from "react"

import Filter from "./components/Filter"
import PhoneBook from "./components/PhoneBook"
import PersonForm from "./components/PersonForm"
import PersonService from "./services/PersonService"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setshowFilter] = useState('')
  const [showMessage, setShowMessage] = useState(null)

  useEffect(() => {
    PersonService
      .getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => alert(`Data not retrieved`))
  }, [])

  const addNewName = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name === personObject.name)) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace old number with ${personObject.number}? `) == true) {
        const foundPerson = persons.find(person => person.name === personObject.name)
        const changedPerson = { ...foundPerson, number: personObject.number }
        PersonService
          .update(foundPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`Update failed. User ${newName} is not in the phonebook.`)
            setPersons(persons.filter(n => n.name !== newName))
          })
      }
    } else {
      PersonService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setShowMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setShowMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }

  const deleteRecord = person => {
    const message = `Removal failed. User ${person.name} is not in the phonebook.`
    if (window.confirm(`Delete ${person.name}? `) == true) {
      PersonService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(item => item.id !== person.id))
        })
        .catch(error => {
          alert(message)
          setShowMessage(message)
          setTimeout(() => {
            setShowMessage(null)
          }, 3000)
        })
    }
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={showMessage} />
      <Filter showFilter={showFilter} setshowFilter={setshowFilter} />
      <h2>add a new</h2>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        <PhoneBook persons={persons} showFilter={showFilter} deleteRecord={deleteRecord} />
      </ul>
    </div>
  )
}

export default App 