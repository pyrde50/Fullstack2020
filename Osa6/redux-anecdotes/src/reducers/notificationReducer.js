export const setNotification = (anecdote, time) => {
  return async dispatch => {
    dispatch(notify(anecdote))

    setTimeout(() => {
      dispatch(reset())
    } , time * 1000)

  }
}

const notify = (anecdote) => {
  return {
    type: 'NOTIFY',
    data: { anecdote }
  }
}

const reset = () => {
  return {
    type: 'RESET'
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