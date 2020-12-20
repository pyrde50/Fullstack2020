import React, { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Togglable from './Togglable'


const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          if (JSON.stringify(returnedBlog).split(':')[0]=== '"error') {
            if(title === '') {
              props.setErrorMessage('title missing')
              setTimeout(() => {
                props.setErrorMessage(null)
              },5000)
            } else {
              props.setErrorMessage('URL missing')
              setTimeout(() => {
                props.setErrorMessage(null)
              },5000)
            }
          } else {
            props.setBlogs(props.blogit.concat(returnedBlog))
            props.setMessage(`new Blog ${title} added`)
            setTimeout(() => {
              props.setMessage(null)
            },5000)
            setTitle('')
            setAuthor('')
            setURL('')
          }
        })
    }  catch (error) {
      throw new error
    }
  }


  return (
    <div>
      <h2>blogs</h2>
      {props.name} logged in <button onClick={props.handleLogout}>logout</button>
      <br />
      <br />
      <Togglable buttonLabel='create new Blog'>
        <div>
          <h2>create new</h2>
          <form onSubmit={addBlog}>
            <div>
        title:
              <input
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
        author:
              <input
                type="text"
                value={author}
                name="title"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
        url:
              <input
                type="text"
                value={url}
                name="title"
                onChange={({ target }) => setURL(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
      </Togglable>
      {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} userID={props.userID} />
      )}
    </div>
  )
}

export default BlogForm