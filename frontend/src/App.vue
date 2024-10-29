<script setup lang="ts">
import { reactive, ref } from 'vue';

const todos = reactive([
  { description: 'Estudar Typescript', done: true },
  { description: 'Fazer a prova online', done: false },
  { description: 'Cortar a grama', done: false },
])

const description = ref("")

function addItem() {
  const trimedDescription = description.value.trim()
  if(!trimedDescription) return

  if(todos.some((item: any) => item.description == trimedDescription)) return

  if(todos.filter((item: any) => !item.done).length > 4) return

  todos.push({description: trimedDescription, done: false})
  description.value = ""
}

function removeItem(item: any) {
  todos.splice(todos.indexOf(item), 1)
}

function toggleDone(item: any) {
  item.done = !item.done
}
</script>

<template>
  <div v-if="todos.length == 0">No item</div>
  <div v-for="item in todos">
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
