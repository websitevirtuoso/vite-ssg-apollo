<template>
  <v-btn-toggle v-bind="$attrs" :model-value="modelValue" mandatory dense dark>
    <v-btn small :model-value="modelValue" color="green lighten-4" active-class="green darken-3 elevation-2">
      <v-icon right>mdi-check-bold</v-icon>
      {{ negativeText }}
    </v-btn>
    <v-btn small :model-value="modelValue" color="red lighten-4" active-class="red darken-3 elevation-2">
      {{ positiveText }}
      <v-icon left>mdi-close</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  positiveText: {
    type: String,
    required: true
  },
  negativeText: {
    type: String,
    required: true
  }
})
</script>
