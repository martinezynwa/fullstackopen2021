import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => (
  <div>
    <Notification />
    <Filter />
    <AnecdoteForm />
    <AnecdoteList />
  </div>
)

export default App
