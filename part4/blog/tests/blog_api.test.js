const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialNotes) {
    let noteObject = new Blog(blog)
    await noteObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blog posts', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('making a HTTP POST is successful', async () => {
  const newBlog = {
    title: 'test run x',
    author: 'test author x',
    url: 'www.testurlx.test',
  }

  try {
    expect(newBlog.likes).toBeDefined()
  } catch (error) {
    newBlog.likes = 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(c => c.title)

  expect(response.body.length).toBe(helper.initialNotes.length + 1)
  expect(contents).toContain(newBlog.title)
})


afterAll(() => {
  mongoose.connection.close()
})
