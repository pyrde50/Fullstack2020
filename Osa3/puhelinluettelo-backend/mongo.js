const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack-pyrde:${password}@fullstack.xzvgt.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  ID: Number
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    ID: 1000
  })

  person.save().then(
    console.log(`added ${person.name} number ${person.number} to phonebook`),
    mongoose.connection.close()
  )

}
