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
import { loginUseri, logoutUser } from './reducers/loginReducer'
import Users from './components/Users'
import  { initializeUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import Preview from './components/Preview'
import './App.css'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const blogit = useSelector(state => state.blogReducer)
  const login = useSelector(state => state.login)


  useEffect(() => {
    const maybeUser = window.localStorage.getItem('user')
    if (maybeUser !== null) {
      setName(maybeUser.split(',')[2].split('"')[3])
      blogs.setToken(maybeUser.split(',')[0].split('"')[3])
      dispatch(loginUseri(maybeUser.split(',')[3].split('"')[3]))
    }
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginNew = await loginUser.loginUser({
        username, password,
      })
      setName(loginNew.name)
      blogs.setToken(loginNew.token)
      window.localStorage.setItem(
        'user', JSON.stringify(loginNew)
      )
      dispatch(loginUseri(JSON.stringify(loginNew)))
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
      <Router>
        <div className="App-menu">
          <Link to='/blogs'>Blogs  </Link>
          <Link to='/users'>Users  </Link>
          <Preview name={name} handleLogout={handleLogout}/>
        </div>
        <ErrorNotification/>
        <Notification/>
        {login === null ?
          <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> :
          <Switch>
            <Route path="/users/:id">
              <User/>
            </Route>
            <Route path="/users">
              <Users/>
            </Route>
            <Route path="/blogs/:id">
              <SingleBlog/>
            </Route>
            <Route path="/">
              <BlogForm/>
              {blogit !== undefined && login !== null?
                blogit.sort((a, b) => b.likes - a.likes).map(blog =>
                  <Blog key={blog.id} blog={blog}/>
                ): null}
            </Route>
          </Switch>
        }
      </Router>
    </div>
  )

}

export default App