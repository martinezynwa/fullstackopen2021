import React from 'react'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
  const match = useMatch('/users/:id')
  const user = match ? users.find(user => user.id === match.params.id) : null

  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      {user.blogs.map(user => (
        <div key={user.id}>{user.title}</div>
      ))}
    </div>
  )
}

export default User
