const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
})

const normal = new Blog({
  title: 'mädddd',
  author: 'sä',
  url: 'joku',
  likes: 5
})

const noLikes = new Blog({
  title: 'mädddd',
  author: 'sä',
  url: 'joku',
})

const noURL = new Blog({
  title: 'mä',
  author: 'sä',
})

const noTitle = new Blog({
  author: 'sä',
  url: 'joku'
})

test('amount of blogs increases by one when post called', async () => {
  const start = await api.get('/api/blogs').expect(200)

  await api
    .post('/api/blogs')
    .send(normal)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(start.body.length + 1)
})

test('blogs have default value of likes of likes not set', async() => {
  await api
    .post('/api/blogs')
    .send(noLikes)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  expect(res.body[0].likes).toEqual(0)
})

test('get 400 when no URL', async() => {
  await api
    .post('/api/blogs')
    .send(noURL)
    .expect(400)
})

test('get 400 when no title', async() => {
  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})


//      npm test -- tests/blogs_API_post.test.js