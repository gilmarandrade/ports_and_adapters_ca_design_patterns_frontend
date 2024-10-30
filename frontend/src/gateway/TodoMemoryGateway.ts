import TodoList from "../entities/TodoList";
import TodoGateway from "./TodoGateway";

export default class TodoMemoryGateway implements TodoGateway {
    todoList: any

    constructor() {
        this.todoList = new TodoList([
            { id: Math.random().toString(36).slice(2, 7), description: 'Estudar Typescript', done: true },
            { id: Math.random().toString(36).slice(2, 7), description: 'Fazer a prova online', done: false },
            { id: Math.random().toString(36).slice(2, 7), description: 'Cortar a grama', done: false }
        ])
    }

    async getTodos(): Promise<any> {
        return this.todoList
    }
    
    async addItem(item: any): Promise<any> {
        this.todoList.push(item)
    }

    async updateItem(item: any): Promise<any> {
        const todo = this.todoList.find((todo: any) => todo.id == item.id)
        if(todo) {
            todo.done = item.done
        }
    }
    
    async removeItem(id: string): Promise<any> {
        const todo = this.todoList.find((todo: any) => todo.id == id)
        if(todo) {
            this.todoList.splice(this.todoList.indexOf(todo), 1)
        }
    }

}