<template>
  <v-row>
    <v-col cols="12" md="5">
      <WidgetTasks />
    </v-col>
    <v-col cols="12" md="12">
      <WorldMap />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import WidgetTasks from '@/components/widget/WidgetTasks.vue'
import WorldMap from '@/components/widget/WorldMap.vue'
</script>

<style>
  .v-card .v-card--material__heading {
    top: -30px;
  }
  .v-card--material__heading {
    position: relative;
    top: -70px;
    -webkit-transition: .3s ease;
    transition: .3s ease;
    z-index: 1;
  }
  .vue-world-map {
    max-height: 350px;
  }
  .vue-world-map .land{stroke:#fff!important}
  .vue-world-map .land {
    fill: #dadada;
    stroke: black;
  }
  .vue-world-map #US {
    fill: #838383;
  }
  .vue-world-map #BR {
    fill: #bbbbbb;
  }
  .vue-world-map #AU {
    fill: #b6b6b6;
  }
  #map-svg, .vue-world-map {
    height: 100%;
  }
</style>
