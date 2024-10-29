<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

const data = reactive<any>({ 
  todos: []
})

const description = ref("")

async function addItem() {
  const trimedDescription = description.value.trim()
  if(!trimedDescription) return

  if(data.todos.some((item: any) => item.description == trimedDescription)) return

  if(data.todos.filter((item: any) => !item.done).length > 4) return

  const item = { id: Math.random().toString(36).slice(2, 7), description: trimedDescription, done: false}
  data.todos.push(item)

  description.value = ""

  await axios.post('http://localhost:3000/todos', item)
}

async function removeItem(item: any) {
  data.todos.splice(data.todos.indexOf(item), 1)

  await axios.delete(`http://localhost:3000/todos/${item.id}`)
}

function toggleDone(item: any) {
  item.done = !item.done
}

onMounted(async () => {
  const response = await axios.get("http://localhost:3000/todos")
  data.todos = response.data
})
</script>

<template>
  <div v-if="data.todos.length == 0">No item</div>
  <div v-for="item in data.todos">
    {{ item.id }}
    <span v-bind:style="{ 'text-decoration': item.done ? 'line-through' : ''}">{{ item.description }}</span> {{ item.done }}

    <button @click="removeItem(item)">remove</button>
    <button @click="toggleDone(item)">done/undone</button>
  </div>
  <hr />
  {{ description }}
  <input type="text" v-model="description" @keyup.enter="addItem"/>
</template>

<style scoped>
</style>
