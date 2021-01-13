import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (data) => {
  axios.post(baseUrl, data)
}

export default { getAll , addAnecdote }