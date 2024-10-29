import { mount } from '@vue/test-utils'
import TodoListView from '../src/components/TodoListView.vue'
import AxiosAdapter from '../src/infra/AxiosAdapter'

function sleep(mili: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), mili)
    })
}

test("deve testar a tela de todo list", async () => {
    const wrapper = mount(TodoListView, {
        global: {
            provide: {
                'httpClient': new AxiosAdapter()
            }
        }
    })
    await sleep(200)
    console.log(wrapper.html())
    expect(wrapper.get('.completed').text()).toBe("33%")
})