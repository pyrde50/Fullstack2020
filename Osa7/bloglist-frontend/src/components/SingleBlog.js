import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import  { deleteBlog, likeBlog } from '../reducers/blogReducer'
import Comments from './Comments'

const SingleBlog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogReducer)
  const user = useSelector(state => state.login)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const Delete = async () => {
    if (window.confirm(`Remove ${blog.title}, by ${blog.author}`)) {
      blogService
        .remove(blog)

      dispatch(deleteBlog(blog))
    }
  }

  const addLike = async () => {
    const allBlogs = await blogService.getAll()
    const filtered = allBlogs.filter(blogi => blogi.id === blog.id)[0]
    const blogObject = {
      user: filtered.user.id,
      likes: filtered.likes + 1,
      author: filtered.author,
      title: filtered.title,
      url: filtered.url,
      id: filtered.id,
      comments: filtered.comments
    }
    blogService.addLike(blogObject)
    dispatch(likeBlog(blogObject))
  }

  if (!blog || !user) {
    return null
  }
  const DeleteButton = () => {
    if (blog.user.id === user) {
      return (
        <div>
          <button onClick={Delete}>Delete</button>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div><a href={blog.url}>{blog.url}</a></div>
      {blog.likes} likes <button onClick={addLike}>vote!</button>
      <div>added by {blog.author}</div>
      <DeleteButton/>
      <Comments/>
    </div>
  )
}

export default SingleBlog