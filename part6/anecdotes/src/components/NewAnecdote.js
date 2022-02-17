import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = props => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      <form onSubmit={addAnecdote}>
        <div>Add anecdote:</div>
        <input name="anecdote" />
        <button type="submit">add</button>
        <br />
        <br />
      </form>
    </div>
  )
}

export default NewAnecdote
