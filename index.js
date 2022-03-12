const express = require('express')
const cors = require('cors')
const app = express()
/** Aqui indicamos a express de que soportar las req cuando se le pasa un obj, y parsearlo para tenerlo
 * disponible en el req.body
 */
app.use(cors())
app.use(express.json())
let notas = [
  {
    id: 1,
    content: 'lorem blalblalalalala',
    category: 'producto1'
  },
  {
    id: 2,
    content: 'lorem beblblelblelb',
    category: 'producto2'
  },
  {
    id: 3,
    content: 'lorem bliblbiblbi',
    category: 'producto3'
  },
  {
    id: 4,
    content: 'lorem bloblboblbo',
    category: 'producto4'
  }
]
// app.get("/", (request, response) => {
//   response.send("Hola Stefernant");
// });

const generateId = () => {
  const notesIds = notas.map((n) => n.id)
  const maxId = notesIds.length ? Math.max(...notesIds) : 0
  const newId = maxId + 1
  return newId
}

app.get('/api/notes', (req, res) => {
  res.send(notas)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  if (typeof id !== 'number') { res.send('No se pudo hacer la búsquedad porque no hay número') }
  const obtenerNota = notas.find((note) => note.id === id)
  if (obtenerNota) res.json(obtenerNota)
  else res.status(404).send('Nota no encontrada')
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  if (typeof id !== 'number') { res.send('No se pudo hacer la búsquedad porque no hay número') }
  const notaEliminada = notas.filter((note) => note.id !== id)
  if (notaEliminada) res.json(notaEliminada)
  else res.status(404).send('Nota no encontrada para eliminar')
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  const nuevaNota = {
    id: generateId(),
    content: note.content,
    category: note.category
  }

  notas = notas.concat(nuevaNota)

  response.status(201).json(nuevaNota)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('servidor iniciado en, ' + PORT)
})
