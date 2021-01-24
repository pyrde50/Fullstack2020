import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'

const ErrorNotification = () => {
  const notification = useSelector(store => store.errorNotification)
  if (notification === '') {
    return <div/>
  } else {
    return (
      <div className="error">
        {notification}
      </div>
    )
  }

}

export default ErrorNotification
