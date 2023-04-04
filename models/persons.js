const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URL
console.log('conecting to' , url)
mongoose.connect(url)
  .then((result) => {
    console.log('coneccted  to MongoDb')
  }).catch((error) => {
    console.log('error coneccting to MongoDB', error.message)
  })
const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{2}-\d{5}/.test(v)
      },
      message: (props) => `${props.value} is not valid phone number`,
    },
    required: [true, 'number is required'],
  },
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Person', personSchema)
