import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(content))
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
