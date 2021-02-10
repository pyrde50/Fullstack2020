import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { EDITAUTHOR, ALLAUTHORS } from '../queries'
import Select from "react-select"


const Authors = (props) => {
  const [ born, setBorn ] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [ editAuthor ] = useMutation(EDITAUTHOR, {
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALLAUTHORS })
      store.writeQuery({
        query: ALLAUTHORS,
        data: {
          ...dataInStore,
          allAuthors: [ ...dataInStore.allAuthors.filter(author => response.data.editAuthor.name !== author.name), response.data.editAuthor ]
        }
      })
    }
  })

  let options = []
  props.authors.forEach(author => {
    options = options.concat({value: author.id, label: author.name})
  })

  if (!props.show ) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()


  const setBornTo = parseInt(born, 10)    
    editAuthor( {variables: {name: selectedOption.label, setBornTo: setBornTo}})

    setBorn('')
  }

  const authors = props.authors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>edit birthyear</h2>
      <form onSubmit={submit}>
        name:
        <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}/>
        <div>
          born:
          <input
          type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
