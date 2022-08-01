<template>
  <v-app class="primary auth d-flex">
    <v-container fluid fill-height>
      <v-row justify="space-around" class="h-screen align-center">
        <v-col cols="12" md="4" sm="8">
          <animated-router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import AnimatedRouterView from '@/components/AnimatedRouterView.vue'
</script>

<style lang="scss">
.auth {
  background: linear-gradient(0deg, #fff 50%, rgb(var(--v-theme-primary)) 50%);
  border-color: rgb(var(--v-theme-primary));
}
</style>
