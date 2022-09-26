<template>
  <states-query v-slot="{ items, loading }" ref="state" :country_ids="[valueCountryID]">
    <v-select
      v-model="value"
      :items="items"
      :label="t('messages.state')"
      :loading="loading"
      :prepend-icon="mdiCompass"
      item-title="name"
      item-value="id"
      data-test="region.state"
      :error-messages="errors"
      @update:model-value="onStateChange"
    />
  </states-query>
</template>

<script setup lang="ts">
import useGoogleMap from '@/modules/regions/composables/useGoogleMap'
import StatesQuery from '@/modules/regions/components/states/RenderlessStatesQuery.vue'

const state = ref(null)
const { t } = useI18n()
const { onStateChange } = useGoogleMap()
const { value: valueCountryID } = useField('country_id')
const { value, errors } = useField('state_id')

// expose ref to use outside
defineExpose({ state })
</script>
