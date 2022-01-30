import React from "react"

const PhoneBook = ({ persons, showFilter, deleteRecord }) => {
  let filterUpperCase = showFilter.toUpperCase()
  let newPersonArray = persons.filter(person => {
    let personInUpperCase = person.name.toUpperCase()
    return personInUpperCase.includes(filterUpperCase)
  })
  return newPersonArray.map(person => (
    <li key={person.name}>
      {person.name} : {person.number} <button value={person.id} onClick={() => deleteRecord(person)}>delete</button>
    </li>
  ))
}

export default PhoneBook 