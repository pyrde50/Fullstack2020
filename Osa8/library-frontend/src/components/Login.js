import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {onError: (error) => {
        console.log(error)
        props.notify(error.graphQLErrors[0].message)
     } })

     useEffect(() => {
         if (result.data) {
             console.log('--->', result.data)
             props.setToken(result.data.login.value)
             localStorage.setItem('library-token', result.data.login.value)
         }
     }, [props, result.data])

    if (!props.show) {
        return null
      }

    const submit = (event) => {
        event.preventDefault()

        login({variables: {username: username, password: password}} )
        setUsername('')
        setPassword('')
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                username: <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div>
                password: <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <button type='submit'>LOGIN</button>
            </form>
        </div>
    )
}

export default Login