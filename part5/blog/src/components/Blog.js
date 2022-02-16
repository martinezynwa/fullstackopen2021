import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, clickLike, clickDelete }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blogs">
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>show</button>
        <div>{blog.title}</div>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div className="like">{blog.likes}</div>
        <button onClick={() => clickLike(blog)}>like</button>
        <div>{blog.author}</div>
        <button onClick={() => clickDelete(blog)}>delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  clickLike: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
}

export default Blog
