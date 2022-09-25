<template>
  <countries-query v-slot="{ items, loading }">
    <v-select
      v-model="value"
      :items="items"
      :label="t('messages.country')"
      :error-messages="errors"
      item-title="name"
      item-value="id"
      :loading="loading"
      data-test="state.country"
    />
  </countries-query>
</template>

<script setup lang="ts">
import CountriesQuery from '@/modules/regions/components/RenderlessCountriesQuery.vue'

const { t } = useI18n()
const { value, errors } = useField('country_id')
</script>
