import React from 'react'
import { ME } from '../queries'
import { useQuery } from '@apollo/client'


const Recommended = (props) => {

    const result = useQuery(ME)
  if (!props.show) {
    return null
  }

  const books = props.books
  const showBooks = books.filter(book => book.genres.includes(result.data.me.favoriteGenre))
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          
          {showBooks.map(a => 
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended