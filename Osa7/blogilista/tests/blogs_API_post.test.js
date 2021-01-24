const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
})

const normal = {
  title: 'mädddd',
  author: 'sä',
  url: 'joku',
  likes: 5
}

const noLikes = {
  title: 'mädddd',
  author: 'sä',
  url: 'joku',
}

const noURL = {
  title: 'mä',
  author: 'sä',
}

const noTitle = {
  author: 'sä',
  url: 'joku'
}

test('amount of blogs increases by one when post called', async () => {
  const start = await api.get('/api/blogs').expect(200)
  const person = await api.get('/api/users')
  const userForToken = {
    username: person.body[0].username,
    id: person.body[0].id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(normal)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(start.body.length + 1)
})

test('blogs have default value of likes of likes not set', async() => {
  const person = await api.get('/api/users')
  const userForToken = {
    username: person.body[0].username,
    id: person.body[0].id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(noLikes)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  expect(res.body[0].likes).toEqual(0)
})

test('get 400 when no URL', async() => {
  const person = await api.get('/api/users')
  const userForToken = {
    username: person.body[0].username,
    id: person.body[0].id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(noURL)
    .expect(400)
})

test('get 400 when no title', async() => {
  const person = await api.get('/api/users')
  const userForToken = {
    username: person.body[0].username,
    id: person.body[0].id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(noTitle)
    .expect(400)
})

test ('401 when no token', async() => {
  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ')
    .send(normal)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})


//      npm test -- tests/blogs_API_post.test.js