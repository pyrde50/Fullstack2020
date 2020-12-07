require('dotenv').config
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

app.use(express.json())
var morgan = require('morgan')
const { res, req } = require('express')
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  
    app.get('/',(req, res) => {
        res.send('<div>Hello world</div>')
    })

    app.get('/api/persons',(req, res) => {
        Person.find({}).then(person => {
            res.json(person)
        })
    })
    
    app.get('/info',(req, res) => {
        var date = new Date
        var d = date.toDateString()
        var n = date.toTimeString()
        Person.count().then(amount => {
            console.log(amount)
            res.send(`<div>Phonebook has info for ${amount} people</div><div>${d} ${n}</div>`) 
        })
    })

    app.get(`/api/persons/:id`,(req, res, next) => {
        Person.findById(req.params.id).then(person => {
            res.json(person)
        })
        .catch(error => next(error))
    })

    app.delete(`/api/persons/:id`,(req, res, next) => {
        Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
    })


    app.post(`/api/persons`,(req, res, next) => {
        const body = req.body

        if (!body.name) {
            return res.status(400).json({
                error: 'name must be given'
            })
        }
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save().then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
    })

    app.put(`/api/persons/:id`,(req, res, next) => {
        const body = req.body

        const person = {
            name: body.name,
            number: body.number
        }

        console.log(person)
        Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => {
            console.log("aaaaaa", error) 
            next(error)
        })
        
    
    })

    const unknownEndpoint = (request, response) => {
        response.status(404).send({ error: 'unknown endpoint' })
      }

      app.use(unknownEndpoint)

      const errorHandler = (error, req, res, next) => {
        console.error(error.message)

        if (error.name === 'CastError') {
            return res.status(400).send({error: "malformatted id"})
        } else if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
          } 
        next(error)
      }

      app.use(errorHandler)

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

