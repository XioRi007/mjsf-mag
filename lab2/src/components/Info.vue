<script setup>
defineProps({
  name: String,
  specialty: String,
  courseNumber: Number,
  group: String,
})
</script>

<template>
  <div class="info">
    <h1 class=''>{{ name }}</h1>
    <p>Specialty: {{ specialty }}</p>
    <p>Course: {{ courseNumber }} course</p>
    <p>Group: {{ group }}</p>
  </div>
</template>
