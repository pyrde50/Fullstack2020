import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import AddPerson from './components/addPerson'
import FilterPersons from './components/filter'
import Person from './components/person'
import getPerson from './services/getPerson'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ findName, setFindName ] = useState('')
  const [ number, setNumber ] = useState(8)


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
    })
  }
    })
  }

  const filterPeople = findName.length === 0
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(findName.toLowerCase()) === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons findName = {findName} editFindName = {editFindName}/>
      <h2>add new</h2>
      <AddPerson newName = {newName} editnewName ={editnewName} newNumber = {newNumber} editNewNumber={editNewNumber} addPerson = {addPerson}/>
      <h2>Numbers</h2>
      <Person filterPeople={filterPeople} DeletePerson={DeletePerson}/>

    </div>
  )

}
ReactDOM.render(<App />, document.getElementById('root'))
