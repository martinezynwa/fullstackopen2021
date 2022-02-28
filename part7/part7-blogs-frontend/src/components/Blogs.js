import React from 'react'
import Blog from '../components/Blog'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
