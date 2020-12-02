import react from 'react'
import './index.css'

const ErrorNotification = ({errorMessage}) => {
    if (errorMessage == null) {
        return null
    } else {
        return (
            <div className="error">
            {errorMessage}
            </div>
        )
    }


}

export default ErrorNotification