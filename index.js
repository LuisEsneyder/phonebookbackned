//se llama la libreria para crear el servidor
const express = require('express')
//se hace una instancia de la libreria en app
const app = express()
//se utiliza el metodo para leer los datos en formato json 
app.use(express.json())
//datos
const persons = [
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
//se pone el servidor a escuchar las peticiones por un puerto dado
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
