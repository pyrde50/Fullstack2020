import axios from 'axios'
const baseUrl = '/api/blogs'


const addComment = async (blogObject) => {
  const response = await axios.post(`${baseUrl}/${blogObject.id}/comments`, blogObject)
  return response.data
}

export default { addComment }