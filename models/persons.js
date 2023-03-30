const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URL

console.log('conecting to ', url);

mongoose.connect(url).then(result => {
    console.log('coneccted  to MongoDb');
}).catch(error => {
    console.log('error coneccting to MongoDB', error.message);
})

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)