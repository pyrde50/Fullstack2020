import anecdoteService from '../services/anecdoteService'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
      type: 'INITIALIZE',
      data: { anecdotes }
    })
  }
}

export const vote = (anecdote, anecdotes) => {
  return async dispatch => {
    const liked = anecdotes.find(anec => anec.id === anecdote.id)
    const final = await anecdoteService.voteAnecdote(liked)
    dispatch({
      type: 'VOTE',
      data: { final },
      anecdotes: { anecdotes }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(asObject(content))
    dispatch ({
      type: 'ADD',
      data: { newAnecdote }
    })
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE':
    return state.map(anec => anec.id !== action.data.final.id ? anec : action.data.final).sort((a,b) => b.votes - a.votes)
  case 'ADD':
    return state.concat(action.data.newAnecdote)
  case 'INITIALIZE':
    return action.data.anecdotes.sort((a,b) => b.votes - a.votes)
  default: return state
  }
}

export default reducer