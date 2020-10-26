import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const StatisticLine = ({text, value, precentage}) => (
  <tr><td>{text}</td><td>{value}</td><td>{precentage}</td></tr>
)

const Statistics = (props) => {

  if(props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
   <div>no feedback given</div>
   </div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
          <StatisticLine text="good" value={props.good}/>
          <StatisticLine text="neutral" value={props.neutral}/> 
          <StatisticLine text="bad" value={props.bad}/>
          <StatisticLine text="all" value={props.bad+props.good+props.neutral}/>
          <StatisticLine text="average" value={(props.good-props.bad)/(props.bad+props.good+props.neutral)}/>
          <StatisticLine text="precentage" value={props.good*100/(props.good+props.bad+props.neutral)} precentage={"%"}/>
          
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0) 
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  return (
    <div> <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good+1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral+1)}/>
      <Button text="bad" onClick={() => setBad(bad+1)}/>
      <div>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
    </div>
    
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)