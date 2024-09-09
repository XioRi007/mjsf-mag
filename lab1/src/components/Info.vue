
<script setup>
import { ref } from 'vue'

defineProps({
  name: String,
  specialty: String,
  courseNumber: Number,
  group: String,
})

const count = ref(0)
</script>

<template>
  <div class="info">
    <h1>{{ name }}</h1>
    <p>{{ specialty }}</p>
    <p>{{ courseNumber }} course</p>
    <p>{{ group }}</p>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
