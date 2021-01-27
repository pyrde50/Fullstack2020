import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import commentService from '../services/comments'

const Comments = () => {
  const blogs = useSelector(state => state.blogReducer)
  const [comment, setComment] = useState('')
  const id = useParams().id
  if (!blogs) {
    return null
  }
  const blog = blogs.find(blog => blog.id === id)
  const allComments = blog.comments

  const getID = () => {
    return Math.floor(Math.random() * Math.floor(10000))
  }

  const handleSubmit = () => {
    const math = getID()
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
      comments: blog.comments.concat(({ comment, math }))
    }
    commentService.addComment(blogObject)
  }

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
          Add comment:
        <input
          type="text"
          value={comment}
          id="title"
          onChange={({ target }) => setComment(target.value)}/>
        <button type='submit'>create</button>
      </form>
      {allComments.map((comment) =>
        <li key={comment.math}>
          {comment.comment}
        </li>
      )}
    </div>
  )
}

export default Comments