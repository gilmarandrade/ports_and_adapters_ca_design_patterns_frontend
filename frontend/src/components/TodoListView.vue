<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from 'vue';
import HttpClient from '../infra/HttpClient';

const data = reactive<any>({ 
  todos: []
})

const description = ref("")

const httpClient = inject('httpClient') as HttpClient 

async function addItem() {
  const trimedDescription = description.value.trim()
  if(!trimedDescription) return

  if(data.todos.some((item: any) => item.description == trimedDescription)) return

  if(data.todos.filter((item: any) => !item.done).length > 4) return

  const item = { id: Math.random().toString(36).slice(2, 7), description: trimedDescription, done: false}
  data.todos.push(item)

  description.value = ""

  await httpClient.post('http://localhost:3000/todos', item)
}

async function removeItem(item: any) {
  data.todos.splice(data.todos.indexOf(item), 1)

  await httpClient.delete(`http://localhost:3000/todos/${item.id}`)
}

async function toggleDone(item: any) {
  item.done = !item.done

  await httpClient.put(`http://localhost:3000/todos/${item.id}`, item)

}

const completed = computed(() => {
  const total = data.todos.length
  if(total == 0) return 0
  const done = data.todos.filter((item: any) => item.done).length

  return Math.round((done/total) * 100)
})

onMounted(async () => {
  data.todos = await httpClient.get("http://localhost:3000/todos")
})
</script>

<template>
  <div v-if="data.todos.length == 0">No item</div>
  <span class="completed">{{ completed }}%</span>
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
