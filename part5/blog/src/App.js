import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showMessage, setShowMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
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
      setNotificationType('error')
      setShowMessage('Wrong credentials')
      setTimeout(() => {
        setShowMessage(null)
      }, 5000)
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
    setNotificationType('success')
    setShowMessage(
      `a new blog ${blogObject.title} by ${blogObject.author} added`,
    )
    setTimeout(() => {
      setShowMessage(null)
    }, 5000)
  }

  const clickLike = async blog => {
    try {
      const updatedData = {
        data: {
          likes: blog.likes + 1,
        },
        id: blog.id,
      }
      const updatedBlog = await blogService.update(updatedData)
      setBlogs(
        blogs.map(b =>
          b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b,
        ),
      )
      setNotificationType('success')
      setShowMessage(
        `total likes for ${updatedBlog.title}: ${updatedBlog.likes}`,
      )
      setTimeout(() => {
        setShowMessage(null)
      }, 5000)
    } catch (error) {
      setNotificationType('error')
      setShowMessage(`${error}`)
      setTimeout(() => {
        setShowMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const sortByLikes = () => {
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  }

  const clickDelete = async blog => {
    if (
      window.confirm(`Remove blog "${blog.title}" by ${blog.author}? `) == true
    ) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotificationType('success')
        setShowMessage(`blog ${blog.title} removed`)
        setTimeout(() => {
          setShowMessage(null)
        }, 5000)
      } catch (error) {
        setNotificationType('error')
        setShowMessage(`${error}`)
        setTimeout(() => {
          setShowMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <div>
      <Notification message={showMessage} type={notificationType} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h1>Blogs</h1>
          <p>{user.name} logged-in</p>
          <button
            onClick={() => {
              logoutHandler()
            }}>
            logout
          </button>
          <h1>Create new</h1>
          {blogForm()}
          {sortByLikes()}
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              clickLike={clickLike}
              clickDelete={clickDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
