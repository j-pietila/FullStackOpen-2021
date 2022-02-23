import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    const newNote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newNote))
    window.clearTimeout(window.timeout)
    dispatch(setNotification(`You created '${content}'`))
    window.timeout = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
