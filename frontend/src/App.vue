<script setup lang="ts">
import { reactive, ref } from 'vue';

const todos = reactive([
  { description: 'Estudar Typescript', done: true },
  { description: 'Fazer a prova online', done: false },
  { description: 'Cortar a grama', done: false },
])

const description = ref("")

function addItem() {
  todos.push({description: description.value, done: false})
  description.value = ""
}
</script>

<template>
  <div v-for="item in todos">
    <span v-bind:style="{ 'text-decoration': item.done ? 'line-through' : ''}">{{ item.description }}</span> {{ item.done }}
  </div>
  {{ description }}
  <input type="text" v-model="description" @keyup.enter="addItem"/>
</template>

<style scoped>
</style>
