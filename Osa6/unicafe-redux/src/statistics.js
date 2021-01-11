import React from 'react'

const StatisticLine = ({text, value, precentage}) => (
    <tr><td>{text}</td><td>{value}</td><td>{precentage}</td></tr>
  )
  
 const Statistics = (props) => {
  
    if(props.store.getState().good === 0 && props.store.getState().ok === 0 && props.store.getState().bad === 0) {
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
            <StatisticLine text="good" value={props.store.getState().good}/>
            <StatisticLine text="neutral" value={props.store.getState().ok}/> 
            <StatisticLine text="bad" value={props.store.getState().bad}/>
            <StatisticLine text="all" value={props.store.getState().good + props.store.getState().ok + props.store.getState().bad}/>
            <StatisticLine text="average" value={(props.store.getState().good-props.store.getState().bad)/(props.store.getState().bad+props.store.getState().good + props.store.getState().ok)}/>
            <StatisticLine text="precentage" value={props.store.getState().good*100/(props.store.getState().bad+props.store.getState().good + props.store.getState().ok)} precentage={"%"}/>
            
            </tbody>
          </table>
        </div>
      )
    }
  }

  export default Statistics 