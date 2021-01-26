import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const allUsers = await userService.getAll()
    dispatch ({
      type: 'INITIALIZEUSERS',
      data: { allUsers }
    })
  }
}

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZEUSERS':
    return action.data.allUsers
  default:
    return state
  }
}

export default userReducer