const mongoose = require('mongoose')
require('dotenv').config()
const config = require('../utils/config')
const logger = require('../utils/logger')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number 
  })

  const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(
    logger.info('connected to MongoDB')
  )
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

  module.exports = mongoose.model('Blog', blogSchema) 