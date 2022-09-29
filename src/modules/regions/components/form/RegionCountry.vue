<template>
  <countries-query ref="country" v-slot="{ items, loading }">
    <v-select
      v-model="value"
      :items="items"
      :label="t('messages.country')"
      item-title="name"
      item-value="id"
      :loading="loading"
      :error-messages="errors"
      :prepend-inner-icon="mdiEarth"
      data-test="region.country"
      @update:model-value="onCountryChange"
    />
  </countries-query>
</template>

<script setup lang="ts">
import useGoogleMap from '@/modules/regions/composables/useGoogleMap'
import CountriesQuery from '@/modules/regions/components/RenderlessCountriesQuery.vue'

const country = ref(null)
const { t } = useI18n()

const { onCountryChange } = useGoogleMap()
const { value, errors } = useField('country_id')
// expose ref to use outside
defineExpose({ country })
</script>
