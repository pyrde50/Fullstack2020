export const login = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: { user }
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default loginReducer