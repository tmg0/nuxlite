<script setup lang="ts">
const nuxlite = useNuxlite()
</script>

<template>
  <div class="flex gap-2 text-4xl">
    <span>Hello</span>
    <span>Nuxlite</span>
    <span>{{ nuxlite }}</span>
  </div>
</template>
