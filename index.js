//se llama la libreria para crear el servidor
const express = require('express')
const morgan = require('morgan')
//se hace una instancia de la libreria en app
const app = express()
//se llama morgan que sirve como middlewere para ver lo que traen las recuest
morgan.token('datos', function getDatos(req){
    return JSON.stringify(req.body)
})
//se agregan los middlewere al app
app.use(express.json())//se utiliza el metodo para leer los datos en formato json 
app.use(morgan(':method :url :status :res[content-length] :response-time ms :datos'))
//datos
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
//Función generador de id
const generarId = () => {
    const numberRandon = Math.random()*1000
    return Math.floor(numberRandon)
}
//se crea la ruta para obtener todos los datos
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
//se crea la ruta de información, donde se muestra cuantas personas hay y la hora de la solicitud
app.get('/info', (request, response) => {
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
    const id = Number(request.params.id)
    const person = persons.find(element => element.id === id)
    if(person){
        response.status(200).json(person)
        return
    }
    response.status(404).end()
})
//se crea ruta para eliminar a una persona
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(element => element.id !== id)
    response.status(202).end()
})
//se crea una ruta para crear una persona en el phonebook
app.post(('/api/persons'), (request, response) => {
    const body = request.body
    if(!body.name || !body.number){
        response.status(400).json({error: 'name or number is missing'})
        return
    }
    const personsVerifi = persons.find(element => element.name === body.name)
    if(personsVerifi){
        response.status(400).json({error: 'name must be unique'})
        return
    }
    const person = {
        id: generarId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.status(200).json(person)
})
//se pone el servidor a escuchar las peticiones por un puerto dado
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
