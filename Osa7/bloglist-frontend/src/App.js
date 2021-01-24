import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogs from './services/blogs'
import loginUser from './services/loginUser'
import LoginForm from './components/LoginForm'
import ErrorNotification from './components/errorMessage'
import Notification from './components/notification'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorNotification } from './reducers/errorNotificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logoutUser } from './reducers/loginReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const blogit = useSelector(state => state.blogReducer)
  const user = useSelector(state => state.user)


  useEffect(() => {
    const maybeUser = window.localStorage.getItem('user')
    if (maybeUser !== null) {
      setName(maybeUser.split(',')[2].split('"')[3])
      blogs.setToken(maybeUser.split(',')[0].split('"')[3])
      dispatch(login(JSON.stringify(maybeUser).split(',')[3].split('"')[3]))
    }
    dispatch(initializeBlogs())
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginUser.loginUser({
        username, password,
      })
      setName(user.name)
      blogs.setToken(user.token)
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      dispatch(login(JSON.stringify(user)))
      setUsername('')
      setPassword('')

    } catch (e) {
      dispatch(setErrorNotification('wrong credentials',5))
    }
  }

  const handleLogout = async() => {
    window.localStorage.removeItem('user')
    dispatch(logoutUser())
    setName(null)
  }



  return (
    <div>
      <ErrorNotification/>
      <Notification/>
      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> :
        <BlogForm blogs={blogit} name={name} handleLogout={handleLogout} blogit={blogit} />}
      {blogit !== undefined && user !== null?
        blogit.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog}/>
        ): null}
    </div>
  )

}

export default App