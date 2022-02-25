import React from 'react'

const Header = ({ logout, user }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <p id="success_login">{user.name} logged-in</p>
      <button
        onClick={() => {
          logout()
        }}>
        logout
      </button>
      <h1>Create new</h1>
    </div>
  )
}

export default Header
