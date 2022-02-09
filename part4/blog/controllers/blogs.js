const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.title) {
    return res.status(400).json({
      error: 'title missing',
    })
  } else if (!body.author) {
    return res.status(400).json({
      error: 'author missing',
    })
  } else if (!body.url) {
    return res.status(400).json({
      error: 'url missing',
    })
  } else if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())
})

module.exports = blogsRouter
