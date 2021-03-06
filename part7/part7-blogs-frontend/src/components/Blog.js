import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

/*const Blog = ({ blog, clickLike, clickDelete }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blogs">
      <div style={hideWhenVisible}>
        <button id="showBlogs" onClick={toggleVisibility}>
          show
        </button>
        <Link to={`/blogs/${blog.id}`}>
          <div id="blogTitle">{blog.title}</div>
        </Link>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div className="like">{blog.likes}</div>
        <button id="likeButton" onClick={() => clickLike(blog)}>
          like
        </button>
        <div>{blog.author}</div>
        <button id="deleteButton" onClick={() => clickDelete(blog)}>
          delete
        </button>
      </div>
    </div>
  )
}*/

const Blog = blog => {
  return (
    <div>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <Link to={`/blogs/${blog.blog.id}`}>
                <div>{blog.blog.title}</div>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Blog
