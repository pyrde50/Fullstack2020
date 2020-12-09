// const app = require('./app')
const mongoose = require('mongoose')
const http = require('http')
const express = require('express')
const app = express()
const Blog = require('./models/blog')
const cors = require('cors')
var morgan = require('morgan')


morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.json())
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs',blogsRouter)

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})