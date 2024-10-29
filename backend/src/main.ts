import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const todos = [
    { description: 'Estudar Typescript', done: true },
    { description: 'Fazer a prova online', done: false },
    { description: 'Cortar a grama', done: false }
]

app.get('/todos', function(req, res) {
    res.json(todos)
})

app.listen(3000)