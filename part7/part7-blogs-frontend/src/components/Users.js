import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map(user => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>
              <b>{user.name}</b>
            </Link>
            :{user.blogs.length} blogs created
          </div>
        ))}
      </div>
    </div>
  )
}
export default Users
