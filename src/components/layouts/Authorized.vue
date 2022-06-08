<template>
  <v-app>
    <SideBar />
    <AppBar />
    <v-main>
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="12">
            <breadcrumbs />
          </v-col>
        </v-row>
      </v-container>
      <animated-router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/components/navigation/AppBar.vue'
import SideBar from '@/components/navigation/SideBar.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import AnimatedRouterView from '@/components/AnimatedRouterView.vue'
</script>
