import React, { useState } from "react"

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const DisplayCurrent = ({ anecdotes, points, selected }) => {
  return (
    <>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <p>Has {points[selected]} votes</p>
    </>
  )
}

const DisplayMostVoted = ({ anecdotes, points }) => {
  let mostVotes = 0
  let mostVotedIndex = 0

  for (let i = 0; i < points.length; i++) {
    if (points[i] > mostVotes) {
      mostVotes = points[i]
      mostVotedIndex = i
    }
  }

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>Has {points[mostVotedIndex]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min) // When min is 0, max is non-inclusive.
  
  const handleNextAnecdoteClick = () => setSelected(generateRandomNumber(0, anecdotes.length))
  const handleVoteAnecdoteClick = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1 // Updating a state properly needs to be done via a copy.
    setPoints(copyPoints)
  }

  return (
    <div>
      <DisplayCurrent
        anecdotes={anecdotes}
        points={points}
        selected={selected}
      />
      <Button 
        handleClick={handleVoteAnecdoteClick}
        text="Vote"
      />
      <Button 
        handleClick={handleNextAnecdoteClick}
        text="Next anecdote"
      />
      <DisplayMostVoted
        anecdotes={anecdotes}
        points={points}
      />
    </div>
  )
}

export default App;
