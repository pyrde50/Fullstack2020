import React, { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('all books')
  if (!props.show) {
    return null
  }

  const books = props.books
  const genresStart = props.books.map(book => book.genres).flat()
  const genres = [...new Set(genresStart)].concat('all books')
  const showBooks = books.filter(book => book.genres.includes(filter))
  console.log(showBooks)
  
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
          {filter === 'all books' ? books.map(a => 
          <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ) : (
          showBooks.map(a => 
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => (
        <button onClick={() => setFilter(genre)} key={genre}>{genre}</button>
      ))}
    </div>
  )
}

export default Books