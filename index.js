//se llama la libreria para crear el servidor
require('dotenv').config()
const express = require('express')
const Person = require('./models/persons')
const morgan = require('morgan')
const cors = require('cors')
//se hace una instancia de la libreria en app
const app = express()
//se llama morgan que sirve como middlewere para ver lo que traen las recuest

morgan.token('datos', function getDatos(req){
    return JSON.stringify(req.body)
})
//se crea el middlewere para el controlador de error

const errorHandle = (error, request, response, next) => {
    console.error(error.message);
    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    }
    next(error)
}

//se agregan los middlewere al app
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())//se utiliza el metodo para leer los datos en formato json 
app.use(morgan(':method :url :status :res[content-length] :response-time ms :datos'))
//datos


//se crea la ruta para obtener todos los datos
app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})
//se crea la ruta de información, donde se muestra cuantas personas hay y la hora de la solicitud
app.get('/info', (request, response, next) => {
    const numeroDePersonas = persons.length
    let hora = new Date()
    response.send(`
    <div>
        <h2>Phonebook has info for ${numeroDePersonas} people</h2>
        <div>
            ${hora}
        </div>
    </div>`)
})
//se crea ruta para obtener a una sola persona
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(result=>{
        response.status(200).json(result)
    }).catch(error => next(error))
})
//se crea ruta para eliminar a una persona
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        response.status(200).end()
    }).catch(error => next(error))
})
//se crea una ruta para crear una persona en el phonebook
app.post(('/api/persons'), (request, response, next) => {
    const body = request.body
    if(!body.name || !body.number){
        response.status(400).json({error: 'name or number is missing'})
        return
    }
    Person.findOne({name: body.name}).then(result =>{
        if(result){
            const updatePersons = {
                name: body.name,
                number: body.number
            }
            Person.findOneAndUpdate({name: body.name}, updatePersons, {new: true}).then(personUp => {
                response.status(200).json(personUp)
            }).catch(error => next(error) )
            return
        }
        const person = new Person({
            name: body.name,
            number: body.number
        }) 
        person.save().then(savedPerson => {
            response.status(200).json(savedPerson)
        })
    }).catch(error => next(error))
    
})
//se crea ruta para actualizar un elemento
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    if(!body.name || !body.number){
        response.status(400).json({error: 'name or number is missing'})
        return
    }
    const updatePersons = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, updatePersons, {new: true}).then(result => {
        response.json(result)
    }).catch(error => next(error))
})
//se usa el middlewere de error
app.use(errorHandle)
//se pone el servidor a escuchar las peticiones por un puerto dado
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
