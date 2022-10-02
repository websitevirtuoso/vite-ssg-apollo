<template>
  <v-container fluid>
    <v-row>
      <slot name="prepend"></slot>
      <v-col v-if="showAutocomplete" cols="12" class="pb-2">
        <g-map-autocomplete data-test="gmap-autocomplete" @place_changed="onExtSetPlace" />
      </v-col>
      <v-col v-if="showAddress" cols="12" md="6" class="py-1">
        <region-address />
      </v-col>
      <v-col v-if="showPostalCode" cols="12" md="6" class="py-1">
        <region-postal-code />
      </v-col>
      <v-col v-if="showCountries" cols="12" class="py-1">
        <region-country ref="countries" />
      </v-col>
      <v-col v-if="showCountries && showStates" cols="12" class="py-1">
        <region-state ref="states" />
      </v-col>
      <v-col v-if="showCountries && showStates && showCities" cols="12" class="pt-1">
        <region-city ref="cities" />
      </v-col>
      <v-col v-if="showMap && valueLat" cols="12" class="pa-0">
        <g-map-map :center="{ lat: valueLat, lng: valueLng }" :zoom="14" style="width: 100%; height: 400px">
          <g-map-marker :position="{ lat: valueLat, lng: valueLng }" :draggable="true" @dragend="onDraggedPin($event.latLng)" />
        </g-map-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { until } from '@vueuse/core'
import { useGlobalQueryLoading } from '@vue/apollo-composable'
import useGoogleMap from '@/modules/regions/composables/useGoogleMap'
// components
import VErrorMessage from '@/components/fields/VErrorMessage.vue'
import RegionAddress from '@/modules/regions/components/form/RegionAddress.vue'
import RegionPostalCode from '@/modules/regions/components/form/RegionPostalCode.vue'
import RegionCountry from '@/modules/regions/components/form/RegionCountry.vue'
import RegionState from '@/modules/regions/components/form/RegionState.vue'
import RegionCity from '@/modules/regions/components/form/RegionCity.vue'

const props = defineProps({
  showAutocomplete: {
    type: Boolean,
    required: false,
  },
  showAddress: {
    type: Boolean,
    required: false,
  },
  showPostalCode: {
    type: Boolean,
    required: false,
  },
  showCountries: {
    type: Boolean,
    required: false,
  },
  showStates: {
    type: Boolean,
    required: false,
  },
  showCities: {
    type: Boolean,
    required: false,
  },
  showMap: {
    type: Boolean,
    required: false,
  },
  setBrowserLocation: {
    type: Boolean,
    required: false,
  },
})

const countries = ref(null)
const states = ref(null)
const cities = ref(null)
const { value: valueLat } = useField('lat')
const { value: valueLng } = useField('lng')

const { onDraggedPin, onSetPlace, setBrowserLocation } = useGoogleMap()

if (props.setBrowserLocation) {
  onMounted(async () => {
    // wait while all apollo queries loaded
    await until(useGlobalQueryLoading()).toBe(false)
    setBrowserLocation(countries, states, cities)
  })
}

const onExtSetPlace = (place: google.maps.places.PlaceResult) => {
  onSetPlace(place, countries, states, cities)
}
</script>
