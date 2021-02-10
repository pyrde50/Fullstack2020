
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALLAUTHORS, ALLBOOKS } from './queries'
import Notify from './components/Notify'
import Recommended from './components/Recommended'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const authors = useQuery(ALLAUTHORS)
  const books = useQuery(ALLBOOKS)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-token') 
    if (token) {
      setToken(token)
    }
  }, [])

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  if (!token) {
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        
      </div>

      <Notify errorMessage={errorMessage}/>

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
        notify={notify}
      />

      <Books
        show={page === 'books'}
        books={books.data.allBooks}
      />

      <Login
      show={page === 'login'}
      token={token}
      setToken={setToken}
      notify={notify}
      setPage={setPage}
      />

    </div>
  )
} else {
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => logout()}>logout</button>
        
      </div>

      <Notify errorMessage={errorMessage}/>

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
        notify={notify}
      />

      <Books
        show={page === 'books'}
        books={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        notify={notify}
      />

      <Recommended
        show={page === 'recommended'}
        books={books.data.allBooks}
        notify={notify}
        />

    </div>
  )
}
}


export default App