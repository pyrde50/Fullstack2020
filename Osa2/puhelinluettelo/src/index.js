import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import AddPerson from './components/addPerson'
import FilterPersons from './components/filter'
import Person from './components/person'
import { valueToNode } from '@babel/types'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ findName, setFindName ] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(item => item.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  useEffect(() => {
    console.log('useEffect')
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
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
  const filterPeople = findName.length === 0
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(findName) === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons findName = {findName} editFindName = {editFindName}/>
      <h2>add new</h2>
      <AddPerson newName = {newName} editnewName ={editnewName} newNumber = {newNumber} editNewNumber={editNewNumber} addPerson = {addPerson}/>
      <h2>Numbers</h2>
      <Person filterPeople={filterPeople}/>

    </div>
  )

}
ReactDOM.render(<App />, document.getElementById('root'))
