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

test('blogs have id not _id', async() => {
  const res = await api.get('/api/blogs')
  console.log(res.body[0].id)
  expect(res.body[0].id).toBeDefined()
})



afterAll(() => {
  mongoose.connection.close()
})


//      npm test -- tests/blogs_testID.test.js