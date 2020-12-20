import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import blogs from './services/blogs'
import blogService from './services/blogs'
import loginUser from './services/loginUser'
import LoginForm from './components/LoginForm'
import ErrorNotification from './services/errorMessage'
import Notification from './services/notification'

const App = () => {
  const [blogit, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [name, setName] = useState('')


  useEffect(() => {
    const maybeUser = window.localStorage.getItem('user')
    if (maybeUser !== null) {
      setName(maybeUser.split(',')[2].split('"')[3])
      blogs.setToken(maybeUser.split(',')[0].split('"')[3])
    }
    setUser(JSON.stringify(maybeUser))



    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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
      setUser(JSON.stringify(user))
      setUsername('')
      setPassword('')

    } catch (e) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async() => {
    window.localStorage.removeItem('user')
    setUser(null)
    setName(null)
  }



  return (
    <div>
      <ErrorNotification errorMessage={errorMessage}/>
      <Notification message={message}/>
      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> :
        <BlogForm blogs={blogit} name={name} handleLogout={handleLogout} blogit={blogit} setBlogs={setBlogs} setMessage={setMessage} setErrorMessage={setErrorMessage} />}
    </div>
  )

}

export default App