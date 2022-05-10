<template>
  <Nav />
  <v-main>
    <v-container grid-list-xl fluid>
      <router-view />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import Nav from '@/components/Nav.vue'
</script>
