import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h1>Users</h1>
      <div>
        <div>
          {users.map(user => (
            <div key={user.id}>
              <b>{user.name}</b>: {user.blogs.length} blogs created
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Users
