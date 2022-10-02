<template>
  <listing-terms-query v-slot="{ items, loading }">
    <v-select
      v-model="value"
      :items="items"
      :loading="loading"
      :label="t('messages.term')"
      :error-messages="errors"
      :prepend-inner-icon="mdiCalendarClock"
      item-title="description"
      item-value="id"
      :return-object="false"
      clearable
      data-test="listing.terms"
    />
  </listing-terms-query>
</template>

<script setup lang="ts">
import ListingTermsQuery from '@/modules/listings/components/RenderlessListingTermsQuery.vue'

const { t } = useI18n()
const { value, errors } = useField('term_id')
</script>
