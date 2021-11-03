import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import { PersonForm, Persons } from "./components/Persons"
import personService from "./services/persons"


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchFilter, setSearchFilter] = useState("")

  const shownPersons = (searchFilter.length === 0)
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (newName.length === 0 || newNumber.length === 0) {
      window.alert(`Please fill both entry form fields`)
    }
    else if (persons.some(person => person.name === newName)) {
      const message = `${newName} is already added to phonebook. Replace the old number with a new one?`
      if (window.confirm(message)) {
        updateNumber(personObject)
      }
      else {
        resetPersonInputs()
      }
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          resetPersonInputs()
        })
    }
  }

  const updateNumber = (personObject) => {
    const updatePerson = persons.find(person => person.name === newName)
        
    personService
      .update(updatePerson.id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => updatePerson.id !== person.id ? person : returnedPerson))
        resetPersonInputs()
      })
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Remove ${person.name} from phonebook?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const resetPersonInputs = () => {
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
      <Persons persons={shownPersons} removePerson={removePerson} />
    </div>
  )
}

export default App
