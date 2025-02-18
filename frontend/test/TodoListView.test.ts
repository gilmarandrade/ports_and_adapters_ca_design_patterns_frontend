import { mount } from '@vue/test-utils'
import TodoListView from '../src/components/TodoListView.vue'
import TodoMemoryGateway from '../src/gateway/TodoMemoryGateway'

function sleep(mili: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), mili)
    })
}

test("deve testar a tela de todo list", async () => {
    // const httpClient = new AxiosAdapter()
    // const todoGateway = new TodoHttpGateway(httpClient, "http://localhost:3000")
    const todoGateway = new TodoMemoryGateway()

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