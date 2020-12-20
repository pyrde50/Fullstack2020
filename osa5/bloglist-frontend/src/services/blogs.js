import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  try {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch(error) {
    return `error: ${error}`
  }
}

const addLike = async newObject => {
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return response.data
}

const remove = async blog => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, create, setToken, addLike, remove }