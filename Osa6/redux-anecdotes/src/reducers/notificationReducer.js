export const reset = () => {
  return {
    type: 'RESET'
  }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'VOTE':
          const anecdote = action.anecdotes.anecdotes.find(anec => anec.id === action.data.id)
          return `You voted '${anecdote.content}'`
        case 'ADD':
          return `You created '${action.data.content}'`
        case 'RESET':
          return ''
        default:
          return state
      }
}

export default notificationReducer