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

const normal = {
  title: 'mädddd',
  author: 'tää on se uus',
  url: 'joku',
  likes: 5
}

test('get 200 after put', async () => {
  const start = await api.get('/api/blogs')
  await api
    .put(`/api/blogs/${start.body[0].id}`)
    .send(normal)
    .expect(200)
})

test('contains new item to which old one was edited to', async () => {
  const start = await api.get('/api/blogs')


  await api
    .put(`/api/blogs/${start.body[0].id}`)
    .send(normal)


  const finale = await api.get('/api/blogs')


  expect(finale.body.filter((blog) => blog.author === 'tää on se uus').length > 0)
})

test('doesnt edit if id is wrong', async () => {
  const start = await api.get('/api/blogs')

  await api
    .put('/api/blogs/eiainakaaoikeeID')
    .send(normal)
    .expect(400)


  const finale = await api.get('/api/blogs')

  expect(finale.body).toEqual(start.body)
})

afterAll(() => {
  mongoose.connection.close()
})


// npm test -- tests/blogs_API_edit.test.js