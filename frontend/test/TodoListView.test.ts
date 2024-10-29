import { mount } from '@vue/test-utils'
import TodoListView from '../src/components/TodoListView.vue'

function sleep(mili: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), mili)
    })
}

test("deve testar a tela de todo list", async () => {
    const wrapper = mount(TodoListView, {})
    await sleep(100)
    console.log(wrapper.html())
    expect(wrapper.get('.completed').text()).toBe("33%")
})