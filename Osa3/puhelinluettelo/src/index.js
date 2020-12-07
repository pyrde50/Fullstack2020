import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import AddPerson from './components/addPerson'
import FilterPersons from './components/filter'
import Notification from './notification'
import ErrorNotification from './errorNotification'
import Person from './components/person'
import getPerson from './services/getPerson'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ findName, setFindName ] = useState('')
  const [ number, setNumber ] = useState(8)
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)


  const addPerson = (event) => {
    event.preventDefault()

    if(persons.some(item => item.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.filter(person => person.name === newName)[0].id
        }
        getPerson
        .changeNumber(personObject)
        .then(response => {
          setPersons(persons.filter(person => person.id !== response.data.id).concat(personObject))
          console.log(response.data)
          setMessage(`${response.data.name} number changed to ${response.data.number}`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: number + 1
      }
      getPerson
      .Add(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(`${response.data.name} added`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)

      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(`error: ${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 7000)
      })
    }
  }

  useEffect(() => {
    getPerson
    .getAll()
      .then(response => {
        setPersons(response.data)
        setNumber(response.data.id)
      })
  },[])

  const editnewName = (event) => {
    setNewName(event.target.value)
  }

  const editNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const editFindName = (event) => {
    setFindName(event.target.value)
  }

  const DeletePerson = (event) => {
    getPerson
    .Get(event.target.value)
    .then(response => {
      if (window.confirm(`Delete ${response.data.name}?`)) {
      getPerson
      .Delete(response.data)
      .then(res => {
        console.log(response.data)
        setPersons(persons.filter(person => person.id !== response.data.id))
        console.log(persons)
        setMessage(`${response.data.name} deleted`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
    })
  }
    })
    .catch(error => {
      console.log(event.target.value)
      const nameOfDeleted = persons.filter(person => person.id === event.target.value)[0].name
      setErrorMessage(`information of ${nameOfDeleted} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 7000)
    })
  }

  const filterPeople = findName.length === 0
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(findName.toLowerCase()) === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorNotification errorMessage={errorMessage}/>
      <FilterPersons findName = {findName} editFindName = {editFindName}/>
      <h2>add new</h2>
      <AddPerson newName = {newName} editnewName ={editnewName} newNumber = {newNumber} editNewNumber={editNewNumber} addPerson = {addPerson}/>
      <h2>Numbers</h2>
      <Person filterPeople={filterPeople} DeletePerson={DeletePerson}/>

    </div>
  )

}
ReactDOM.render(<App />, document.getElementById('root'))
