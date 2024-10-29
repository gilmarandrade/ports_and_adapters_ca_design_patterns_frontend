import HttpClient from "../infra/HttpClient";
import TodoGateway from "./TodoGateway";

export default class TodoHttpGateway implements TodoGateway {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {

    }

    async getTodos(): Promise<any> {
        return this.httpClient.get(`${this.baseUrl}/todos`)
    }

    async addItem(item: any): Promise<any> {
        return this.httpClient.post(`${this.baseUrl}/todos`, item)
    }

    async updateItem(item: any): Promise<any> {
        return this.httpClient.put(`${this.baseUrl}/todos/${item.id}`, item)
    }
    
    async removeItem(id: string): Promise<any> {
        return this.httpClient.delete(`${this.baseUrl}/todos/${id}`)
    }
    
}