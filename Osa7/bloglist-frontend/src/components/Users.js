import React from 'react'
import { useSelector } from 'react-redux'

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
                <td>{user.name}</td>
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