<template>
  <v-select
    v-model="value"
    :items="bathroomItems"
    :error-messages="errors"
    :label="t('messages.bathroom', 2)"
    :prepend-inner-icon="mdiShower"
    data-test="listing.bathrooms"
  />
</template>

<script setup lang="ts">
import { bathroomItems } from '@/modules/listings/helpers/listing'

const { t } = useI18n()
const { value, errors } = useField('bathrooms')
</script>
