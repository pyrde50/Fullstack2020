const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

const normal = {
  username: 'minää',
  name: 'youu',
  password: 'salainen'
}

const normal2 = {
  username: 'minää',
  name: 'you6u',
  password: 'saladfginen'
}

const shortPassword = {
  username: 'miää',
  name: 'youu',
  password: 'aa'
}

const shortUserName = {
  username: 'mä',
  name: 'youu',
  password: 'aaaaaaaa'
}

test('amount of users increases by one when post called', async () => {
  const start = await api.get('/api/users').expect(200)

  await api
    .post('/api/users')
    .send(normal)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/users')
  expect(res.body).toHaveLength(start.body.length + 1)
})

test('user should not be added when password too short', async () => {
  const start = await api.get('/api/users').expect(200)

  await api
    .post('/api/users')
    .send(shortPassword)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/users')
  expect(res.body).toHaveLength(start.body.length)
})

test('user should not be added if username taken', async () => {

  await api
    .post('/api/users')
    .send(normal)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/users')
    .send(normal2)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('user should not be added when username too short', async () => {
  const start = await api.get('/api/users').expect(200)

  await api
    .post('/api/users')
    .send(shortUserName)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/users')
  expect(res.body).toHaveLength(start.body.length)
})


afterAll(() => {
  mongoose.connection.close()
})

// npm test -- tests/users_API_post.test.js