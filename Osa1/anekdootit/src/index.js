import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const changeVote = (points, selected, changeVotes) => {
  const copy = [...points]
  copy[selected] += 1
  changeVotes(copy)
}

const max = (points) => {
  return  Math.max.apply(Math, points)
}

const maxPlace = (points) => {
  const aa = Math.max.apply(Math, points)
  return points.findIndex(obj => obj === aa)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, changeVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))


  

  return (
    <div><h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div> 
      <div>
      has {points[selected]} votes
      </div>
      <Button text="next anecdote" onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}/>
      <Button text="vote" onClick={() => changeVote(points, selected, changeVotes)}/>
      </div>
      <h1>Anecdote with the most votes</h1>
      <div>
        {props.anecdotes[maxPlace(points)]}
      </div>
      <div>has {max(points)} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)