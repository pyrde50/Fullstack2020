import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(store => store.user)

  return(
    <div>
      <h2>Users</h2>
      {users.length === 0 ?
        <div/>
        :
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>blogs</td>
              <td>created</td>
            </tr>
            {users.map((user) =>
              <tr key={user.id }>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Users