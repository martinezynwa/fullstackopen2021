const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user

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
    user: user._id,
  })

  await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  res.status(201).json(blog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(401).json({ error: 'blog does not exist' })
  }

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'only the creator can delete blog' })
  }

  await blog.remove()

  user.blogs = user.blogs.filter(
    b => b.id.toString() !== req.params.id.toString()
  )
  await user.save()
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    updatedNote => {
      res.json(updatedNote)
    }
  )
})

module.exports = blogsRouter
