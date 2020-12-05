const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

app.use(express.json())
var morgan = require('morgan')
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  
    app.get('/',(req, res) => {
        res.send('<div>Hello world</div>')
    })

    app.get('/api/persons',(req, res) => {
        res.json(persons)
    })
    
    app.get('/info',(req, res) => {
        var date = new Date
        var d = date.toDateString()
        var n = date.toTimeString()
    res.send(`<div>Phonebook has info for ${persons.length} people</div><div>${d} ${n}</div>`)
    res.send(`<div>${Date.now()}</div>`)
    })

    app.get(`/api/persons/:id`,(req, res) => {
        const id = Number(req.params.id)
        const person = persons.find(p => p.id === id)
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
        
    })

    app.delete(`/api/persons/:id`,(req, res) => {
        const id = Number(req.params.id)
        persons = persons.filter(p => p.id !== id)
        res.status(204).end()
        
    })

    const generateId = () => {
        return Math.floor(Math.random() * Math.floor(10000))
      }

    app.post(`/api/persons`,(req, res) => {
        const body = req.body
        if (persons.filter(person => person.name === body.name).length > 0) {
            return res.status(400).json({
                error: 'name must be unique'
            })
        } else if (!body.name) {
            return res.status(400).json({
                error: 'name must be given'
            })
        }
        if (persons.filter(person => person.number === body.number).length > 0) {
            return res.status(400).json({
                error: 'number must be unique'
            })
        } 
        const person = {
            name: body.name,
            number: body.number,
            id: generateId(),
        }
        persons = persons.concat(person)
        res.json(person)
        
    })

    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

