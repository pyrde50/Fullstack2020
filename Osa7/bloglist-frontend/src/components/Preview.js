import React from 'react'
import { useSelector } from 'react-redux'

const Preview = (props) => {
  const user = useSelector(state => state.login)
  if (!user) {
    return null
  } else {
    return (
      <>  {props.name} has logged in <button onClick={props.handleLogout}>LogOut</button></>
    )
  }
}

export default Preview