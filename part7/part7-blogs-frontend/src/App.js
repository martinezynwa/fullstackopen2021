import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  Routes,
  Route,
  Link,
  /*  Navigate,
  useParams,
  useNavigate,
  useMatch,*/
} from 'react-router-dom'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotificationMessage } from './reducers/notificationReducer'
import './style.css'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        home
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificationMessage('Wrong credentials', 5000))
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const afterLogin = () => (
    <div>
      <Notification />
      <Menu />
      <Header logout={logoutHandler} user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Create new</h1>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <br />
              <Blogs />
            </>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )

  return <div>{user === null ? loginForm() : afterLogin()}</div>
}

export default App
