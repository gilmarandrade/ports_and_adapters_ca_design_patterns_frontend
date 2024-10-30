import TodoList from "../entities/TodoList";
import TodoGateway from "./TodoGateway";

export default class TodoMemoryGateway implements TodoGateway {
    todoList: TodoList

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
        this.todoList.addItem(item)
    }

    async updateItem(item: any): Promise<any> {
        this.todoList.toggleDone(item)
    }
    
    async removeItem(id: string): Promise<any> {
        this.todoList.removeItem({ id })
    }

}