<template>
  <v-list-item
    v-bind="$attrs"
    :prepend-icon="item.icon"
    :data-test="item.name"
    :title="item.name"
    :to="item.route !== null ? { name: item.route } : null"
  />
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>
