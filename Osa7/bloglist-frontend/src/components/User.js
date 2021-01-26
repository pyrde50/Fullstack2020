import React from 'react'
import { useSelector } from 'react-redux'
import {
  useParams
} from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.user)
  const id = useParams().id
  const user = users.find(user => user.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      {user.blogs.map(blog =>
        <li key={blog.id}>
          {blog.title}
        </li>
      )}
    </div>
  )
}

export default User