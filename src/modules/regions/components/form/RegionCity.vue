<template>
  <cities-query
    v-if="valueStateID"
    v-slot="{ items, loading }"
    ref="city"
    :state_ids="[valueStateID]"
    :name="intCity.cityNameSearch"
    :limit="2000"
  >
    <v-autocomplete
      v-model:search="intCity.cityNameSearch"
      :model-value="value"
      :label="t('messages.city')"
      :items="items"
      :loading="loading"
      :placeholder="t('action.search_live')"
      :error-messages="errors"
      :return-object="true"
      item-title="name"
      item-value="id"
      :prepend-inner-icon="mdiMagnify"
      data-test="region.city"
      @update:model-value="onCityChange"
    />
  </cities-query>
</template>

<script setup lang="ts">
import useGoogleMap from '@/modules/regions/composables/useGoogleMap'
import CitiesQuery from '@/modules/regions/components/cities/RenderlessCitiesQuery.vue'

const city = ref(null)
const { t } = useI18n()
const { city: intCity, onCityChange } = useGoogleMap()
const { value: valueStateID } = useField('state_id')
const { value, errors } = useField('city_id')

// expose ref to use outside
defineExpose({ city })
</script>
