import React from "react"

const PersonForm = (props) => {
  const { submitHandler, name, nameChange, number, numberChange} = props
  
  return (
    <form onSubmit={submitHandler}>
      <div>Name: <input value={name} onChange={nameChange} /> </div>
      <div>Number: <input value={number} onChange={numberChange} /> </div>
      <div> <button type="submit">Add</button> </div>
    </form>
  )
}
  
const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </ul>
  )
}
  
const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

export { PersonForm, Persons }
