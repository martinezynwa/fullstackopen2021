const express = require('express')
const app = express()

app.use(express.json())
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


app.get("/api/info", (request, result) => {
  const date = new Date()

  result.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})

app.get("/api/persons", (request, result) => {
  result.json(persons)
})

app.get("/api/persons/:id", (request, result) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    result.json(person)
  } else {
    result.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, result) => {
  const id = Number(request.params.id)

  persons = persons.filter(p => p.id !== id)

  result.status(204).end()
})

const generateID = () => {
  const randomID = Math.floor(Math.random() * 1000)

  return randomID
}

app.post("/api/persons", (request, result) => {
  const body = request.body

  if (!body.name || !body.number) {
    return result.status(400).json({
      error: "Name or number missing"
    })
  }

  let person = persons.find(person => person.name === body.name)

  if (person) {
    return result.status(400).json({
      error: "Name must be unique"
    })
  }

  const personObject = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  persons = persons.concat(personObject)

  result.json(personObject)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})