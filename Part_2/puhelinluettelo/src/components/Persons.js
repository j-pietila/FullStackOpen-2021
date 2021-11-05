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
  
const Persons = ({ persons, removePerson }) => {
  return (
    <ul className="persons">
      {persons.map(person =>
        <Person
          key={person.id}
          person={person} 
          removePerson={() => removePerson(person.id)} />
      )}
    </ul>
  )
}
  
const Person = ({ person, removePerson }) => {
  return (
    <li>
      {person.name}{" "}
      {person.number}{" "}
      <button onClick={removePerson}>Remove</button>
    </li>
  )
}

export { PersonForm, Persons }
