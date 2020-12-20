import React from 'react'
import '../index.css'

const Notification = ({message}) => {
    if (message == null) {
        return null
    } else {
        return (
            <div className="finding">
            {message}
            </div>
        )
    }


}

export default Notification