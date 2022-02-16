import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
    setNewBlog({ ...newBlog, title: '', author: '', url: '' })
  }

  return (
    <form className="forms" onSubmit={addBlog}>
      <label>title</label>
      <input
        id="title"
        value={newBlog.title}
        onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
      />
      <label>author</label>
      <input
        id="author"
        value={newBlog.author}
        onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
      />
      <label>URL</label>
      <input
        id="url"
        value={newBlog.url}
        onChange={e => setNewBlog({ ...newBlog, url: e.target.value })}
      />
      <button id="submit-button" type="submit">
        add
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm
