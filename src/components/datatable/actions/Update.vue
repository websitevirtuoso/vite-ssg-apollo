<template>
  <v-tooltip :text="text" location="top">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-pencil" size="small" flat data-test="update" :text="text" class="mr-1" @click="$emit('click')" />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
})

defineEmits<{
  (e: 'click'): void
}>()
</script>
