const Blog = require('../models/blog')

const initialNotes = [
  {
    title: 'test blog 1',
    author: 'test author 1',
    url: 'www.testurl.test',
    likes: 95,
  },
  {
    title: 'test blog 2',
    author: 'test author 2',
    url: 'www.testurll.test',
    likes: 200,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialNotes,
  blogsInDb,
}
