import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    dispatch ({
      type: 'INITIALIZE',
      data: { allBlogs }
    })
  }
}

export const newBlog = ( blog ) => {
  return async dispatch => {
    dispatch ({
      type: 'ADDBLOG',
      data: { blog }
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADDBLOG':
    return state.concat(action.data.blog)
  case 'INITIALIZE':
    return action.data.allBlogs
  default:
    return state
  }
}

export default blogReducer