import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const Add = personObject => {
    return axios.post(baseUrl, personObject)
}

const Delete = personObject => {
    return axios.delete(`${baseUrl}/${personObject.id}`)
}

const Get = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

const changeNumber = personObject => {
    return axios.put(`${baseUrl}/${personObject.id}`, {name: personObject.name, number: personObject.number})
}

export default {getAll, Add, Delete, Get, changeNumber}