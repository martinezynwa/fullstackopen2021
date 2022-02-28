import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { initializeUpdate } from '../reducers/blogsReducer'
import { initializeDeletion } from '../reducers/blogsReducer'

const BlogPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const match = useMatch('/blogs/:id')
  const selectedBlog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

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

  if (!selectedBlog) {
    return null
  }

  return (
    <div key={selectedBlog.id}>
      <h2>{selectedBlog.title}</h2>
      <div>{selectedBlog.url}</div>
      <div>{selectedBlog.likes}</div>
      <button id="likeButton" onClick={() => clickLike(selectedBlog)}>
        like
      </button>
      <div>added by {selectedBlog.author}</div>
      <button id="deleteButton" onClick={() => clickDelete(selectedBlog)}>
        delete
      </button>
    </div>
  )
}

export default BlogPage
