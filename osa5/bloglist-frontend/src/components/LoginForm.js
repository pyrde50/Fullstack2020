import React from 'react'

const LoginForm = (props) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          type="text"
          value={props.username}
          id="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          id="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  </div>
)

export default LoginForm