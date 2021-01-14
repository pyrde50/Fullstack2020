import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { vote } from '../reducers/anecdoteReducer'



const AnecdoteList = (props) => {
  const anecdotes = () => {
    if (props.filter !== '') {
      return props.anecdote.filter(anec => anec.content.includes(props.filter))
    } else {
      return props.anecdote
    }
  }

  const voteAnec = (anecdote) => {
    props.vote(anecdote, anecdotes())
    const content = `You voted '${anecdote.content}'`
    props.setNotification(content.toString(), 5)
  }

  return (
    <div>
      {anecdotes().map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const ListAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ListAnecdotes