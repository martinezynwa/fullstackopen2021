import React from 'react'
import { useEffect } from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
