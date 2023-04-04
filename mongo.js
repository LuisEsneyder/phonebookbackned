const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password or data as argument')
  process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://luisexneider1999:${password}@persons.dqlvflx.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = mongoose.Schema({
  name: String,
  number: String,
})
const Persons = mongoose.model('Person', personSchema)

// const person = new Persons({
//     name: process.argv[3],
//     number: process.argv[4]
// })

// person.save().then(result => {
//     console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
//     mongoose.connection.close()
// })
console.log('Phonebook:')
Persons.find({}).then((result) => {
  result.forEach((element) => {
    console.log(`${element.name} ${element.number}`)
  })
  mongoose.connection.close()
})
