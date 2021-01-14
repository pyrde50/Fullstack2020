export const setNotification = (anecdote, time) => {
  console.log(anecdote, 'set')
  return async dispatch => {
    setTimeout(() => dispatch({
      type: 'RESET'
    }), time * 1000)

    dispatch({
      type: 'NOTIFY',
      data: { anecdote },
    })


  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.data.anecdote
  case 'RESET':
    return ''
  default:
    return state
  }
}

export default notificationReducer