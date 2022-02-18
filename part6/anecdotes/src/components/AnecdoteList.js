import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state =>
    state.anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes),
  )

  const dispatch = useDispatch()

  const handleVote = id => {
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(voteFor(id))
    dispatch(setNotificationMessage(`you voted for '${votedAnecdote.content}'`))
    setTimeout(() => dispatch(setNotificationMessage('')), 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
