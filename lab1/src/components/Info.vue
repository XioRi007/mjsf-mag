
<script setup>
import { ref } from 'vue';

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
    <h1 class=''>{{ name }}</h1>
    <p>Specialty: {{ specialty }}</p>
    <p>Course: {{ courseNumber }} course</p>
    <p>Group: {{ group }}</p>
  </div>
</template>
