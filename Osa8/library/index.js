require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')


const MONGODB_URI = process.env.MONGODB_URI

const mongoose = require('mongoose')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const JWT_SECRET = 'SOITA_PARANOID'

mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
      title: String!
      published: Int!
      author: Author!
      id: ID!
      genres: [String]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String]!
      ): Book

      editAuthor(
          name: String!
          setBornTo: Int!
      ): Author

      createUser(
        username: String!
        favoriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
  }
`


const resolvers = {
  Query: {
      allAuthors: async () => {
        const aa = await Author.find({})
        return aa
      },
      bookCount: () => Book.collection.countDocuments(),
      allBooks: async (root, args) => {
          if (!args.author && !args.genre) {
            return Book.find({}).populate('author')
          } else if (!args.genre) {
            //ei
            return Book.find({genres: { $in: args.author}})
          } else if (!args.author) {
            return Book.find({genres: { $in: args.genre}})
          } else {
            //ei
              return book.find({}).filter(book => book.author === args.author).filter(book => book.genres.includes(args.genre))
          }
      },
      me: (root, args, context) => {
        return context.currentUser
      } 
  },

  Author: {
      bookCount: async (root) => {
        const books = await Book.find({author: root.id})
        return books.length
      }
  }, 
  Mutation: {
  
      addBook: async (root, args, context) => {
        if (!context.currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        try {
        let author = await Author.findOne({name: args.author})
        if (author) {
            const book = new Book({...args, author: author})
            
              await book.save()
            return book
        } else {
          const newAuthor = new Author({name: args.author})
          await newAuthor.save()
          const finalAuthor = await Author.findOne({name: args.author})
          const book = new Book({...args,  author: finalAuthor})
          
            await book.save()
            return book

      }
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
  }
    },
      editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        try {
          const author = await Author.findOne({name: args.name })
          console.log(author)
          if (!author) {
            return null
          }
          author.born = args.setBornTo

          console.log(author)
          
            author.save()
            return author
          } catch {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          
      },
      createUser: (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
    }
}
/*
books.forEach(async book => {
  const authors = await Author.find({})
  const fin = new Book({
    title: book.title,
    author: authors.find(author => author.name === book.author)._id,
    published: book.published,
    genres: book.genres
  })
  console.log(fin)
  fin.save()
})
*/

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})