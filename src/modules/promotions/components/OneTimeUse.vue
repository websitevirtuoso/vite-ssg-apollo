<template>
  <v-btn-toggle v-bind="$attrs" mandatory>
    <v-btn small :value="0" color="green lighten-4" active-class="green darken-3 elevation-2">
      <v-icon right>{{ mdiCheckBold }}</v-icon>
      {{ negativeText }}
    </v-btn>
    <v-btn small :value="1" color="red lighten-4" active-class="red darken-3 elevation-2">
      {{ positiveText }}
      <v-icon left>{{ mdiClose }}</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup lang="ts">
defineProps({
  positiveText: {
    type: String,
    required: true,
  },
  negativeText: {
    type: String,
    required: true,
  },
})
</script>
