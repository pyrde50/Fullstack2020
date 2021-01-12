import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import  { reset } from '../reducers/notificationReducer'


export  const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const addAnec = (event) => {
        event.preventDefault()
        const content = event.target.new.value
        event.target.new.value = ''
        dispatch(createAnecdote(content))
        setTimeout(() => {
          dispatch(reset())
        }, 5000)
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