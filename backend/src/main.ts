import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const todos = [
    { id: Math.random().toString(36).slice(2, 7), description: 'Estudar Typescript', done: true },
    { id: Math.random().toString(36).slice(2, 7), description: 'Fazer a prova online', done: false },
    { id: Math.random().toString(36).slice(2, 7), description: 'Cortar a grama', done: false }
]

app.get('/todos', function(req, res) {
    res.json(todos)
})

app.post('/todos', function(req, res) {
    console.log('post', req.body)
    todos.push(req.body)
    res.end()
})

app.listen(3000)