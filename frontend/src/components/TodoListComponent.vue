<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(["todoList"])

const description = ref("")

function handleInputEnter() {
    props.todoList.addItem(description.value)
    description.value = ""
}
</script>

<template>
  <div v-if="todoList.items.length == 0">No item</div>
  <span class="completed">{{ todoList.getCompleted() }}%</span>
  <div v-for="item in todoList.items">
    {{ item.id }}
    <span v-bind:style="{ 'text-decoration': item.done ? 'line-through' : ''}">{{ item.description }}</span> {{ item.done }}

    <button @click="todoList.toggleDone(item)">done/undone</button>
    <button @click="todoList.removeItem(item)">remove</button>
  </div>
  <hr />
  {{ description }}
  <input type="text" v-model="description" @keyup.enter="handleInputEnter"/>
</template>

<style scoped>
</style>
