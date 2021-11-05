import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import { PersonForm, Persons } from "./components/Persons"
import personService from "./services/persons"


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
      setErrorMessage(`Please fill both entry form fields`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    else if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
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
          setNotification(`Added ${newName} to phonebook`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
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
        setNotification(`Updated ${newName}'s number`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
        resetPersonInputs()
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${updatePerson.name} has already been removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setPersons(persons.filter(person => person.name !== updatePerson.name))
      })
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Remove ${person.name} from phonebook?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification(`Removed ${person.name} from phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(error => {
        setPersons(persons.filter(p => p.name !== person.name))
      })
    }
  }

  const Notification = ({ notification, errorMessage }) => {
    if (notification !== null) {
      return (
        <div className="notification">
          {notification}
        </div>
      )
    }
    else if (errorMessage !== null) {
      return (
        <div className="error">
          {errorMessage}
        </div>
      )
    }
    else {
      return null
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
      <Notification
        notification={notification}
        errorMessage={errorMessage}
      />
      <Filter 
        filter={searchFilter}
        filterHandler={handleSearchFilter}
      />
      <h3>Add a new entry</h3>
      <PersonForm 
        submitHandler={addPerson}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={shownPersons}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App
