import React from 'react'
import { useDispatch } from 'react-redux'
import { initializeAddition } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(initializeAddition(content))
    dispatch(setNotificationMessage(`anecdote '${content}' created`, 5000))
  }

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
      <br />
    </div>
  )
}

export default AnecdoteForm
