import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

const voteAnecdote = async (data) => {
  const newData = ({
    id: data.id,
    content: data.content,
    votes: data.votes + 1
  })
  const response = await axios.put(`${baseUrl}/${data.id}`, newData)
  return response.data
}

const getAnecdote = async (data) => {
  const response = await axios.get(`${baseUrl}/${data.id}`)
  return response.data
}

export default { getAll , addAnecdote, voteAnecdote, getAnecdote }