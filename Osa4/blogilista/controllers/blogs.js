const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body._doc)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blog.toJSON)
})


module.exports = blogsRouter