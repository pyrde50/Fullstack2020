const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('get 204 after delete', async () => {
  const start = await api.get('/api/blogs')
  await api
    .delete(`/api/blogs/${start.body[0].id}`)
    .expect(204)
})

test('one item gets removed after delete', async () => {
  const start = await api.get('/api/blogs')

  const finale = await api
    .delete(`/api/blogs/${start.body[0].id}`)
    .expect(204)

  expect(finale.body.length + 1 === start.body.length)
})

afterAll(() => {
  mongoose.connection.close()
})

// npm test -- tests/blogs_API_delete.test.js*/