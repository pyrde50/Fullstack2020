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

export const likeBlog = ( blog ) => {

  return async dispatch => {
    dispatch ({
      type: 'LIKEBLOG',
      data: { blog }
    })
  }
}

export const deleteBlog = ( blog ) => {

  return async dispatch => {
    dispatch ({
      type: 'DELETEBLOG',
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
  case 'LIKEBLOG':
    return state.filter(blog => blog.id !== action.data.blog.id).concat(action.data.blog)
  case 'DELETEBLOG':
    return state.filter(blog => blog.id !== action.data.blog.id)
  default:
    return state
  }
}

export default blogReducer