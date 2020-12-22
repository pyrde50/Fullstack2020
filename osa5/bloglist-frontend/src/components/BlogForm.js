import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const AddBlogForm = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.addBlog}>
        <div>
        title:
          <input
            type="text"
            value={props.title}
            id="title"
            onChange={({ target }) => props.setTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={props.author}
            id="author"
            onChange={({ target }) => props.setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={props.url}
            id="url"
            onChange={({ target }) => props.setURL(target.value)}
          />
        </div>
        <button type="submit">create!</button>
      </form>
    </div>
  )
}


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
            props.setBlogs(props.blogs.concat(returnedBlog))
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
      throw new (error)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {props.name} logged in <button onClick={props.handleLogout}>logout</button>
      <br />
      <br />
      <Togglable buttonLabel='create new Blog'>
        <AddBlogForm addBlog={addBlog} title={title} author={author} url={url} setTitle={setTitle} setURL={setURL} setAuthor={setAuthor}/>
      </Togglable>
    </div>
  )
}

export default  BlogForm
export { AddBlogForm }