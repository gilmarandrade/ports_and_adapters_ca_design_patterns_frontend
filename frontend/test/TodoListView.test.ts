import { mount } from '@vue/test-utils'
import TodoListView from '../src/components/TodoListView.vue'
import AxiosAdapter from '../src/infra/AxiosAdapter'
import TodoHttpGateway from '../src/gateway/TodoHttpGateway'

function sleep(mili: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), mili)
    })
}

test("deve testar a tela de todo list", async () => {
    const httpClient = new AxiosAdapter()
    const todoGateway = new TodoHttpGateway(httpClient, "http://localhost:3000")

    const wrapper = mount(TodoListView, {
        global: {
            provide: {
                todoGateway
            }
        }
    })
    await sleep(200)
    console.log(wrapper.html())
    expect(wrapper.get('.completed').text()).toBe("33%")
})