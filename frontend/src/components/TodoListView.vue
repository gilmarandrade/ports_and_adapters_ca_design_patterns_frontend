<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import type TodoGateway from '../gateway/TodoGateway';
import TodoList from '../entities/TodoList';
import Observer from '../entities/Observer';

const data = reactive<any>({ 
  todoList: new TodoList()
})

const description = ref("")

const todoGateway = inject('todoGateway') as TodoGateway 

onMounted(async () => {
  const todoList = await todoGateway.getTodos()
  todoList.register(new Observer("addItem", async (item: any) => {
    await todoGateway.addItem(item)
  }))
  todoList.register(new Observer("removeItem", async (item: any) => {
    await todoGateway.removeItem(item.id)
  }))
  todoList.register(new Observer("toggleDone", async (item: any) => {
    await todoGateway.updateItem(item)
  }))
  
  data.todoList = todoList
})
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
