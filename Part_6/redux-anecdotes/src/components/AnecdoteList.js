import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const anecdotesToSort = [...anecdotes].filter(
    anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return(
    anecdotesToSort
      .sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(voteAnecdote(anecdote))
              dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
            }}>
            vote
            </button>
          </div>
        </div>
      )
  )
}

export default AnecdoteList
