import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)
  if (notification === '') {
    return <div/>
  } else {
    return (
      <div className="finding">
        {notification}
      </div>
    )
  }

}

export default Notification
