const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get("/api/persons/:id", (req, res) => {

  Person.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
    .catch((error) => {
      res.status(404).end()
    })
})

app.post("/api/persons", morgan(' :method :url :status :res[content-length] - :response-time ms :body'), (req, res) => {
  const body = req.body
  
  if (!body.name || !body.number ) {
    return res.status(400).json({
      error: "Name or number missing"
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })

})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT //|| 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})