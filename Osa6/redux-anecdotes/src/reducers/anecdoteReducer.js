import anecdoteService from '../services/anecdoteService'

/* eslint-disable no-case-declarations */


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (id, anecdotes) => {
  return {
    type: 'VOTE',
    data: { id },
    anecdotes: { anecdotes }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ADD',
    data: { content }
  }
}

export const initializeAnecdotes = (content) => {
  return {
    type: 'INITIALIZE',
    data: { content }
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE':
    // eslint-disable-next-line no-case-declarations
    const anecdote = state.find(anec => anec.id === action.data.id)
    const addVote = {
      ...anecdote, votes: anecdote.votes + 1
    }
    return state.map(anec => anec.id !== action.data.id ? anec : addVote).sort((a,b) => b.votes - a.votes)

  case 'ADD':
    const newAnecdote = asObject(action.data.content)
    anecdoteService
      .addAnecdote(newAnecdote)
    return state.concat(newAnecdote)
  case 'INITIALIZE':
    return action.data.content
  default: return state
  }

}

export default reducer