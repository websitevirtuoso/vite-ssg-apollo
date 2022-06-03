<template>
  <v-app>
    <Nav />
    <v-container fluid class="mt-12">
      <v-row no-gutters>
        <v-col cols="12">
          <breadcrumbs />
        </v-col>
      </v-row>
    </v-container>
    <animated-router-view />
  </v-app>
</template>

<script setup lang="ts">
import Nav from '@/components/Nav.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import AnimatedRouterView from '@/components/AnimatedRouterView.vue'
</script>
