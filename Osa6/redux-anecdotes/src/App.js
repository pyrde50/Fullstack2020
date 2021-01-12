import React from 'react'
import AnecdoteForm from './reducers/anecdoteForm'
import AnecdoteList from './reducers/anecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App