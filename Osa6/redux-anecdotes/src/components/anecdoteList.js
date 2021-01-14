import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import setNotification from '../reducers/notificationReducer'



const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)

  const voteAnec = (anecdote) => {
    dispatch(vote(anecdote, anecdotes))
    // dispatch(setNotification(`You created '${anecdote.content}'`, 5))
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
            <button onClick={() => voteAnec(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList