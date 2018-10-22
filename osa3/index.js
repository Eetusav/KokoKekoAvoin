const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

const cors = require('cors')
app.use(cors())

morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :body :res[content-length] - :response-time ms'))

//app.use(morgan('tiny'))
app.use(bodyParser.json())
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Martti Tienari",
        number: "040-123456"
    },
    {
        id: 3,
        name: "Arto Järvinen",
        number: "040-123456"
    },
    {
        id: 4,
        name: "Lea Kutvonen",
        number: "040-123456"
    }
]
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons/', (req, res) => {
    res.json(persons)
  })
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )
    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
    
  })
  app.get('/info', (request, response) => {
      const size = persons.length
      response.send('Puhelinluettelossa on ' + size + ' henkilön tiedot.')
  })
  app.delete('/api/persons/:id', (request, response) => {
      const id = Number(request.params.id)
      persons = persons.filter(person => person.id !== id)

      response.status(204).end()
  })
  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined){
        return response.status(400).json({error: 'Nimeä ei ole määritelty'})
    }
    if (body.number === undefined){
        return response.status(400).json({error: 'Numeroa ei ole määritelty'})
    } 
    if (persons.find(person => person.number === body.number) !== undefined){
        return response.status(400).json({error: 'Numero on jo listassa'})
    }
    const person = {
        id: Number(Math.floor(Math.random() * 500) + 1),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
  })
  
  
  
 
