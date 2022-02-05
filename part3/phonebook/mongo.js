const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.pncio.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

const phonebook = new Phonebook({
  name: `${name}`,
  number: `${number}`,
})

if (process.argv.length >= 4) {
  phonebook.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
  })
  mongoose.connection.close()
}

if (process.argv.length < 4) {
  Phonebook.find({}).then((response) => {
    console.log('Phonebook')
    response.forEach((record) => {
      console.log(record.name, record.number)
    })
    mongoose.connection.close()
  })
}
