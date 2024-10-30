<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from 'vue';
import type TodoGateway from '../gateway/TodoGateway';
import TodoList from '../entities/TodoList';

// await todoGateway.addItem(item)
// await todoGateway.removeItem(item.id)
// await todoGateway.updateItem(item)

const data = reactive<any>({ 
  todoList: new TodoList()
})

const description = ref("")

const todoGateway = inject('todoGateway') as TodoGateway 



// onMounted(async () => {
//   data.todos = await todoGateway.getTodos()
// })
</script>

<template>
  <div v-if="data.todoList.items.length == 0">No item</div>
  <span class="completed">{{ data.todoList.getCompleted() }}%</span>
  <div v-for="item in data.todoList.items">
    {{ item.id }}
    <span v-bind:style="{ 'text-decoration': item.done ? 'line-through' : ''}">{{ item.description }}</span> {{ item.done }}

    <button @click="data.todoList.toggleDone(item)">done/undone</button>
    <button @click="data.todoList.removeItem(item)">remove</button>
  </div>
  <hr />
  {{ description }}
  <input type="text" v-model="description" @keyup.enter="data.todoList.addItem(description)"/>
</template>

<style scoped>
</style>
