import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import  { reset } from '../reducers/notificationReducer'



const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)

  const voteAnec = (id) => {
    dispatch(vote(id, anecdotes))
    setTimeout(() => {
      dispatch(reset())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.filter(anecdote => anecdote.content.includes(filter)).map(anecdote =>
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