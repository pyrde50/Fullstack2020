import { gql  } from '@apollo/client'

export const ALLAUTHORS = gql`
  query {
      allAuthors {
          name
          born
          bookCount
      }
  }`

  export const ME = gql`
  query {
      me {
          favoriteGenre
      }
  }`


  export const ALLBOOKS = gql`
  query {
      allBooks {
          title,
          published,
          author {
              name 
          },
          genres
      }
  }`

  export const ADDBOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!){
      addBook(
          title: $title,
          author: $author,
          published: $published,
          genres: $genres
          ) {
            title
            author {
                name
            }
            published
            genres
          }
  }`

  export const EDITAUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
      editAuthor(
          name: $name,
          setBornTo: $setBornTo
      )
      {
          name
          born
      }
  }`

  export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
        username: $username
        password: $password
      )
      {
        value
      }
  }`




