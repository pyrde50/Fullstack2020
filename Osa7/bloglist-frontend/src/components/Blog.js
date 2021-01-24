import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [userID, setUserID] = useState('')
  const [deleted, setDeleted] = useState(false)

  const editVisibility = () => {
    setVisible(!isVisible)
  }

  useEffect(() => {
    const maybeUser = window.localStorage.getItem('user')
    if (maybeUser !== null) {
      setUserID(maybeUser.split(',')[3].split('"')[3])
    }
  }, [])

  const addLike = async () => {
    const allBlogs = await blogService.getAll()
    const filtered = allBlogs.filter(blogi => blogi.id === blog.id)[0]
    const blogObject = {
      user: filtered.user.id,
      likes: filtered.likes + 1,
      author: filtered.author,
      title: filtered.title,
      url: filtered.url,
      id: filtered.id
    }
    blogService
      .addLike(blogObject)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
      })
  }

  const Delete = async () => {
    if (window.confirm(`Remove ${blog.title}, by ${blog.author}`)) {
      blogService
        .remove(blog)

      setDeleted(true)
    }
  }

  const DeleteButton = () => {

    return (
      <div>
        <button onClick={Delete}>Delete</button>
      </div>
    )
  }




  return (
    deleted ? null : (
      <div>
        {isVisible ? (
          <div style={blogStyle}>
            {blog.title} <button onClick={editVisibility}>hide</button>
            <div>{blog.url}</div>
            <div>likes {likes} <button onClick={addLike}>like!</button></div>
            <div>{blog.author}</div>
            {userID === blog.user.id && DeleteButton()}
          </div>
        ) : (
          <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={editVisibility}>view</button>
          </div>
        )}
      </div>
    )
  )
}


export default Blog
