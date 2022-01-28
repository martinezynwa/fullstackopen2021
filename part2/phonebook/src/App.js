import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./Components/Filter";
import PhoneBook from "./Components/PhoneBook";
import PersonForm from "./Components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showFilter, setshowFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const addNewName = e => {
    e.preventDefault();
    const noteObject = {
      name: newName,
      number: newNumber
    };

    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
    }

    setPersons(persons.concat(noteObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = e => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showFilter={showFilter} setshowFilter={setshowFilter} />
      <h2>add a new</h2>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        <PhoneBook persons={persons} showFilter={showFilter} />
      </ul>
    </div>
  );
};

export default App;