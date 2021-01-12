export const reset = () => {
  return {
    type: 'RESET'
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'VOTE':
    return `You voted '${action.anecdotes.anecdotes.find(anec => anec.id === action.data.id).content}'`
  case 'ADD':
    return `You created '${action.data.content}'`
  case 'RESET':
    return ''
  default:
    return state
  }
}

export default notificationReducer