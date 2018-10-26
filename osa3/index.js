const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

const cors = require('cors')
app.use(cors())
const Person = require('./models/person')
app.use(express.static('build'))


morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :body :res[content-length] - :response-time ms'))

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

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

//app.get('/', (req, res) => {
//    res.send('<h1>Hello World!</h1>')
//  })

app.get('/api/persons/', (req, res) => {
    //const persons = Person.findById({})
    //res.json(persons)
    Person.find({}).then(persons => {
        res.json(persons)
    })

})
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    //    const id = Number(request.params.id)
    //    const person = persons.find(person => person.id === id )
    //    if (person){
    //        response.json(person)
    //    } else {
    //        response.status(404).end()
}
    //  }
)
app.get('/info', (request, response) => {
    Person.count({}, function( err, count){
        response.send('Puhelinluettelossa on ' + count + ' henkilön tiedot.')
    })
    
})
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(person => {
        response.status(204).end()
    })
})
app.patch('/api/persons/:id', (req, res) => {
    const personObject = req.body
    //personObject.number
    //console.log('newNumber ', newNumber, ' and person.mnumber', person.number)
    Person.findByIdAndUpdate(req.params.id, req.body).then(person => {
            res.json(person)
    })
})
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({ error: 'Nimeä ei ole määritelty' })
    }
    if (body.number === undefined) {
        return response.status(400).json({ error: 'Numeroa ei ole määritelty' })
    }
    Person.find({number: body.number}).then(person => {
        if (person !== undefined){
            return response.status(400).json({ error: 'Numero on jo listassa' })
        }
    })
    const person = new Person({
        name: body.name,
        number: body.number
    })
    //persons = persons.concat(person)
    person
        .save()
        .then(savedPerson => {
            response.json(person)
        })
    //response.json(person)
})




