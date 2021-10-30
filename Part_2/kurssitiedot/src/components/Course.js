import React from "react"

const Course = ({ course }) => {
    const total = course.parts.reduce((sum, current) => 
                    sum + current.exercises, 0)
                    
    return (
        <div>
          <Header name={course.name} />
          <Content contents={course.parts} />
          Total of {total} exercises
        </div>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <>
        <h2>{name}</h2>
      </>
    )
  }
  
  const Content = ({ contents }) => {
    return (
      <ul>
        {contents.map(part => 
          <Part key={part.id} part={part} />
        )}
      </ul>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <li>{part.name} {part.exercises}</li>
    )
  }

export default Course
