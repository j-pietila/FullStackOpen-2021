import React, { useState } from "react"
import Filter from "./components/Filter"
import { PersonForm, Persons } from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    {name: "Arto Hellas", number: "040-123456"},
    {name: "Ada Lovelace", number: "39-44-5323523"},
    {name: "Dan Abramov", number: "12-43-234345"},
    {name: "Mary Poppendieck", number: "39-23-6423122"}
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchFilter, setSearchFilter] = useState("")

  const shownPersons = (searchFilter.length <= 0)
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(element => element.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else if (newName.length <= 0 || newNumber.length <= 0) {
      window.alert(`Please fill both entry form fields`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
    }

    setNewName("")
    setNewNumber("")
  }

  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={searchFilter} filterHandler={handleSearchFilter} />
      <h3>Add a new entry</h3>
      <PersonForm 
        submitHandler={addPerson}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App
