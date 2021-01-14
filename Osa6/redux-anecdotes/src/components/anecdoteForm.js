import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


export  const AnecdoteForm = (props) => {
  const addAnec = (event) => {
    event.preventDefault()
    const content = event.target.new.value
    console.log(content, 'content')
    event.target.new.value = ''
    props.createAnecdote(content)
    props.setNotification(`You created '${content}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div><input name='new' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

}


const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const FormFinal = connect(null, mapDispatchToProps)(AnecdoteForm)
export default FormFinal