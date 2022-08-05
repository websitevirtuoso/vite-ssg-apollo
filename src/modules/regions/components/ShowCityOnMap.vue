<template>
  <!-- todo need to fix problem with width of gmap inside this modal  -->
  <v-dialog :model-value="show">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">{{ name }}</v-card-title>

      <v-card-text>
        <g-map-map :center="{ lat, lng }" :zoom="9" :options="{ zoomControl: true, clickableIcons: false, disableDefaultUI: true }" style="width: 500px; height: 45vh;">
          <g-map-marker :position="{ lat, lng }" />
        </g-map-map>
<!--        <show-map-with-marker-->
<!--          :lat="lat" :lng="lng" width="600px" :zoom="9"-->
<!--          :options="{ zoomControl: true, clickableIcons: false, disableDefaultUI: true }" />-->
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close')">{{ t('action.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
// import ShowMapWithMarker from "@/components/gmap/ShowMapWithMarker.vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
})

defineEmits<{
  (e: 'close'): void
}>()
</script>
