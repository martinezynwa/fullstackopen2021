import React from 'react'
import Blog from '../components/Blog'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUpdate } from '../reducers/blogsReducer'
import { initializeDeletion } from '../reducers/blogsReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const clickLike = async blog => {
    dispatch(initializeUpdate(blog))
  }

  const clickDelete = async blog => {
    if (
      window.confirm(`Remove blog "${blog.title}" by ${blog.author}? `) === true
    ) {
      dispatch(initializeDeletion(blog))
    }
  }

  return (
    <div>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          clickLike={clickLike}
          clickDelete={clickDelete}
        />
      ))}
    </div>
  )
}

export default Blogs
