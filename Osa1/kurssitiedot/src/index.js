import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part} {props.exercises}
    </div>
    
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} /> 
      <Part part={props.part2} exercises={props.exercises2} /> 
      <Part part={props.part3} exercises={props.exercises3} />
    </div> 
  )
}

const Total = (props) => {
  return (
    <div>
      Number of exercises {props.one + props.two + props.three}
    </div>
  )
} 

const App = () => {
  const course = 'Half stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div> 
      <Header course={course}/>
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total one={exercises1} two={exercises2} three={exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))