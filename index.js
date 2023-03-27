//se llama la libreria para crear el servidor
const express = require('express')
//se hace una instancia de la libreria en app
const app = express()
//se utiliza el metodo para leer los datos en formato json 
app.use(express.json())
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
//se pone el servidor a escuchar las peticiones por un puerto dado
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
