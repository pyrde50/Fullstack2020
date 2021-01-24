export const setErrorNotification = (anecdote, time) => {
  return async dispatch => {
    dispatch(notify(anecdote))

    setTimeout(() => {
      dispatch(reset())
    } , time * 1000)

  }
}

const notify = (anecdote) => {
  return {
    type: 'NOTIFYERROR',
    data: { anecdote }
  }
}

const reset = () => {
  return {
    type: 'RESETERROR'
  }
}

const errorNotificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFYERROR':
    return action.data.anecdote
  case 'RESETERROR':
    return ''
  default:
    return state
  }
}

export default errorNotificationReducer