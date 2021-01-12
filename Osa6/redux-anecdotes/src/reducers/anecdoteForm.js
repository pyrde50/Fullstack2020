import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './anecdoteReducer'


export  const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const addAnec = (event) => {
        event.preventDefault()
        const content = event.target.new.value
        event.target.new.value = ''
        dispatch(createAnecdote(content))
      }
    
    return (
        <div>
        <h2>create new</h2>
          <form onSubmit={addAnec}>
            <div><input name='new' /></div>
            <button type='submit'>create</button>
          </form>
          </div>
      )

}

export default AnecdoteForm