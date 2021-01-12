import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from './anecdoteReducer'



const AnecdoteList = (props) => {

    const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const voteAnec = async (id) => {
    dispatch(vote(id))
  }
  
  return (
      <div>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnec(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
  
}

export default AnecdoteList