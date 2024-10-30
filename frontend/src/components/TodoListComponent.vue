<script setup lang="ts">
import { ref } from 'vue';

defineProps(["todoList"])

const description = ref("")
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
  <input type="text" v-model="description" @keyup.enter="todoList.addItem(description)"/>
</template>

<style scoped>
</style>
